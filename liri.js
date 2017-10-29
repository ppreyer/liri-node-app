var Twitter = require('twitter');
var twitterKeys = require('./keys.js');
var twitterKeys = new Twitter ({
  consumer_key: 'O1nbnKBfsV4uzGfHvdmRM26BP',
  consumer_secret: 'PIfH0lQW0hSh2kA4cCNosjLykbH5SnSJjtPDY76TSAAAMpgDJ0',
  access_token_key: '924020142304002048-Ac24Cnah8D1QDR670NftQO5jPhxQK7P',
  access_token_secret: 'aqvj7CJce1TLz0UpGw7lSRJ6roIxDHM7Wqv4Gucg1PJPr'
});
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
  id: '302c2e6a747349949625a940796f6fcb',
  secret: 'a704a02d53a34127acfb48b3980280b9'
});
var request = require('request');
var fs = require('fs');
var liriArgument = process.argv[2];

var twitterObject = {
    handle: process.argv[3],
    determineScreenName: function() {
        if (!this.handle) {
            this.handle = 'tobyiscool2001';
        } 
    },
    findTweets: function() {
      twitterKeys.get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=" + this.handle + "&count=20&", function(error, tweets, response) {
            if (error) {
                throw error;
            } else {
                var logResults = '';
                for (var i = 0; i < tweets.length; i++) {
                    logResults += "@" + tweets[i].user.screen_name + ":" +
                        " " +
                        tweets[i].text +
                        " Tweeted at: " +
                        tweets[i].created_at;
                }
                console.log(logResults);
                fs.appendFile("log.txt", logResults, function(err) {
                  if(err) {
                    console.log(err);
                  } else {
                    console.log("Content Added!");
                  }
                })
            }
        })

    }
}

var spotifyObject = {
    song: "",
    args: process.argv,
    determineSongName: function() {
      if(this.args.length < 4) {
        this.song = "Forgot About Dre";
      } else {
          for (var i = 3; i < this.args.length; i++) {
          var songWord = this.args[i];
          this.song += songWord + " ";
          }
        }
    },
    searchSpotifySong: function() {
      spotify.search({ type: 'track', query: this.song}, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      } else {
        var songInfo = data.tracks.items[0];
        var songResults = "Artist: " + songInfo.artists[0].name +
                          "Song Title: " + songInfo.name +
                          "Album Name: " + songInfo.album.name +
                          "Spotify URL: " + songInfo.preview_url
        // console.log("Artist: " + songInfo.artists[0].name);
        // console.log("Song Title: " + songInfo.name);
        // console.log("Album Name: " + songInfo.album.name);
        // console.log("Spotify URL: " + songInfo.preview_url);
        console.log(songResults);
        fs.appendFile("log.txt", songResults, function(err) {
                  if(err) {
                    console.log(err);
                  } else {
                    console.log("Content Added!");
                  }
                })

        }
      })
  }
}

var movieObject = {
  movieName: "",
  args: process.argv,
  determineMovieName: function() {
  if(this.args.length < 4) {
    this.movieName = "Mr. Nobody";
  } else {
      for (var i = 3; i < this.args.length; i++) {
        var movieWord = this.args[i];
        this.movieName += movieWord + " ";
      }
    }
    console.log(this.movieName);
    return this.movieName;
  },
  queryUrl: "http://www.omdbapi.com/?t=" + this.movieName + "&y=&plot=short&apikey=40e9cece",
  requestMovie: function(movieNamePassed) {
    var queryGo2 = "http://www.omdbapi.com/?t=" + movieNamePassed + "&y=&plot=short&apikey=40e9cece";
    request(queryGo2, function(error, response, body) {


  // If the request is successful
  if (!error && response.statusCode === 200) {
    var movieResults = "Title: " + JSON.parse(body).Title +
                        "Release Year: " + JSON.parse(body).Year +
                        "IMBD Rating: " + JSON.parse(body).imdbRating +
                        "Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[0].Value +
                        "Production Country: " + JSON.parse(body).Country +
                        "Languages: " + JSON.parse(body).Language +
                        "Plot: " + JSON.parse(body).Plot +
                        "Actors: " + JSON.parse(body).Actors
    // console.log("Title: " + JSON.parse(body).Title);
    // console.log("Release Year: " + JSON.parse(body).Year);
    // console.log("IMBD Rating: " + JSON.parse(body).imdbRating);
    // console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[0].Value);
    // console.log("Production Country: " + JSON.parse(body).Country);
    // console.log("Languages: " + JSON.parse(body).Language);
    // console.log("Plot: " + JSON.parse(body).Plot);
    // console.log("Actors: " + JSON.parse(body).Actors);
    console.log(movieResults);
    fs.appendFile("log.txt", movieResults, function(err) {
                  if(err) {
                    console.log(err);
                  } else {
                    console.log("Content Added!");
                  }
                })
  }
});
  }

}

function readRandomFileContent() {
    fs.readFile("random.txt", "utf8", function(error, song) {
      if (error) {
        return console.log(error);
      } else {
        var songArr = song.split(",");
        var songSearch = songArr[1];
      }
      spotify.search({ type: 'track', query: songSearch}, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      } else {
        var songInfo = data.tracks.items[0];
        console.log("Artist: " + songInfo.artists[0].name);
        console.log("Song Title: " + songInfo.name);
        console.log("Album Name: " + songInfo.album.name);
        console.log("Spotify URL: " + songInfo.preview_url);
        }
      })
    })
}

switch (liriArgument) {
    case "my-tweets":
        twitterObject.determineScreenName();
        twitterObject.findTweets();
        break;
    case "spotify-this-song":
        spotifyObject.determineSongName();
        spotifyObject.searchSpotifySong();
        break;
    case "movie-this":
        var try1 = movieObject.determineMovieName();
        movieObject.requestMovie(try1);
        break;
    case "do-what-it-says":
        readRandomFileContent();
    default : 
        console.log("Try typing one of the following commands after 'node liri.js':" + "\r\n" +
                    "1. my-tweets 'any twitter handle' " + "\r\n" +
                    "2. spotify-this-song 'any song title' "+"\r\n" +
                    "3. movie-this 'any movie title' "+"\r\n" +
                    "4. do-what-it-says."+"\r\n"
          );
        break;
} 







