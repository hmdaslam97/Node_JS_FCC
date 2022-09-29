// // index.js
// // where your node app starts

// // init project
// var express = require("express")
// var app = express()

// // enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// // so that your API is remotely testable by FCC
// var cors = require("cors")
// const { response } = require("../../boilerplate-express-main/myApp")
// app.use(cors({ optionsSuccessStatus: 200 })) // some legacy browsers choke on 204

// // http://expressjs.com/en/starter/static-files.html
// app.use(express.static("public"))

// // http://expressjs.com/en/starter/basic-routing.html
// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/views/index.html")
// })

// // for empty date
// app.get("/api", (req, res) => {
//   res.send({
//     unix: Date.parse(new Date()),
//     utc: new Date().toUTCString(),
//   })
// })

// // /api/:date? or /api/123443
// app.get("/api/:date", (req, res) => {
//   if (req.params.date.length <= 10) {
//     let data = req.params.date
//     let arr = data.split("-")
//     // console.log(new Date(data));
//     // let x = new Date(req.params.date)
//     // console.log(typeof x, x);
//     let y = arr[0],
//       m = 01,
//       d = 01
//     if (Number(arr[1]) > 12 ||Number(arr[2]) > 31) 
//     {
//       res.send({ error: "Invalid Date" })
//     }
//     if (arr[2])
//     {
//       d = Number(arr[2])
//       d < 9 ? (d = "0" + d) : (d += "")
//     }
//     if (arr[1]) {
//       m = Number(arr[1])
//       m < 9 ? (m = "0" + m) : (m += "")
//     }

//     let ymd = "" + y + "-" + m + "-" + d
//     console.log(ymd);
//     res.send({
//       unix: Date.parse(ymd),
//       utc: new Date(ymd).toUTCString(),
//     })
//   } else if (req.params.date.length == 13) {
//     res.send({
//       unix: Number(req.params.date),
//       utc: new Date(Number(req.params.date)).toUTCString(),
//     })
//   } else {
//     res.send({ error: "Invalid Date" })
//   }
// })

// // your first API endpoint...
// app.get("/api/hello", function (req, res) {
//   res.json({ greeting: "hello API" })
// })

// // listen for requests :)
// var listener = app.listen(process.env.PORT, function () {
//   console.log("Your app is listening on port " + listener.address().port)
// })

// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

/* Modified code */
// Displays the current date as timestamps
app.get("/api", (req, res) => {
  // Gets current in UNIX
  req.unix = new Date().getTime();

  // Gets current time in UTC
  req.utc = new Date().toUTCString();

  // Displays the current date in UNIX and UTC format as JSON
  res.json({ unix: req.unix, utc: req.utc });
});

// Displays timestamps based on parameters
app.get("/api/:date", (req, res, next) => {
  // Retrieves date from endpoint
  let { date } = req.params;

  // Checks if date is in UNIX
  if (Number.isNaN(Date.parse(date))) {
    // Saves UNIX
    req.unix = +date;

    // Converts UNIX to UTC
    req.utc = new Date(+date).toUTCString();
  } else {
    // Converts date to UNIX
    req.unix = new Date(date).getTime();

    // Converts date to UTC
    req.utc = new Date(date).toUTCString();
  } 

  next();
}, (req, res) => {
  if (req.utc === "Invalid Date") {
    res.json({ error: req.utc });
  } else {
    // Displays date in UNIX and UTC format as JSON
    res.json({ unix: req.unix, utc: req.utc });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});