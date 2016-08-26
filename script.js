var tracks, responseUrl;

var system = require('system');
var page = require('webpage').create();
var jQuery = 'http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js';

page.onError = function(msg, trace) {
  console.log("ERROR: " + JSON.stringify(trace, null, 2));
};

page.onResourceReceived = function(response) {
  if (response.contentType == "audio/mpeg") {
    if (!responseUrl) {
      responseUrl = response.url;
      getTracks();
    }
  }
};

page
  .open(system.args[1])
  .then(function(getTracks) {
    page.includeJs(jQuery, function() {
      tracks = page.evaluate(function() {
        return $('article.playlistitem').length;
      })
      page.evaluate(function() {
        window.setTimeout(function() {
          $($('article.playlistitem')[0]).find('button.audio-module-listen').click();
        }, 1000);
      });
    });
    setTimeout(function() {
      slimer.exit();
    }, 5000);
  });

var pad = function(n, width) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join("0") + n;
}

var getTracks = function() {
  baseUrl = responseUrl.substring(0, responseUrl.indexOf("?")-6);
  for (var i = 1; i < tracks+1; i++) {
    var url = baseUrl + pad(i, 2) + ".mp3";
    console.log(url);
  }
}
