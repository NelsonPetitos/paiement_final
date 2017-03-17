let express = require('express');
let router = express.Router();
let Token = require('../models/token');
let User = require('../models/user')
let pg = require('pg')
const MESSAGE_CODE = 106;
const DATABASE_ERROR = 0;
let testParamater = function (argument) {
    let phoneSchema = /^[1-9][0-9]{8,}/;
    return( argument.socketid == null || argument.socketid == ''  ||
            argument.apikey == null || argument.apikey == '' ||
            argument.amount == null || argument.amount == '' ||
            argument.adress_ip == null || argument.adress_ip == '' ||
            argument.country_id == null || argument.country_id == '' ||
            argument.phone_operator_id == null || argument.phone_operator_id == '' ||
            argument.phone == null ||  argument.phone == '' ||
            phoneSchema.test(argument.phone) == false)
}



router.post('/tokens', (req, res) => {
    let params = {
        phone: req.body.phone,
        amount: req.body.amount,
        apikey: req.body.apikey,
        socketid: req.body.socketid,
        country_id: req.body.country,
        phone_operator_id: req.body.operator,
        adress_ip:  req.body.adress_ip,
        email: req.body.email
    }
    if (testParamater(params)){
        return res.status(200).json({ err: true, msg: "Send valid not empty parameters.", data: null });
    } else {
        pg.connect(req.dburl, function(err, client, done) {
            if(err){
                console.log('Erreur connection a la bd : tokens-routes');
                console.error(err); 
                return res.status(200).json({ err: true, msg: 'Database connection error.', data: null });
            }
            client.query('INSERT INTO tokens(phone, amount, apikey, socketid, adress_ip, phone_operator_id, country_id, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning token, phone, amount, apikey, socketid, adress_ip, phone_operator_id, country_id, email', [params.phone, params.amount, params.apikey, params.socketid, params.adress_ip, params.phone_operator_id, params.country_id, params.email], function(err, result) {
                done();
                if(err){ 
                    console.error('Erreur requete : tokens-routes'); 
                    console.log(err);
                    return res.status(200).json({ err: true, msg: 'Token constraints error.', data: null});
                }
                if(result.rows.length === 1){
                    let data = {
                        token: result.rows[0].token,
                        phone: result.rows[0].phone,
                        amount : result.rows[0].amount,
                        apikey: result.rows[0].apikey
                    }
                    console.log('Token save : tokens-routes');
                    return res.status(200).json({ err: false, msg: 'Token create.', data: data });
                }else{
                    console.log('Resultats multiples : tokens-routes');
                    return res.status(200).json({ err: false, msg: 'Multiple results not expected.', data: result.rows});
                }

            });
        });
    }
})





