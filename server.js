'use strict'

let listSocket = new Set()
let modemSocket = undefined
let secretKey = "1234567890"
let express = require('express')
let http = require('http')
let app = express()
let server = http.createServer(app)
let io = require('socket.io')(server)
let popupRoute = require('./routes/popup')
let homeRoute = require('./routes/home')
let userRoute = require('./routes/users')
let mongoose = require('mongoose')


//Connect to database
// mongoose.connect('mongodb://ndenelson:Picsou_88modulus@jello.modulusmongo.net:27017/iG8apaze')

//Set ejs as the templates engine
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)


//Middleware pour gerer les requetes ajaxs (de type XMLHttpRequest ou XDomainRequest
app.use((req, res, next) => {
    // res.header("Access-Control-Allow-Origin", req.get('origin'));
    // res.header("Access-Control-Allow-Credentials", true)
    // next();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE');
    next();
});


//Middleware
app.use('/assets', express.static(__dirname+'/public'))
app.use('/lib', express.static(__dirname+'/node_modules'))
app.use('/app', express.static(__dirname+'/app'))

app.use('/initpopup', popupRoute)
app.use('/users', userRoute)
app.use('/', homeRoute)



//need to be improve to handle client paiement request
io.on('connection', (socket) => {
    console.log(`New socket connection with identifier: ${socket.id}`)
    // console.log(socket.client.conn)
    listSocket.add(socket); //Keep a list of all socket connected to the server

    //All to do if socket it's not the server
    socket.on('wearetechapi_client_emit', (data) => {
        console.log('A browser just send me this data ')
        console.log(data)

        if(typeof modemSocket == 'undefined'){
            //Le modem n'est pas connecte
            let result = {
                result: null,
                error: true,
                message: "modem unavailable"
            }
            socket.emit('wearetechapi_server_response', result)
            socket.disconnect(0);
        }else{
            //Send my number to the Mobile server and wait for the validation
            let message = {
                phone: data.phone,
                socket: socket.id,
                apiKey: data.apiKey,
                secretKey: secretKey,
                amount: data.amount,
            }
            modemSocket.emit('message', message);
        }
    })

    socket.on('disconnect', ()=> {
        console.log(`The socket ${socket.id} is disconnected.`)
        if(typeof modemSocket !== 'undefined' && socket.id == modemSocket.id){
            modemSocket = undefined
        }
        listSocket.delete(socket)
        // socket.disconnect(0);

    })

    socket.on('message', (data)=> {
        console.log('The modem just answer me the response is ')
        console.log(data)
        if(data.secretKey == secretKey){
            listSocket.forEach((socket) =>{
                if(socket.id == data.socket){
                    console.log("Sender socket find. The response send back to the browser")
                    let result = {
                        result: data.airtime,
                        error: false,
                        message: "Request sucessfull"
                    }
                    socket.emit('wearetechapi_server_response', result)
                    socket.disconnect(0);
                }
            })
        }
    })

    socket.on('modemSocket', (data) => {
        if(data.secretKey == secretKey){
            modemSocket = socket;
            console.log('The modem just connect and it\'s identified')
        }
    })
})


server.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`)
})