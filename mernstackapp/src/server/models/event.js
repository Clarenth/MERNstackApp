const mongo = require('mongoose');

//Event Schema
const eventSchema = mongo.Schema({
    username: {type: String, require: true},
    action: {type: String, require: true},
    time: {type: Date, default: Date.now},
    room: {type: String, require: true},
})