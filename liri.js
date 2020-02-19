require("dotenv").config();
const moment = require("moment");
const Spotify = require("node-spotify-api");
const axios = require("axios");


// variable for the Spotify keys
let keys = require("./keys.js");
let spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});
let spotifyID = spotify.credentials.id;
let spotifySecret = spotify.credentials.secret;

// spotify keys
// console.log(keys);
// console.log(`Your spotify ID is: ${spotifyID}`);
// console.log(`Your spotify secret is: ${spotifySecret}`);

let command = process.argv[2];
let search = process.argv.slice(3).join("+");
let searchDisplay = process.argv.slice(3).join(" ");

// console.log(command)
// console.log(search);

// functions for the search
concert = (artist) => {
    let queryURL = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`;

    // axios call
    axios.get(queryURL).then(function (response) {
        let results = response.data;
        for (let i = 0; i < results.length; i++) {
            let date = moment(results[i].datetime).format("MM/DD/YYYY hh:mm A")
            console.log(`Name: ${results[i].venue.name}`);
            console.log(`Location: ${results[i].venue.city}`);
            console.log(`Date: ${date}`);
            console.log(`--------------------`)
        }
    }).catch(error => {
        if (error.response) {
            console.log(error.response);
        }
    })
}

songSearch = (title) => {
    spotify.search({ type: 'track', query: title }, function (err, data) {
        if (err) {
            return console.log(`Error: ${err}`);
        }
        let dataArray = data.tracks.items;
        // console.log(dataArray[0].artists[0].name);
        console.log(`Artist: ${dataArray[0].artists[0].name}`)
        console.log(`Song Name: ${dataArray[0].name}`);
        console.log(`Preview Link: \n${dataArray[0].preview_url}`);
        console.log(`Album Name: ${dataArray[0].album.name}`);
    })
}

// what to run when the user types
if (command === "concert-this") {
    console.log(`I will show you concerts for ${searchDisplay}\n`);
    concert(search);
} else if (command === "spotify-this-song") {
    if (search === "") {
        songSearch("The Sign")
    } else {
        songSearch(search);
    }
}