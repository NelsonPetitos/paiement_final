let express = require('express');
let router = express.Router();
let Token = require('../models/token');
let User = require('../models/user')

router.post('/tokens', (request, response) => {
    let token = new Token();
    token.phone = request.body.phone;
    token.amount = request.body.amount;
    token.apikey = request.body.apikey;
    token.token = request.body.token;
    token.socketid = request.body.socketid;

    console.log(request.body);

    if (token.socketid == null || token.apikey == null || token.token == null || token.amount == null || token.phone == null || /^[1-9][0-9]{8,}/.test(token.phone) == false) {
        response.send({ err: true, msg: "Invalid phone number", data: null })
    } else {
        token.save().then((data) => {
            console.log(`Token save`);
            response.send({ err: false, msg: 'Token save', data: data });
        }, (err) => {
            console.log(`Erreur de sauvegarde du token. ${err}`);
            response.send({ err: true, msg: 'Save operation fail an error occur.', data: null });
        });
    }
})

router.post('/init-paiement', (req, res) => {
    // Check if the modem is enable
    let params = {
        amount: req.body.amount,
        phone: req.body.phone,
        token: req.body.token,
        publickey: req.body.publickey,
        privatekey: req.body.privatekey
    }
    if(req.modemSocket == null){
        res.send({ err: true, msg: 'Service temporary down. Contact API managers.', data: null });
    }else{
        //
        if(params.amount == null || params.token == null || params.privatekey == null || params.publickey  == null || params.phone == null){
            res.send({ err: true, msg: 'Missing request body parameters.', data: null });
        }else{
            // res.send({ err: true, msg: 'Controle ok', data: null });
            User.findOne({ apikey: params.publickey, privatekey: params.privatekey }, (err, user) => {
                if (err != null || user == null) {
                    console.log(`Wrong private or public key: ${err}`);
                    res.send({ err: true, msg: 'Wrong private or public key.', data: null });
                } else {
                    // console.log("I can pass check if the token exist.");
                    Token.findOne({ apikey: params.publickey, amount: params.amount, phone: params.phone, token: params.token }, (err, token) => {
                        if (err != null || token == null) {
                            console.log(`Token verification error : ${err}`);
                            res.send({ err: true, msg: 'This token does not match this amount and this public key for this phone number', data: null });
                        } else {
                            console.log(`I can pass check if the socketid exist. size = ${req.listSocket.size}`);
                            let socketiter = req.listSocket.values();
                            let socket = socketiter.next().value;
                            while(socket){
                                if(socket.id == token.socketid){
                                    let message = {
                                        phone: token.phone,
                                        socket: token.socketid,
                                        apikey: token.apikey,
                                        secretkey: req.secretKey,
                                        amount: token.amount,
                                    }
                                    req.modemSocket.emit('paiement', message);
                                    res.send({ err: false, msg: 'Paiement sucessfully initiate.', data: null });
                                    return;
                                }
                                socket = socketiter.next().value;
                            }
                            res.send({ err: true, msg: 'The user refresh the page and close the socket.', data: null });
                          
                        }
                    });
                }
            });
        }
    }
})

module.exports = router