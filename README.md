# LIRI BOT

## Overview
The challenge was to use Node JS to create a LIRI bot, like iPhone's SIRI, but takes in command through Language vs. Speech. LIRI is a command line node app that takes in parameters and returns data based on one of four commands:

my-tweets

spotify-this-song

movie-this

do-what-it-says

The application also logs every command response to the log.txt file to record user search results.

## Getting Started
Clone down repo.
Run command 'npm install' in Terminal or GitBash
Run command 'node liri.js' or one of the commands below.

<img width="529" alt="liri" src="https://user-images.githubusercontent.com/1817873/34535749-ea0d8428-f090-11e7-948b-8c5238fdaf27.PNG">

## Commands 
node liri.js my-tweets
Displays my last 20 tweets and when they were created in terminal/bash window

<img width="656" alt="tweet" src="https://user-images.githubusercontent.com/1817873/34535812-228c5fe0-f091-11e7-91ad-3fc0ff1fca91.PNG">

node liri.js spotify-this-song <song name>
Shows the following information about the song in terminal/bash window.
Artist(s)
The song's name
A preview link of the song from Spotify
The album that the song is from
Or if no song is passed through, it will default to *"Forgot About Dre" by Dr. Dre

<img width="660" alt="spotify" src="https://user-images.githubusercontent.com/1817873/34535929-984ab150-f091-11e7-894f-8c2ec24004f6.PNG">

node liri.js movie-this <movie name>
Shows the following information in terminal/bash.
Title of the movie.
Year the movie came out.
IMDB Rating of the movie.
Country where the movie was produced.
Language of the movie.
Plot of the movie.
Actors in the movie.
Rotten Tomatoes Rating.
Rotten Tomatoes URL.
Or if no movie is passed through, it will default to "Mr. Nobody"

<img width="658" alt="movie" src="https://user-images.githubusercontent.com/1817873/34535982-c501864c-f091-11e7-85ff-99bcf8f3d538.PNG">
node liri.js do-what-it-says

Takes the text from random.txt and runs the song through spotify-this-song command

<img width="659" alt="do" src="https://user-images.githubusercontent.com/1817873/34536028-f4e60c48-f091-11e7-9fd3-c2bd59453c83.PNG">

## Technologies
Node.js
Javascript
Twitter NPM Package - https://www.npmjs.com/package/twitter
Spotify NPM Package - https://www.npmjs.com/package/spotify
Request NPM Package - https://www.npmjs.com/package/request
