let express = require('express');
let router = express.Router()
let pg = require('pg');

let testParams = function(params){
    return (params.emei != '' && parseInt(params.emei) && params.emei != null && params.name != null && params.name != '' && params.phone != null && params.phone != '' && params.phone_operator_id != null && params.phone_operator_id !== '' && parseInt(params.phone_operator_id));
}


router.get('/list-modems', function(req, res){
    if(!req.dburl){
        return res.status(500).json({err: true, msg: 'No database url.'});
    }

    pg.connect(req.dburl,function(err, client, done){
        if(err){
            return res.status(500).json({err: true, msg: 'Database connection error.'});
        }
        client.query('select * from modems', [], function(err, result){
            done();
            if(err){
                return res.status(500).json({err: true, msg: 'Query error.'})
            }
            return res.status(200).json({err: false, msg: 'Sucess.', data: result.rows})
        })
    })
})


router.post('/modem', function(req, res){
    let params = {
        emei: req.body.emei,
        name: req.body.name,
        phone: req.body.phone,
        phone_operator_id: req.body.operator
    };
    if(!testParams(params)){
        console.log('bad request parameters.');
        return res.status(404).json({err: true, msg: 'Bad request parameters'});
    }
    if(!req.dburl){
        return res.status(500).json({err: true, msg: 'No Databane url.'});
    }
    pg.connect(req.dburl, function(err, client, done){
        if(err){
            console.log(err);
            return res.status(500).json({err: true, msg: 'Database connection error.'});
        }
        client.query('insert into modems(emei, phone, name, phone_operator_id) values($1, $2, $3, $4) returning emei', [params.emei, params.phone, params.name, params.phone_operator_id], function(err, result){
            done();
            if(err){
                console.log(err);
                return res.status(500).json({err: true, msg: 'Query error.'});
            }
            if(result.rows.length !== 1){
                console.log(result.rows);
                return res.status(500).json({err: true, msg: 'Multiple result unexpected.'});   
            }
            return res.status(200).json({err: false, msg: 'Sucess', data: result.rows[0]});
        })
    })
})


router.get('/modem', function(req, res){
    let emei = req.query.emei;
    if(emei === '' || emei === null){
        return res.status(404).json({err: true, msg: 'Bad request parameters.'});
    }
    if(!req.dburl){
        return res.status(500).json({err: true, msg: 'No database url.'});
    }
    pg.connect(req.dburl, function(err, client, done){
        if(err){
            console.log(err);
            return res.status.json({err: true, msg: 'Database connection error'});
        }
        client.query('select * from modems where emei = $1', [emei], function(err, result){
            done();
            if(err){
                console.log(err);
                return res.status(500).json({err: true, msg: 'Query error'});
            }
            if(result.rows.length > 1){
                return res.status(500).json({err: true, msg: 'Multiple responses unexpected'});
            }
            if(result.rows.length === 0){
                return res.status(200).json({err: false, msg: 'No modem found', data: null});
            }
            return res.status(200).json({err: false, msg: 'Modem found', data: result.rows[0]});
        })
    })
})

module.exports = router