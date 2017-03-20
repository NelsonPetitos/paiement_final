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
            client.query('UPDATE payments SET status_send = true AND date_send = now() WHERE token_id = $1 ', [req.params.token], function(err, result) {
                done();
                if(err){ 
                    console.error('Erreur requete : payment-routes'); 
                    console.log(err);
                    return res.status(500).json({ err: true, msg: 'Query error.'});
                }
                console.log(result.rows[0]);
                return res.status(200).json({ err: false, msg: 'Payment update.', data: result.rows[0] });
                // if(result.rows.length === 1){
                //     console.log('Token find : tokens-routes/modem');
                //     return res.status(200).json({ err: false, msg: 'Token find.', data: result.rows[0] });
                // }else{
                //     console.log('Resultats multiples : tokens-routes/modem');
                //     return res.status(400).json({ err: false, msg: 'Multiple results not expected.', data: result.rows});
                // }

            });
        });
    }else{
        console.log('unable to find database url : payment-routes');
        return res.status(500).json({err: true, msg: 'Database url missing.'});
    }
})

module.exports = router;