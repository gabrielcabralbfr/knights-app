var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var mongoose = require('mongoose');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log("CONNECTED TO MONGODB")

});

var { Knight } = require("./models/Knight")
var me = new Knight(
  {
    "name": "",
    "nickname": "",
    "birthday": "1995/02/17",
    "weapons": [{ "name": "sword", "mod": 3, "attr": "strength", "equipped": true }],
    "attributes": { "strength": 0, "dexterity": 0, "constitution": 0, "intelligence": 0, "wisdom": 0, "charisma": 0 },
    "keyAttribute": "strength"
  }
)

console.log("ME", me.toJSON({ virtuals: true }))


module.exports = app;
