let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let modConn = require('../modem-db-connection');

var mySchema = new Schema({
    sending_time:  Date,
    reception_time: Date,
    phone_number:   String,
    phone_operator:   String,
    command: String,
    response: String,
    status: String,
    serverRequest: { 
        apikey: String,
        socket_id: String,
        phone_number: String,
        amount: Number,
        reception_time: Date 
    }
});

module.exports = modConn.model('Requetemodem', mySchema)
