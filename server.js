const { json } = require("express");
// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000; //dynamic port

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars Characters (DATA)
// =============================================================
var reservation = [];
var waitList = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reservations", function (req, res) {
  res.sendFile(path.join(__dirname, "reservations.html"));
});
app.get("/tables", function (req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});
// Displays all characters
app.get("/api/tables", function (req, res) {
  res.json(reservation);
});
app.get("/api/waitlist", function (req, res) {
  res.json(waitList);
});

// Displays a single character, or returns false
// app.get("/api/tables", function (req, res) {
//   var chosen = req.params.newReservation;

//   console.log(chosen);

//   for (var i = 0; i < newReservation.length; i++) {
//     if (chosen === newReservation[i].routeName) {
//       return res.json(newReservation[i]);
//     }
//   }

//   return res.json(false);
// });

// Create New Characters - takes in JSON input
app.post("/api/tables", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  console.log("request.body", req.body);
  var newReservation = req.body;

  if (reservation.length < 5) {
    reservation.push(newReservation);
    res.json(reservation);
  } else {
    waitList.push(newReservation);
    res.json(waitList);
  }
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
