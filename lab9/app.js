  
const express = require('express');
const app = express();
const router = express.Router()
const static = express.static(__dirname + '/public');
const path = require("path")

app.use(express.static('public'))
app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});