npr first listen scraper proof of concept

this was mostly an exercise in attempting to scrape a website which uses flash to load in content. the process for scraping the first listen website is fairly simple:

1. hit the page of the album you'd like to scrape, obtain info like artist, album title, album cover, song titles, album length, etc
2. click the play button to fire a network call which fetches the mp3 for the selected song
3. listen for the call that has a media data type, and grab that url
4. iterate over that url and make a raw get request for each song
5. (optional) use an id3 tagging library like id3v2 to edit metadata, since npr strips all that information

unfortunately, i haven't been able to find a good web driver that supports automation on flash websites

`script.sh` is an example of steps 4 and 5
the script uses [id3lib](https://github.com/attilagyorffy/id3lib-osx). you can get it through homebrew with `brew install id3lib`
