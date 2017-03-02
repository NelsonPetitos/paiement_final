let express = require('express');
let router = express.Router();
let Token = require('../models/token');
let User = require('../models/user')
let pg = require('pg')

let testParamater = function (argument) {
    // body... 
    let phoneSchema = /^[1-9][0-9]{8,}/;
    return( argument.socketid == null || argument.socketid == ''  ||
            argument.apikey == null ||  argument.apikey == '' ||
            argument.amount == null || argument.amount == '' ||
            argument.phone == null ||  argument.phone == '' ||
            phoneSchema.test(argument.phone) == false)
}

router.post('/tokens', (req, res) => {
    let params = {
        phone: req.body.phone,
        amount: req.body.amount,
        apikey: req.body.apikey,
        socketid: req.body.socketid
    }

    // console.log(req.body);
    // let test = testParamater(params);
    if (testParamater(params)){
        // response.send({ err: true, msg: "Invalid phone number", data: null })
        res.status(200).json({ err: true, msg: "Send valid not empty parameters.", data: null })
    } else {
        // token.save().then((data) => {
        //     console.log(`Token save`);
        //     response.send({ err: false, msg: 'Token save', data: data });
        // }, (err) => {
        //     console.log(`Erreur de sauvegarde du token. ${err}`);
        //     response.send({ err: true, msg: 'Save operation fail an error occur.', data: null });
        // });
        pg.connect(req.dburl, function(err, client, done) {
            if(err){
                console.log('Erreur connection a la bd');
                console.error(err); 
                res.status(200).json({ err: true, msg: 'Database connection error.', data: null });
            }
            client.query('INSERT INTO tokens(phone, amount, apikey, socketid) VALUES ($1, $2, $3, $4) returning phone, amount, apikey, socketid, token', [params.phone, params.amount, params.apikey, params.socketid], function(err, result) {
                done();
                if(err){ 
                    console.error('Erreur requete'); 
                    console.log(err);
                    res.status(200).json({ err: true, msg: 'Token constraints error.', data: null});
                }
                
                // console.log(result.rows);
                
                if(result.rows.length === 1){
                    let data = {
                        phone: result.rows[0].phone,
                        amount : result.rows[0].amount,
                        apikey: result.rows[0].apikey,
                        token: result.rows[0].token
                    }
                    res.status(200).json({ err: false, msg: 'Token create.', data: data });
                }else{
                    res.status(200).json({ err: false, msg: 'Multiple results not expected.', data: result.rows});
                }

            });
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
        return res.status(200).json({ err: true, msg: "Service temporary down. Contact API managers", data: null })
        // res.send({ err: true, msg: 'Service temporary down. Contact API managers.', data: null });
    }else{
        //
        if(params.amount == null || params.token == null || params.privatekey == null || params.publickey  == null || params.phone == null){
            return res.send({ err: true, msg: 'Missing request body parameters.', data: null });
        }else{
            // res.send({ err: true, msg: 'Controle ok', data: null });
            pg.connect(req.dburl, function(err, client, done) {
                if(err){
                    console.log('Erreur connection a la bd');
                    console.error(err); 
                    return res.status(200).json({ err: true, msg: 'Database connection error.', data: null });
                }
                client.query('SELECT * FROM users WHERE privatekey = $1 AND apikey = $2 ', [params.privatekey, params.publickey], function(err, result) {
                    done();
                    if(err){ 
                        console.error('Erreur requete sur la table users'); 
                        console.log(err);
                        return res.status(200).json({ err: true, msg: 'Fetching user error.', data: null });
                    }
                    // console.log(result.rows.length);
                    if(result.rows.length === 0){
                        return res.status(200).json({ err: true, msg: 'Wrong private or public key.', data: null });
                    }
                    
                    if(result.rows.length > 1){
                        return res.status(200).json({err: true, msg: 'Multiple request responses unexpected.', data: null})
                    }

                    if(result.rows.length === 1){
                        pg.connect(req.dburl, function(err, client, done){
                            if(err){
                                console.log('Erreur connection a la bd');
                                console.error(err); 
                                return res.status(200).json({ err: true, msg: 'Database connection error.', data: null });
                            }
                            client.query('SELECT * FROM tokens WHERE token = $1 AND amount = $2 AND apikey = $3', [params.token, params.amount, params.publickey], function(err, result) {
                                done();
                                if(err){ 
                                    console.error('Erreur requete sur la table token'); 
                                    console.log(err);
                                    return res.status(200).json({ err: true, msg: 'Fetching token error.', data: null });
                                }
                                // console.log(result.rows.length);
                                if(result.rows.length === 0){
                                    console.log(result.rows);
                                    return res.status(200).json({ err: true, msg: 'Wrong token, or amount or apikey.', data: null });
                                }
                                
                                if(result.rows.length > 1){
                                    return res.status(200).json({err: true, msg: 'Multiple request responses unexpected.', data: null})
                                }

                                if(result.rows.length === 1){
                                    let token = result.rows[0];
                                    // console.log(`I can pass check if the socketid exist. size = ${req.listSocket.size}`);
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
                                            return res.send({ err: false, msg: 'Paiement sucessfully initiate.', data: null });
                                        }
                                        socket = socketiter.next().value;
                                    }
                                    return res.status(200).json({err: true, msg: 'The user refresh the page and close the socket.', data: null})
                                    // res.send({ err: true, msg: 'The user refresh the page and close the socket.', data: null });
                                }
                                
                            });
                        })
                    }
                    
                });
            });

            // User.findOne({ apikey: params.publickey, privatekey: params.privatekey }, (err, user) => {
            //     if (err != null || user == null) {
            //         console.log(`Wrong private or public key: ${err}`);
            //         res.send({ err: true, msg: 'Wrong private or public key.', data: null });
            //     } else {
            //         // console.log("I can pass check if the token exist.");
            //         Token.findOne({ apikey: params.publickey, amount: params.amount, phone: params.phone, token: params.token }, (err, token) => {
            //             if (err != null || token == null) {
            //                 console.log(`Token verification error : ${err}`);
            //                 res.send({ err: true, msg: 'This token does not match this amount and this public key for this phone number', data: null });
            //             } else {
            //                 console.log(`I can pass check if the socketid exist. size = ${req.listSocket.size}`);
            //                 let socketiter = req.listSocket.values();
            //                 let socket = socketiter.next().value;
            //                 while(socket){
            //                     if(socket.id == token.socketid){
            //                         let message = {
            //                             phone: token.phone,
            //                             socket: token.socketid,
            //                             apikey: token.apikey,
            //                             secretkey: req.secretKey,
            //                             amount: token.amount,
            //                         }
            //                         req.modemSocket.emit('paiement', message);
            //                         res.send({ err: false, msg: 'Paiement sucessfully initiate.', data: null });
            //                         return;
            //                     }
            //                     socket = socketiter.next().value;
            //                 }
            //                 res.send({ err: true, msg: 'The user refresh the page and close the socket.', data: null });
                          
            //             }
            //         });
            //     }
            // });
        }
    }
})

module.exports = router