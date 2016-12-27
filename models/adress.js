let mongoose = require('mongoose')
let Schema = mongoose.Schema

let mySchema = new Schema({
    street: { type: String },
    country: { type: String, required: true },
    code: { type: String, required: true },
    town: { type: String, required: true },
    postalbox: { type: String, required: true },
    phone: { type: String, required: true },
    user: { type: Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Adress', mySchema)