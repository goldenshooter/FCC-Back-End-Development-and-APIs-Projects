// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

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

// empty date parameter returns current time
app.get("/api", function (req, res) {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  });
});


// this api can handle transfer date (like 2025-12-25) and timestamp (like 1700000000000)
app.get("/api/:dateTime", function (req, res) {
  let dateTime = req.params.dateTime;
  let date;

  // if dateTime is not exist, return current date
  if (!dateTime) {
    date = new Date();
  } else if (isNaN(dateTime)) {
    date = new Date(dateTime);
  } else {
    date = new Date(parseInt(dateTime, 10));
  }

  if (date.toString() === "Invalid Date") {
    res.json({error: "Invalid Date"});
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });}
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
