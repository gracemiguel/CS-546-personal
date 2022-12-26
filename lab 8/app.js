//I pledge my honor that I've abided by the Stevens Honor System.
const express = require('express');
const app = express();
const static = express.static(__dirname + "/public");
const configRoutes = require("./routes");

const exphbs = require("express-handlebars");

app.use("/public", static);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine("handlebars", exphbs({defaultLayout: "main"}));
var hbars = exphbs.create({});
hbars.handlebars.registerHelper('each_upto', function(arr, max, options){
  if(arr.length ==0 || !arr){
    return options.inverse(this);
  } 
  var result = [];
  for(i=0; i<max && i<arr.length; ++i){
    result.push(options.fn(arr[i]));
    return result.join('');
  }
})
app.set("view engine", "handlebars")
configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});