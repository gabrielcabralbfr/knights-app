var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var knightsRouter = require('./routes/knights');

var mongoose = require('mongoose');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/knights', knightsRouter);


mongoose.connect('mongodb://localhost:27017/knightdb', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log("CONNECTED TO MONGODB")

});
module.exports = app;