let express = require('express');
let router = express.Router();
let pg = require('pg');

router.post('/messages', function(req, res){
    let content = req.body.content;
    let reference = req.body.reference;
    let amount = req.body.amount;
    if(req.dburl){
        pg.connect(req.dburl, function(err,client,done){
            if(err){
                console.log('Erreur connection a la bd : message-routes');
                console.error(err); 
                return res.status(500).json({ err: true, msg: 'Database connection error.'});
            }
            if(content && reference && amount){
                client.query('insert into messages(reference, amount, content) values($1, $2, $3) returning id', [reference, amount,content], function(err, result) {
                    done();
                    if(err){ 
                        console.error('Erreur requete : message-routes');
                        console.log(err);
                        return res.status(500).json({ err: true, msg: 'Message create query error.'});
                    }
                    if(result.rows.length === 1){
                        return res.status(200).json({ err: false, msg: 'Message create.'});
                    }else{
                        return res.status(500).json({err: true, msg: 'Multiple response unexpected.'})
                    }
                });
            }else if(content && amount){
                client.query('insert into messages(amount, content) values($1, $2) returning id', [amount, content], function(err, result) {
                    done();
                    if(err){ 
                        console.error('Erreur requete : message-routes');
                        console.log(err);
                        return res.status(500).json({ err: true, msg: 'Message create query error.'});
                    }
                    if(result.rows.length === 1){
                        return res.status(200).json({ err: false, msg: 'Message create.'});
                    }else{
                        return res.status(500).json({err: true, msg: 'Multiple response unexpected.'})
                    }
                });
            }else if(content && reference){
                client.query('insert into messages(reference, content) values($1, $2) returning id', [reference, content], function(err, result) {
                    done();
                    if(err){ 
                        console.error('Erreur requete : message-routes');
                        console.log(err);
                        return res.status(500).json({ err: true, msg: 'Message create query error.'});
                    }
                    if(result.rows.length === 1){
                        return res.status(200).json({ err: false, msg: 'Message create.'});
                    }else{
                        return res.status(500).json({err: true, msg: 'Multiple response unexpected.'})
                    }
                });
            }else if(content){
                client.query('insert into messages(content) values($1) returning id', [content], function(err, result) {
                    done();
                    if(err){ 
                        console.error('Erreur requete : message-routes');
                        console.log(err);
                        return res.status(500).json({ err: true, msg: 'Message create query error.'});
                    }
                    if(result.rows.length === 1){
                        return res.status(200).json({ err: false, msg: 'Message create.'});
                    }else{
                        return res.status(500).json({err: true, msg: 'Multiple response unexpected.'})
                    }
                });
            }else{
                return res.status(404).json({err: true, msg: 'Bad request parameters.'})
            }
        })
    }
})

router.get('/messages', function(req, res){
    
})

module.exports = router;