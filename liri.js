require("dotenv").config();
const moment = require("moment");

// variable for the Spotify keys
let keys = require("./keys.js");
const axios = require("axios");

// spotify keys
console.log(keys);
console.log(keys.spotify);

let command = process.argv[2];
let search = process.argv.slice(3).join("+");
let searchDisplay = process.argv.slice(3).join(" ");

console.log(command)
console.log(search);

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

// what to run when the user types
if (command === "concert-this") {
    console.log(`I will show you concerts for ${searchDisplay}\n`);
    concert(search);
}