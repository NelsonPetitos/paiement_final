let express = require('express');
let router = express.Router()
let Requetemodem = require('../models/requete-modem');

router.post('/', (req, res) =>{
    if(req.body.apikey == null || req.body.apikey.trim() == '' || req.body.status.trim() == '' || req.body.status == null){
        res.send({err: true, msg: 'Parameters are empty.', data: null});
    }else{
        Requetemodem.find({"serverRequest.apikey": req.body.apikey } , (err, requetes)=>{
            if(err){
                res.send({err: true, msg: 'Error occur on the server.', data: null})
            }else{
                if(requetes){
                    res.send({err: false, msg: 'Request ok.', data: requetes})
                }else{
                    res.send({err: true, msg: 'No transactions related to this user.', data: null})
                }
            }
        })
    }
})

router.post('/clients', (req, res) =>{
    if(req.body.apikey == null || req.body.apikey.trim() == '' || req.body.status.trim() == '' || req.body.status == null){
        res.send({err: true, msg: 'Parameters are empty.', data: null});
    }else{
        Requetemodem.distinct("phone_number", {"serverRequest.apikey": req.body.apikey } , (err, requetes)=>{
            if(err){
                res.send({err: true, msg: 'Error occur on the server.', data: null})
            }else{
                if(requetes){
                    res.send({err: false, msg: 'Request ok.', data: requetes})
                }else{
                    res.send({err: true, msg: 'No clients related to this user.', data: null})
                }
            }
        })
    }
})

module.exports = router