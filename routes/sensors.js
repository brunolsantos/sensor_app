const express = require('express');
var router = express.Router();

const Sensor = require('../models/sensor');

/* GET sensors data. */
router.get('/', function(req, res, next) {
  Sensor.find(function(err, data){
    res.json(data);
  });
});

/* GET report data*/
router.get('/report', function(req, res, next){
  res.send('respond with a report source');
});

module.exports = router;
