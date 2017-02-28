let mongoose = require('mongoose')
let uniqueValidator = require('mongoose-unique-validator')
let webConn = require('../web-db-connection')
let Schema = mongoose.Schema

let mySchema = new Schema({
    phone: { type: String, required: true },
    amount: { type: String, required: true },
    token: { type: String, required: true },
    apikey: { type: String, required: true },
    socketid: { type: String, required: true }
});

module.exports = webConn.model('Token', mySchema)