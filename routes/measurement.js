const express = require('express');
var request = require('request');
var qs = require('querystring')
var router = express.Router();

const Measurement = require('../models/measurement');

/* GET measurement data. */
/* REMOVE TURBIDITY /1000 */
router.get('/', function(req, res, next) {
  request('http://192.168.0.125', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var req_data = qs.parse(body);
      
      /* PARSE BODY CONTENT */
      let text="";
      for (let key in body) { 
        if(parseInt(key, 10) > 50){
          text +=body[key];
        }
      }
      text = JSON.parse(text);
      console.log(text);
      console.log("REMOVE TURBIDITY /1000");

      let actualDate = new Date();
      let newMeasurement = new Measurement({
        date: actualDate,
        temperature: text.values.temperature,
        ph: text.values.pHvalue,
        turbidity: text.values.turbidity/1000,
        level: text.values.level
      });
      
      /* ADD RECEIVED VALUE TO DATABASE */
      Measurement.addMeasurement(newMeasurement, (err, measurement)=>{
        if(err){
          res.json({success: false, msg:"Failed to add new Measurement"});
        }else{
          /* IF SUCCESS RETURN DATABASE MEASUREMENTS */
          Measurement.getMeasurement((err, measurements)=>{
            if (err){
              res.json({success: false,msg:'Error getting measurements from database'});
            }else{
              res.json({success: true,msg:measurements});
            }
          });
        }
      });      
    }
  });
  
});

/* GET report data*/
router.get('/report', function(req, res, next){
  res.send('respond with a report source');
});

router.post('/add', function(req, res, next){

  /* GET VALUES FROM BOARD */
  request('http://192.168.0.125', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      let values = JSON.parse(body);
      console.log(values);
    }
  });


  /*let newMeasurement = new Measurement({
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
  });*/
});

module.exports = router;
