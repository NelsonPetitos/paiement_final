let mongoose  = require('mongoose')
let Schema = mongoose.Schema
let uniqueValidator = require('mongoose-unique-validator')

let mySchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    apikey: {type: String, required: true},
})
mySchema.plugin(uniqueValidator )

let model = mongoose.model('User', mySchema)

module.exports = model
