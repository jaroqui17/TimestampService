// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function (req, res) {
  let dateObj = new Date();
  let unixTime = 0;
  if(/^-?\d+$/.test(req.params.date)){
    dateObj = new Date(parseInt(req.params.date));
    unixTime = Date.parse(dateObj);
  }else{
    dateObj = new Date(req.params.date);
    unixTime = Date.parse(dateObj);
  }
  
  if(req.params.date == ""){
    let utcTime = new Date(Date.now()).toUTCString();
    unixTime = Date.parse(utcTime);
    res.json({unix: unixTime, utc: utcTime});
  }else if(unixTime == NaN){
    res.json({error: "Invalid Date"});
  }else{
    let utcTime = dateObj.toUTCString();
    res.json({unix: unixTime, utc: utcTime});
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
