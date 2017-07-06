const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SensorSchema = Schema({
    date: { type: Date, default: Date.now },
    temperature: Number,
    ph: Number,
    turbidity: Number,
    level: Boolean
});

module.exports = mongoose.model('Sensor', SensorSchema);