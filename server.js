// Get our dependencies
var express = require('express');
var app = express();
const dotenv = require('dotenv');
dotenv.config();
var mariadb = require("mariadb/callback");
var connection = mariadb.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

connection.connect(err => {
  if (err) {
    console.log("not connected due to error: " + err);
  } else {
    console.log("connected ! connection id is " + connection.threadId);
    // console.log(process.env);
  }
});

function getMovies(callback) {  connection.query("SELECT * FROM moviereview", (err, rows) => callback(err, rows))}

function getReviewers(callback) {  connection.query("SELECT * FROM reviewer", (err, rows) => callback(err, rows))}

function getPublications(callback) {  connection.query("SELECT * FROM publication", (err, rows) => callback(err, rows))}

function getPendings(callback) {  connection.query("SELECT * FROM pending", (err, rows) => callback(err, rows))}

//Testing endpoint
// app.get('/', function (req, res) {
//   var response = [{ response: 'hello' }, { code: '200' }]
//   res.json(response);
// })

app.get('/movies', function (req, res) {
  getMovies(function (err, moviesResult) {
    if (err) throw err;
    res.json(moviesResult);
    console.log(moviesResult);
  })})

app.get('/reviewers', function (req, res) {
  getReviewers(function (err, reviewersResult) {
    if (err) throw err;
    res.json(reviewersResult);
    console.log(reviewersResult);

  })})

app.get('/publications', function (req, res) {
  getPublications(function (err, publicationsResult) {
    if (err) throw err;
    res.json(publicationsResult);
    console.log(publicationsResult);

  })})

app.get('/pending', function (req, res) {
  getPendings(function (err, pendingsResult) {
    if (err) throw err;
    res.json(pendingsResult);
    console.log(pendingsResult);

  })})

// console.log("server listening through port: " + process.env.PORT);
// Launch our API Server and have it listen on port 3000.
app.listen(process.env.PORT || 3000);
module.exports = app;
