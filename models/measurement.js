const mongoose = require('mongoose');

var MeasurementSchema = mongoose.Schema({
    date: { type: Date, default: Date.now },
    temperature: Number,
    ph: Number,
    turbidity: Number,
    level: Boolean
});

const Measurement = module.exports = mongoose.model('Measurement', MeasurementSchema);

module.exports.getMeasurement = function(callback){
    Measurement.find(callback);
}

module.exports.addMeasurement = function(newMeasurement, callback){
    newMeasurement.save(callback);
}