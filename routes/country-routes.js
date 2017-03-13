let express = require('express');
let router = express.Router();
let pg = require('pg');

router.get('/countries', function(req, res){
    if(req.dburl){
        pg.connect(req.dburl, function(err, client, done) {
            if(err){
                console.log('Erreur connection a la bd');
                console.error(err); 
                res.status(500).json({ err: true, msg: 'Database connection error.', data: null });
            }
            client.query('SELECT id, name, code FROM countries', [], function(err, result) {
                done();
                if(err){ 
                    console.error('Erreur requete'); 
                    console.log(err);
                    res.status(500).json({ err: true, msg: 'Queries execution error', data: null});
                }
                res.status(200).json({ err: false, msg: 'Countries list get.', data: result.rows });
            });
        });
    }else{
        console.log('Pensez a definir l\'url de la base de données');
        res.status(500).json({ err: true, msg: 'Database url error.', data: null });
    }
})

module.exports = router;