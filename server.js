'use strict'


let express = require('express')
let http = require('http')
let app = express()
let server = http.createServer(app)
let io = require('socket.io')(server)
let popupRoute = require('./routes/popup-routes')
let homeRoute = require('./routes/home-routes')
let userRoute = require('./routes/users-routes')
// let accountRoute = require('./routes/account-routes')
// let adressRoute = require('./routes/adress-routes');
let modemRoute = require('./routes/modem-routes');
// let cashierRoute  = require('./routes/cashier-routes');
let tokenRoute = require('./routes/token-routes');
let phoneOperatorRoute = require('./routes/phone_operator-routes');
let countryRoute = require('./routes/country-routes');
let paymentRoute = require('./routes/payment-routes');
let messageRoutes = require('./routes/message-routes');
// let mongoose = require('mongoose')
// var cleanup = new (require('./public/js/cleanup'))();
let listSocket = new Set()
let modemSocket = undefined
let secretKey = "1234567890"
let bodyParser = require('body-parser')
const WAITING_CODE = 105;
const STATUS_SEND_FIELD = 'status_send';
const STATUS_RECEIVE_FIELD = 'status_receive';
//Connect to database
// mongoose.connect('mongodb://ndenelson:Picsou_88modulus@jello.modulusmongo.net:27017/iG8apaze', (err) => {
// // mongoose.connect('mongodb://localhost:27017/paiement_api_db', (err) =>{
//     if (err) {
//         console.log(`Not connected to the database. ${err}`)
//     } else {
//         console.log(`Sucessfull connected to the database.`)
//     }
// })  

//Set ejs as the templates engine
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)


//Body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Middleware pour gerer les requetes ajaxs (de type XMLHttpRequest ou XDomainRequest
app.use((req, res, next) => {
    // res.header("Access-Control-Allow-Origin", req.get('origin'));
    // res.header("Access-Control-Allow-Credentials", true)
    // next();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE');
    req.listSocket = listSocket;
    req.modemSocket = modemSocket;
    req.secretKey = secretKey;
    req.dburl = process.env.DATABASE_URL || "postgres://ikntzckuoezhir:98e35a9b920941670cbcaab37b3a0e57caef933a74e880842d0ef5e754625f51@ec2-23-21-204-166.compute-1.amazonaws.com:5432/d26n73vncdubt1";
    next();
});


