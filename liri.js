// Twitter credentials
var Twitter = require('twitter');
var twitterKeys = new Twitter({
    consumer_key: 'O1nbnKBfsV4uzGfHvdmRM26BP',
    consumer_secret: 'PIfH0lQW0hSh2kA4cCNosjLykbH5SnSJjtPDY76TSAAAMpgDJ0',
    access_token_key: '924020142304002048-Ac24Cnah8D1QDR670NftQO5jPhxQK7P',
    access_token_secret: 'aqvj7CJce1TLz0UpGw7lSRJ6roIxDHM7Wqv4Gucg1PJPr'
});

// Spotify credentials
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
    id: '302c2e6a747349949625a940796f6fcb',
    secret: 'a704a02d53a34127acfb48b3980280b9'
});

// Request and fs packages
var request = require('request');
var fs = require('fs');

// liri app command
var liriArgument = process.argv[2];

// Object container for twitter methods and properties
var twitterObject = {
    // Twitter handle = third argument on command line
    handle: process.argv[3],
    // Function to check twitter handle
    determineScreenName: function() {
        // If no argument...
        if (!this.handle) {
            // Set handle to tobyiscool2001
            this.handle = 'tobyiscool2001';
        }
    },
    // Function to make call to Twitter API
    findTweets: function() {
        // Twitter API call
        twitterKeys.get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=" + this.handle + "&count=20&", function(error, tweets, response) {
            // If error...
            if (error) {
                // display error
                throw error;
              // Else...
            } else {
                // empty string to store results
                var logResults = '';
                // Iterate through twitter data...
                for (var i = 0; i < tweets.length; i++) {
                    // Add respective values to logResults variable
                    logResults += 
                        "@" + tweets[i].user.screen_name + ":" + " " +
                        tweets[i].text +
                        " Tweeted at: " +
                        tweets[i].created_at + " " + "\n";
                }
                console.log(logResults);
                // Append results to the log.txt file
                fs.appendFile("log.txt", logResults, function(err) {
                  // if error...
                    if (err) {
                        // display error
                        console.log(err);
                      // else...
                    } else {
                        // add content to log.txt
                        console.log("Content added to log.txt!");
                    }
                })
            }
        })

    }
}

// Object to store spotify methods and properties
var spotifyObject = {
    // empty song property 
    song: "",
    // property to declare command line arguments
    args: process.argv,
    // Function to determine song title from user input
    determineSongName: function() {
        // If the length is less than 4...
        if (this.args.length < 4) {
            // Select forgot about dre as default song
            this.song = "Forgot About Dre";
        } else {
            // Iterate through command line arguments starting at 3rd argument
            for (var i = 3; i < this.args.length; i++) {
                // Each iteration is a word in the song title
                var songWord = this.args[i];
                // Add the word to the songWord variable
                this.song += songWord + " ";
            }
        }
    },
    // Method to search spotify api
    searchSpotifySong: function() {
        // search for track and song url
        spotify.search({
            type: 'track',
            query: this.song
            // callback function with two arguments
        }, function(err, data) {
            // if error...
            if (err) {
                // return error message
                return console.log('Error occurred: ' + err);
              // Else...
            } else {
                // declare variable to appropriate array
                var songInfo = data.tracks.items[0];
                // Retrieve appropriate info
                var songResults = "Artist: " + songInfo.artists[0].name + "\n" +
                    "Song Title: " + songInfo.name + "\n" +
                    "Album Name: " + songInfo.album.name + "\n" +
                    "Spotify URL: " + songInfo.preview_url + "\n"
                // log results
                console.log(songResults);
                // append files to log.txt file
                fs.appendFile("log.txt", songResults, function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Content added to log file!");
                    }
                })

            }
        })
    }
}

// Object to store movie properties and methods
var movieObject = {
    // Empty property for movie name
    movieName: "",
    // property to store command line variables
    args: process.argv,
    // method to determine song title name
    determineMovieName: function() {
        // If the user doesn't input a song...
        if (this.args.length < 4) {
            // set default to mr. nobody
            this.movieName = "Mr. Nobody";
          // else...
        } else {
            // iterate through movie arguments
            for (var i = 3; i < this.args.length; i++) {
                // set each iteration as a word in movie title
                var movieWord = this.args[i];
                // add to movieName variable
                this.movieName += movieWord + " ";
            }
        }
        // return movie name
        return this.movieName;
    },
    // set query url 
    queryUrl: "http://www.omdbapi.com/?t=" + this.movieName + "&y=&plot=short&apikey=40e9cece",
    // search movie api
    requestMovie: function(movieNamePassed) {
        // use movie name in function to search movie api
        var queryGo2 = "http://www.omdbapi.com/?t=" + movieNamePassed + "&y=&plot=short&apikey=40e9cece";
        // callback url with three arguments
        request(queryGo2, function(error, response, body) {
            // If the request is successful
            if (!error && response.statusCode === 200) {
              // Set movie results and log them
                var movieResults = "Title: " + JSON.parse(body).Title + "\n" +
                    "Release Year: " + JSON.parse(body).Year + "\n" +
                    "IMBD Rating: " + JSON.parse(body).imdbRating + "\n" +
                    "Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[0].Value + "\n" +
                    "Production Country: " + JSON.parse(body).Country + "\n" +
                    "Languages: " + JSON.parse(body).Language + "\n" +
                    "Plot: " + JSON.parse(body).Plot + "\n" +
                    "Actors: " + JSON.parse(body).Actors + "\n"
                console.log(movieResults);
                // append file to log.txt file
                fs.appendFile("log.txt", movieResults, function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Content added to log file!");
                    }
                })
            }
        });
    }

}

// method to parse info from random.txt and plug into spotify api search
function readRandomFileContent() {
  // read random.txt file...
    fs.readFile("random.txt", "utf8", function(error, song) {
        // If error...
        if (error) {
            // return error message
            return console.log(error);
          // else...
        } else {
            // split results into a array
            var songArr = song.split(",");
            // Use first element as song title
            var songSearch = songArr[1];
        }
        // search spotify api....
        spotify.search({
            type: 'track',
            query: songSearch
        }, function(err, data) {
            // if err...
            if (err) {
                // return error message
                return console.log('Error occurred: ' + err);
              // else...
            } else {
                // set song info results and console.log results
                var songInfo = data.tracks.items[0];
                console.log("Artist: " + songInfo.artists[0].name);
                console.log("Song Title: " + songInfo.name);
                console.log("Album Name: " + songInfo.album.name);
                console.log("Spotify URL: " + songInfo.preview_url);
            }
        })
    })
}

// switch statement for command line inputs
switch (liriArgument) {
    // twitter commands
    case "my-tweets":
        twitterObject.determineScreenName();
        twitterObject.findTweets();
        break;
    // spotify commands
    case "spotify-this-song":
        spotifyObject.determineSongName();
        spotifyObject.searchSpotifySong();
        break;
    // movie commands
    case "movie-this":
        var try1 = movieObject.determineMovieName();
        movieObject.requestMovie(try1);
        break;
    // random file commands
    case "do-what-it-says":
        readRandomFileContent();
        break;
    // default commands if no inputs
    default:
        console.log("Try typing one of the following commands after 'node liri.js':" + "\r\n" +
            "1. my-tweets 'any twitter handle' " + "\r\n" +
            "2. spotify-this-song 'any song title' " + "\r\n" +
            "3. movie-this 'any movie title' " + "\r\n" +
            "4. do-what-it-says." + "\r\n"
        );
        break;
}