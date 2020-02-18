require("dotenv").config();

// variable for the Spotify keys
let keys = require("./keys.js");
const axios = require("axios");

// spotify keys
console.log(keys);
console.log(keys.spotify);

let command = process.argv[2];
let search = process.argv.slice(3).join("+");

console.log(command)
console.log(search);