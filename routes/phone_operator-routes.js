let express = require('express');
let router = express.Router();
let pg = require('pg');

router.get('/operators/:countryid', function(req, res){
    if(req.dburl){
        pg.connect(req.dburl, function(err, client, done) {
            if(err){
                console.log('Erreur connection a la bd');
                console.error(err); 
                res.status(500).json({ err: true, msg: 'Database connection error.', data: null });
            }
            console.log(parseInt(req.params.countryid));
            if(req.params.countryid){
                client.query('SELECT name FROM phone_operators WERE country_id = $1', [parseInt(req.params.countryid)], function(err, result) {
                    done();
                    if(err){ 
                        console.error('Erreur requete'); 
                        console.log(err);
                        res.status(500).json({ err: true, msg: 'Queries execution error', data: null});
                    }
                    res.status(200).json({ err: false, msg: 'Return operators.', data: result.rows });
                });
            }else{
                console.log('Bad request country id');
                res.status(400).json({ err: true, msg: 'Bad request parameter.', data: null });
            }
        });
    }else{
        console.log('Pensez a definir l\'url de la base de données');
        res.status(500).json({ err: true, msg: 'Database url error.', data: null });
    }
})

module.exports = router;