router.post('/init-paiement', (req, res) => {
    let params = {
        amount: req.body.amount,
        phone: req.body.phone,
        token: req.body.token,
        publickey: req.body.publickey,
        privatekey: req.body.privatekey
    }
    if(params.amount == null || params.token == null || params.privatekey == null || params.publickey  == null || params.phone == null){
        return res.status(400).json({ err: true, msg: 'Missing request body parameters.', data: null });
    }else{
        if(req.dburl){
            pg.connect(req.dburl, function(err, client, done) {
                if(err){
                    console.log('Erreur connection a la bd');
                    console.error(err); 
                    return res.status(200).json({ err: true, msg: 'Database connection error.'});
                }
                client.query('SELECT * FROM users WHERE privatekey = $1 AND apikey = $2 ', [params.privatekey, params.publickey], function(err, result) {
                    done();
                    if(err){ 
                        console.error('Erreur requete sur la table users'); 
                        console.log(err);
                        return res.status(500).json({ err: true, msg: 'Fetching user error.'});
                    }
                    if(result.rows.length === 0){
                        return res.status(400).json({ err: true, msg: 'Wrong private or public key.'});
                    }
                    
                    if(result.rows.length > 1){
                        return res.status(500).json({err: true, msg: 'Multiple request responses unexpected.'})
                    }

                    if(result.rows.length === 1){
                        let user = result.rows[0];
                        pg.connect(req.dburl, function(err, client, done){
                            if(err){
                                console.log('Erreur connection a la bd');
                                console.error(err); 
                                return res.status(200).json({ err: true, msg: 'Database connection error.'});
                            }
                            console.log(params.token);
                            console.log(params.amount);
                            console.log(params.publickey);
                            client.query('SELECT tokens.token, tokens.socketid, tokens.phone, tokens.apikey, tokens.amount, phone_operators.shortcode FROM tokens inner join phone_operators on tokens.phone_operator_id = phone_operators.id WHERE token = $1 AND amount = $2 AND apikey = $3', [params.token, params.amount, params.publickey], function(err, result) {
                                done();
                                if(err){ 
                                    console.error('Erreur requete sur la table token'); 
                                    console.log(err);
                                    return res.status(500).json({ err: true, msg: 'Fetching token error.'});
                                }
                                if(result.rows.length === 0){
                                    console.log(result.rows);
                                    return res.status(400).json({ err: true, msg: 'Wrong token, or amount or apikey.'});
                                }
                                
                                if(result.rows.length > 1){
                                    return res.status(500).json({err: true, msg: 'Multiple request responses unexpected.'})
                                }

                                if(result.rows.length === 1){
                                    let token = result.rows[0];
                                    let socketiter = req.listSocket.values();
                                    let socket = socketiter.next().value;
                                    let clientSocket;
                                    while(socket){
                                        if(socket.id == token.socketid){
                                            clientSocket = socket;
                                            break;
                                        }
                                        socket = socketiter.next().value;
                                    }
                                    if(!clientSocket){
                                        return res.status(200).json({err: true, msg: 'The user refresh the page and close the socket.'})
                                    }
                                    // Creer un enregistrement dans la base de données pour signifier qu'une demande de paiement a été initiée
                                    // En cas d'erreur il faut faire un message email au BDA pour lui dire qu'il y a des paiements qui pourront causer des problèmes car ils n'ont pas été enregistré
                                    pg.connect(req.dburl, function(err, client, done){
                                        if(err){
                                            console.log('Pas de paiement enregistre. Erreur connection a la bd.');
                                            let result_client = {
                                                data: null,
                                                error: true,
                                                code: DATABASE_ERROR,
                                                message: "Service temporary down. Try later."
                                            }
                                            clientSocket.emit('wearetechapi_server_response', result_client);
                                            return res.status(500).json({ err: true, msg: 'Service temporary down. Try later.' });
                                        }
                                        client.query('INSERT INTO payments(token_id, user_id) VALUES ($1, $2) returning id', [token.token, user.id], function(err, result) {
                                            done();
                                            if(err){ 
                                                console.log('Pas de paiement enregistre. Erreur requete sur la table payments.');
                                                console.log(err);
                                                let result_client = {
                                                    data: null,
                                                    error: true,
                                                    code: DATABASE_ERROR,
                                                    message: "Service temporary down. Try later."
                                                }
                                                clientSocket.emit('wearetechapi_server_response', result_client);
                                                return res.status(500).json({ err: true, msg: 'Service temporary down. Try later.' });
                                            }
                                            // console.log(result.rows);
                                            // console.log('Paiement enregistré avec success');
                                            if(result.rows.length === 1){
                                                // Il faut recuperer le bon massage
                                                console.log('Paiement enregistre avec success');
                                                let result_client = {
                                                    data: {amount: token.amount, token: token.token},
                                                    error: true,
                                                    code: MESSAGE_CODE,
                                                    message: token.shortcode
                                                }
                                                clientSocket.emit('wearetechapi_server_response', result_client);
                                                return res.status(200).json({ err: false, msg: 'Paiement sucessfully initiate.' });
                                            }else{
                                                console.log('Pas de paiement enregistre. Violation de contrainte.');
                                                let result_client = {
                                                    error: true,
                                                    code: DATABASE_ERROR,
                                                    message: "Service temporary down. Try later."
                                                }
                                                clientSocket.emit('wearetechapi_server_response', result_client);
                                                return res.status(500).json({ err: true, msg: 'Service temporary down. Try later.' });
                                            }  
                                        });
                                    });
                                }
                                
                            });
                        })
                    } 
                });
            });
        }else{
            return res.status(500).json({ err: true, msg: "Internal server error. wrong database url." })
        }
    }
})

module.exports = router