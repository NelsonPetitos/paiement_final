let mongoose = require('mongoose')
let uniqueValidator = require('mongoose-unique-validator')
let Schema = mongoose.Schema

let mySchema = new Schema({
    num: { type: String, required: true },
    user: { type: Schema.ObjectId, ref: 'User' }
});

mySchema.plugin(uniqueValidator);

module.exports = mongoose.model('Account', mySchema)