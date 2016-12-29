let mongoose  = require('mongoose')
let webConn = require('../web-db-connection')
let Schema = mongoose.Schema
let uniqueValidator = require('mongoose-unique-validator')
let bcrypt = require('bcrypt')
const saltRounds = 10;

let mySchema = new Schema({
    email: {type: String, lowercase: true, required: true, unique: true},
    password: {type: String, required: true},
    apikey: {type: String, required: true, unique: true},
});

mySchema.plugin( uniqueValidator );

mySchema.pre('save', function(next){
    var user = this;
    bcrypt.hash(user.password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        if(err){
            return next(err)
        }
        user.password = hash;
        next()
    });
});

mySchema.method('comparePassword', function(password){
    return bcrypt.compareSync(password, this.password);
})

let model = webConn.model('User', mySchema)

module.exports = model
