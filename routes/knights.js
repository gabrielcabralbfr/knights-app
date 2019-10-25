var express = require('express');
var router = express.Router();
const { Knight } = require("../models/Knight")

router.post('/', function (req, res, next) {
  var knight = new Knight(req.body)
  knight.save(function (err) {
    if (err) return res.send(err)
    res.send(knight);
  })
});

router.get('/', function (req, res, next) {
  Knight.find({}).exec(function (err, response) {
    if (err) return res.send(err)
    return res.send(response)
  })
});


module.exports = router;
