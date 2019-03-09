const mongo = require('mongoose');

//message schema
const messageSchema = mongoose.Schema({
    _id: {type:mongoose.Types.ObjectId},
    username: {type: String, required: true},
    message: {type: String, required: true},
    time : { type : Date, default: Date.now },
    room: {type: String, required: true},
})

module.exports = mongo.model('Message', messageSchema);