let mongoose = require('mongoose');
let uri = 'mongodb://root:WAT#mobilemoney16#@jello.modulusmongo.net:27017/zi3myQed';

let db = mongoose.createConnection(uri);

db.on('connected', ()=> {
    console.log(`Connection to modem database succed.`)
})

db.on('error', (err)=>{
    console.log(`Error occur while connecting to modem database code: ${err}`);
})

db.on('disconnected', ()=>{
    console.log(`modem database connection close.`);
})  

module.exports = db ;