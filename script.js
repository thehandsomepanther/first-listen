var slimer = require('node-slimerJs')
var request = require('request')
var Xvfb = require('xvfb')
var xvfb = new Xvfb({'silent': true, 'displayNumber': 200})

var JQUERY = 'http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js'

var DEFAULT_URL = 'http://www.npr.org/series/98679384/first-listen'
var url = process.argv[2] ? process.argv[2] : DEFAULT_URL

if (!url.match('^http:\/\/www\.npr\.org(.*)first-listen(.*)$')) {
  console.log("That's not an NPR First Listen link, but here's what's available:")
  url = DEFAULT_URL
}

if (url === DEFAULT_URL) {
  request(url, function(err, res, body) {
    if (err) throw err
  })
}

url = 'http://www.npr.org/2016/09/01/491941924/first-listen-st-paul-the-broken-bones-sea-of-noise'

tracks = request(url, function() {

})

var getBaseUrl = function(url) {
  var trackUrl = false

  slimer.create(function(err, sl) {
    return sl.createPage(function(err, page) {
      return page.open(url, function(err, status) {
        page.onResourceReceived = function(response) {
          if (response.contentType == "audio/mpeg" && !trackUrl) {
            trackUrl = response.url;
          }
        }

        page.includeJs(JQUERY, function(err) {
          if (err) throw 'jQuery couldn\'t be loaded'
          return page.evaluate(function() {
            $($('article.playlistitem')[0]).find('button.audio-module-listen').click()
          }, function(err, result) {
            sleep(4000).then(() => {
              page.close()
            })
          })
        })

        sleep(4000).then(() => {
          sl.exit()
        })
      })
    })
  }, {slimerPath: require('slimerjs').path})

  return new Promise((resolve) => setTimeout(function(){ resolve(trackUrl) }, 5000))
}

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

var pad = function(n, width) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join("0") + n;
}

var getTracks = function(responseUrl) {
  baseUrl = responseUrl.substring(0, responseUrl.indexOf("?")-6);
  for (var i = 1; i < 13; i++) {
    var url = baseUrl + pad(i, 2) + ".mp3";
    request(url).pipe(url)
  }
}

baseUrlPromise = getBaseUrl(url);
baseUrlPromise.then((url) => {
  console.log(url)
})
