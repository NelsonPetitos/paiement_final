let express = require('express');
let router = express.Router();
let pg = require('pg');

router.get('/operators/:countryid', function(req, res){
    if(req.dburl){
        pg.connect(req.dburl, function(err, client, done) {
            if(err){
                console.log('Erreur connection a la bd');
                console.error(err); 
                res.status(500).json({ err: true, msg: 'Database connection error.', data: [] });
                return;
            }
            console.log(parseInt(req.params.countryid));
            if(req.params.countryid){
                client.query('SELECT id, name FROM phone_operators WHERE country_id = $1', [parseInt(req.params.countryid)], function(err, result) {
                    done();
                    if(err){ 
                        console.error('Erreur requete'); 
                        console.log(err);
                        res.status(500).json({ err: true, msg: 'Queries execution error', data: []});
                    }
                    res.status(200).json({ err: false, msg: 'Return phone operators.', data: result.rows });
                });
            }else{
                console.log('Bad request country id');
                res.status(400).json({ err: true, msg: 'Bad request parameter.', data: [] });
            }
        });
    }else{
        console.log('Pensez a definir l\'url de la base de données');
        res.status(500).json({ err: true, msg: 'Database url error.', data: [] });
    }
})

module.exports = router;