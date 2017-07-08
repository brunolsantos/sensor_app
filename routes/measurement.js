const express = require('express');
var router = express.Router();

const Measurement = require('../models/measurement');

/* GET measurement data. */
router.get('/', function(req, res, next) {
  Measurement.getMeasurement((err, measurements)=>{
    if (err){
      res.json({success: false,msg:'Error getting measurements from database'});
    }else{
      res.json({success: true,msg:measurements});
    }
  });
});

/* GET report data*/
router.get('/report', function(req, res, next){
  res.send('respond with a report source');
});

router.post('/add', function(req, res, next){
  let newMeasurement = new Measurement({
    date: req.body.date,
    temperature: req.body.temperature,
    ph: req.body.ph,
    turbidity: req.body.turbidity,
    level: req.body.level
  });
  
  Measurement.addMeasurement(newMeasurement, (err, measurement)=>{
    if(err){
      res.json({success: false, msg:"Failed to add new Measurement"});
    }else{
      res.json({success: true, msg:"Added new Measurement", data:measurement});
    }
  });
});

module.exports = router;
