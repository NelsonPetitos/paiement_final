let mongoose = require('mongoose')
let Schema = mongoose.Schema
let webConn = require('../web-db-connection')

let bcrypt = require('bcrypt')
const saltRounds = 10;

let mySchema = new Schema({
    name: { type: String, required: true },
    adress: { type: String},
    email: { type: String},
    picture: { data: Buffer, contentType: String },
    phone: { type: String, required: true },
    code: { type: String, required: true },
    user: { type: Schema.ObjectId, ref: 'User', required: true }
});

mySchema.pre('save', function(next){
    var cashier = this;
    bcrypt.hash(cashier.code, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        if(err){
            return next(err)
        }
        cashier.code = hash;
        next()
    });
});

mySchema.method('compareCode', function(code){
    return bcrypt.compareSync(code, this.code);
})

module.exports = webConn.model('Cashier', mySchema)