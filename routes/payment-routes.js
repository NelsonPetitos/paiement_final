let express = require('express');
let router = express.Router();
let pg = require('pg')

router.post('', function(req, res){
    // console.log(req.params.token);
    let code = req.body.code;
    let message = req.body.message;
    let status_payment = req.body.status_payment;
    let field = req.body.field;
    let token = req.body.token;
    let sqlString = '';

    if(field && token){
        if(req.dburl){
            pg.connect(req.dburl, function(err, client, done) {
                if(err){
                    console.log('Erreur connection a la bd : payment-routes');
                    console.error(err); 
                    return res.status(500).json({ err: true, msg: 'Database connection error.'});
                }
                switch (field) {
                    case 'status_receive':
                        if(message){
                            client.query('update payments set  status_receive = true, date_receive = now(), status_payment = $1, message = $2, code_id = $3 where token_id = $4', [status_payment, message, code, token], function(err, result) {
                                done();
                                if(err){ 
                                    console.error('Erreur requete : payment-routes'); 
                                    console.log(err);
                                    return res.status(500).json({ err: true, msg: 'Query error.'});
                                }
                                console.log('Le status est a jour');
                                return res.status(200).json({ err: false, msg: 'Payment update.', data: result.rows[0] });
                            });
                        }else{
                            client.query('update payments set  status_receive = true, date_receive = now(), status_payment = $1, code_id = $2 where token_id = $3', [status_payment, code, token], function(err, result) {
                                done();
                                if(err){ 
                                    console.error('Erreur requete : payment-routes'); 
                                    console.log(err);
                                    return res.status(500).json({ err: true, msg: 'Query error.'});
                                }
                                console.log(result.rows[0]);
                                return res.status(200).json({ err: false, msg: 'Payment update.'});
                            });
                        }
                        break;

                    case 'status_send':
                        client.query('update payments set  status_send = true, date_send = now() where token_id = $1', [token], function(err, result) {
                            done();
                            if(err){ 
                                console.error('Erreur requete : payment-routes'); 
                                console.log(err);
                                return res.status(500).json({ err: true, msg: 'Query error.'});
                            }
                            console.log(result.rows[0]);
                            return res.status(200).json({ err: false, msg: 'Payment update.', data: result.rows[0] });
                        });
                        break;

                    default:
                        return res.status(404).json({err: true, msg: 'Bad request.'});
                }
            });
        }else{
            console.log('unable to find database url : payment-routes');
            return res.status(500).json({err: true, msg: 'Database url missing.'});
        }
    }else{
        console.log('Bad request parameter : payment-routes');
        return res.status(404).json({err: true, msg: 'Bad request parameter.'});
    }
})

module.exports = router;