//Middleware
app.use('/assets', express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/sites'));
app.use(express.static(__dirname + '/sites/src'));
// app.use('/lib', express.static(__dirname + '/node_modules'));
// app.use('/app', express.static(__dirname + '/site/src'));

app.use('/initpopup', popupRoute)
app.use('/api/users', userRoute)
// app.use('/api/account', accountRoute)
// app.use('/api/adress', adressRoute)
// app.use('/api/cashier', cashierRoute)
app.use('/api', messageRoutes)
app.use('/api', modemRoute)
app.use('/api', tokenRoute)
app.use('/api', phoneOperatorRoute)
app.use('/api', countryRoute)
app.use('/api/payment', paymentRoute)
app.use('*', homeRoute)



//need to be improve to handle client paiement request
io.on('connection', (socket) => {
    // console.log(`New socket connection with identifier: ${socket.id}`)
    
        // console.log(socket.client.conn)
    let clientIp = socket.request.connection.remoteAddress;
    console.log(`New socket with ip adress  = ${clientIp} and id = ${socket.id}`);

    listSocket.add(socket); //Keep a list of all socket connected to the server

    //All to do if socket it's not the server
    socket.on('wearetechapi_client_emit', (data) => {
        // console.log("Donnes recues du navigateur")
        if(data.isweb === true){
            // Les données st pour le serveur web
            let phone = data.phone;
            let country = data.country;
            let operator = data.operator;

            console.log(data.country+data.phone);
            if(!verifiedPhone(phone, country, operator)){
                let result = {
                    error: true,
                    message: "Incorrect parameters."
                }
                console.log('Invalid phone number.');
                socket.emit('wearetechapi_server_response', result);
                socket.disconnect();
            }else{
                if (typeof modemSocket === 'undefined') {
                    //Le modem n'est pas connecte
                    console.log('Le modem n\'est pas connecte ');
                    let result = {
                        error: true,
                        message: "Service down. Try again later."
                    }
                    socket.emit('wearetechapi_server_response', result)
                    socket.disconnect();
                }else{
                    console.log('Valid phone number. Call save token method');
                    let token = {
                        amount: data.amount,
                        apikey: data.apikey,
                        country: country,
                        operator: operator,
                        phone:  ''+data.code+data.phone,
                        adress_ip: clientIp,
                        email: data.email,
                        socketid: socket.id
                    }
                    saveToken(token, socket);
                }
                
            }
        }else{
            // Les données st pour le serveur mobile
            // console.log('Le navigateur veut verifier son paiement avec le modem');
            checkPaymentWithModem(data.reference, data.token, socket);
        }
            
    });

    socket.on('paiement', (data) => {
        console.log('le modem vient de me dire : ');
        console.log(data);
        // Mettre à jour le paiement dans la base de données
        if (data.secretkey == secretKey) {
            if(data.token && data.err && data.code){
                updatePaymentStatus(data.token, STATUS_RECEIVE_FIELD, data.err, data.code, data.messageid)
            }
            listSocket.forEach((socket) => {
                if (socket.id == data.socket) {
                    console.log("Sender socket find. The response send back to the browser")
                    let result = {
                        error: data.err,
                        message: "Payment succeed.",
                        code: data.code,
                        data: null,
                        token: data.token
                    }
                    switch(data.code){
                        //impossible d'établir la connexion avec le port du modem
                        case 401: 
                            // console.log("100");
                            result.message = "Message not found. If you did the payment wait few minutes and try again; or check that you send the good reference number.";
                            break;

                        //argument from web server is in wrong format
                        case 402:
                            // console.log("101");
                            result.message = "The amount you sent is not corresponding to the one expected.";
                            break;

                        //erreur survenue lors de l'initiation du paiement
                        case 200:
                            // console.log("102");
                            result.message = "Payment succeed";
                            break;

                        default:
                            console.log(data.errorCode);
                            result.message = 'Unknown error.';
                    }
                    socket.emit('wearetechapi_server_response', result)
                    if(data.code != 401){
                        socket.disconnect();
                    }
                }
            })
        }
    });

    socket.on('modemSocket', (data) => {
        if (data.secretkey == secretKey) {
            modemSocket = socket;
            console.log(`The modem just connect and it\'s identified ${socket.id}`);
        }
    });

    socket.on('disconnect', () => {
        console.log(`The socket ${socket.id} is disconnected.`)
        if (typeof modemSocket !== 'undefined' && socket.id == modemSocket.id) {
            modemSocket = undefined
        }
        socket.disconnect()
        listSocket.delete(socket)
    });
})

function verifiedPhone(phone, country, operator){
    return !(typeof phone == 'undefined' || phone == null || typeof country == 'undefined' || country == 0 || typeof operator == 'undefined' || operator == 0 || /^[1-9][0-9]{8,}/.test(phone) == false)
}

function saveToken(data, socket){
    let rawData = '';
    let options = {
            hostname: server.address().address,
            port: server.address().port,
            path: '/api/token',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
    };
    let req = http.request(options, function(res) {
        res.setEncoding('utf8');
        
        res.on('data', function (chunk) {
            rawData += chunk;
        });

        res.on('end', function(){
            let token = JSON.parse(rawData);
            if(token.err){
                //Il y'a erreur
                let result = {
                    error: true,
                    message: "Service down. Try again in few minutes."
                }
                console.log('Il y a une erreur lors de la creation du token');
                socket.emit('wearetechapi_server_response', result)
                socket.disconnect();
            }else{
                //Send my request to the Mobile server and wait for the validation
                let data = token.data;
                let result = {
                    data:{amount: data.amount, token: data.token, phone: data.phone},
                    error: true,
                    code: WAITING_CODE,
                    message: "Token send back. Do not refresh the page."
                }
                socket.emit('wearetechapi_server_response', result)
            }
        });
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
        let result = {
            error: true,
            message: "Service down. Try again in few minutes."
        }
        socket.emit('wearetechapi_server_response', result)
        socket.disconnect();
    });
    // write data to request body
    req.write(JSON.stringify(data));
    req.end();
}

function checkPaymentWithModem(reference, token, socket){
    let rawData = '';
    let options = {
            hostname: server.address().address,
            port: server.address().port,
            path: `/api/token/${token}`,
            method: 'GET'
    };
    let req = http.request(options, function(res) {
        res.setEncoding('utf8');
        
        res.on('data', function (chunk) {
            rawData += chunk;
        });

        res.on('end', function(){
            let result = JSON.parse(rawData);
            console.log(result)
            if(result.err === true){
                //Il y'a erreur
                console.log('Il y a une erreur')
                let message = {
                    error: true,
                    message: "Service down. Try again in few minutes."
                }
                socket.emit('wearetechapi_server_response', message)
                socket.disconnect();
            }else{
                //Send my request to the Mobile server and wait for the validation
                console.log('Je communique avec le modem');
                let message = {
                    phone: result.data.phone,
                    socket: result.data.socketid,
                    secretkey: secretKey,
                    amount: result.data.amount,
                    reference: reference,
                    token: result.data.token
                }
                console.log(`J'envoie au serveur le message  : `);
                console.log(message);
                modemSocket.emit('paiement', message);
                updatePaymentStatus(token, STATUS_SEND_FIELD);
            }
        });
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
        let result = {
            error: true,
            message: "Service down. Try again in few minutes."
        }
        socket.emit('wearetechapi_server_response', result)
        socket.disconnect();
    });
    
    // write data to request body
    req.end();
}

function updatePaymentStatus(token, field, status_payment, code, message){
    // console.log('update status paiement');
    let rawData = '';
    let options = {
            hostname: server.address().address,
            port: server.address().port,
            path: `/api/payment`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
    };
    let req = http.request(options, function(res) {
        res.setEncoding('utf8');
        
        res.on('data', function (chunk) {
            rawData += chunk;
        });

        res.on('end', function(){
            let result = JSON.parse(rawData);
            console.log(result)
            if(result.err === true){
                console.log('Il y a une erreur. Le status n a pas ete change sur le champ '+field)
            }else{
                console.log('Le status du paiement a ete change sur le champ '+field);
            }
        });
    });

    req.on('error', function(e) {
        console.log('problem with update request: ' + e.message);
    });
    
    // write data to request body
    let data = {
        field: field,
        token: token,
        code: code,
        message: message,
        status_payment: status_payment
    }
    req.write(JSON.stringify(data));
    req.end();
}

// process.on('exit',  () => {
//     console.log('On exit event occur...')
// })

server.listen(process.env.PORT || 5000, (err) => {
    console.log(`Server running on port ${process.env.PORT || server.address().port}`)
    // console.log(server.address().port);
})