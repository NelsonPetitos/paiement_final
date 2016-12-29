let mongoose = require('mongoose');
let uri = 'mongodb://ndenelson:Picsou_88modulus@jello.modulusmongo.net:27017/iG8apaze';

let db = mongoose.createConnection(uri)

db.on('connected', ()=> {
    console.log(`Connection to web database succed.`)
})

db.on('error', (err)=>{
    console.log(`Error occur while connecting to web database code: ${err}`);
})

db.on('disconnected', ()=>{
    console.log(`web database connection close.`);
})
module.exports = db ;