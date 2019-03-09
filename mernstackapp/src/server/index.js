var express = require("express");
var http = require('http');
const bodyParser = require('body-parser');
var path = require("path");
var mongoose = require("mongoose");
var app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
  });

//mLab Database
mongoose.connect('mongodb://T127:DukeRedrix44@ds121455.mlab.com:21455/comp3133a1', {useNewUrlParser: true})
  .then(() => {
    console.log('Connected to mLab database');
  })
  .catch(err => {
    console.error('Error connecting to DB', err.stack);
  })

//DB connecting notification
console.log('Connecting to mLab database');

//routes include
const eventRoutes = require('server/routes/events');

//routes setup
app.use('/api/eventlog', eventRoutes);

module.exports = app;