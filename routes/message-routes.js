let express = require('express');
let router = express.Router();
let pg = require('pg');
let testParams = function(params){
    return (params.content != null && params.content != '' && params.phone != null && params.phone != '' && parseInt(params.modem_emei))
}

router.post('/message', function(req, res){
    let params = {
        content: req.body.content,
        reference: req.body.reference,
        amount: req.body.amount,
        phone: req.body.phone,
        modem_emei: req.body.emei
    }
    
    if(!req.dburl){
        console.log('No database url.');
        return res.sytatus(500).json({err: true, msg: 'No datatbase url.'});
    }

    if(!testParams(params)){
        console.log('Wrong parameter');
        return res.status(404).json({err: true, msg:'Wrong parameters.'});
    } 

    pg.connect(req.dburl, function(err, client, done){
        if(err){
            console.log(err);
            return res.status(500).json({err: true, msg: 'Database connection error'});
        }
        client.query('insert into massages(reference, amount, content, phone, modem_emei) values($1, $2, $3, $4, $5) returning id', [params.reference, params.amount, params.content, params.phone, params.modem_emei], function(err, result){
            done();
            if(err){
                console.log(err);
                return res.status(500).json({err: true, msg: 'Query error.'});
            }
            if(result.rows.length !== 1){
                return res.status(500).json({err: true, msg: 'Unexpected multiple response'});   
            }
            console.log('Message save.');
            return res.status(200).json({err: false, msg: 'Success'});
        })
    })

})


router.get('/modem-messages', function(req, res){
    let emei = parseInt(req.query.emei);
    let offset = (!parseInt(req.query.page))? 0 : parseInt(req.query.page);
    let limit = (!parseInt(req.query.limit))? 10 : parseInt(req.query.limit);

    if(!emei){
        return res.status(404).json({err: true, msg: 'Wrong modem emei.'});
    }
    if(!(req.dburl)){
        return res.status(500).json({err: true, msg: 'No database url.'});
    }
    pg.connect(req.dburl, function(err, client, done){
        if(err){
            return res.status(500).json({err: true, msg:'Error connecting to database.'});
        }
        client.query('select * from messages where modem_emei = $1 order by created asc limit $2 offset $3',[emei, limit, offset], function(err, result){
            done();
            if(err){
                return res.status(500).json({err: true, msg: 'Query execution error.'});
            }
            return res.status(202).json({err: false, msg: 'Success', data: result.rows})
        } )
    })
})

router.get('/message', function(req, res){
    let reference = req.query.reference;
    let phone = req.query.phone;
    
    if(reference === '' || phone === ''){
        return res.status(404).json({err: true, msg: 'Bad request parameters'});
    }

    if(!(req.dburl)){
        return res.status(500).json({err: true, msg: 'No database url'});
    }

    pg.connect(req.dburl, function(err, client, done){
        if(err){
            return res.status(500).json({err: true, msg: 'Database connection error.'});
        }
        client.query('select * from messages where reference = $1 and phone = $2', [reference, phone], function(err, result){
            done()
            if(err){
                return res.status(500).json({ err: true, msg: 'Query error.'});
            }
            if(result.rows.length > 1){
                return res.status(500).json({err: true, msg: 'Unexpected multiple response'});
            }
            if(result.rows.length === 0){
                return res.status(200).json({err: false, msg: 'No message found', data: null});
            }
            return res.status(200).json({err: false, msg: 'Message found', data: result.rows[0]});
        })
    })
})


module.exports = router;