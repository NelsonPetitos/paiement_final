let express = require('express');
let router = express.Router();
let pg = require('pg')

router.patch('/:token', function(req, res){
    console.log(req.params.token);
    if(req.dburl){
        pg.connect(req.dburl, function(err, client, done) {
            if(err){
                console.log('Erreur connection a la bd : payment-routes');
                console.error(err); 
                return res.status(500).json({ err: true, msg: 'Database connection error.'});
            }
            client.query('update payments set  status_send = true, date_send = now() where token_id = $1', [req.params.token], function(err, result) {
                done();
                if(err){ 
                    console.error('Erreur requete : payment-routes'); 
                    console.log(err);
                    return res.status(500).json({ err: true, msg: 'Query error.'});
                }
                console.log(result.rows[0]);
                return res.status(200).json({ err: false, msg: 'Payment update.', data: result.rows[0] });
            });
        });
    }else{
        console.log('unable to find database url : payment-routes');
        return res.status(500).json({err: true, msg: 'Database url missing.'});
    }
})

module.exports = router;