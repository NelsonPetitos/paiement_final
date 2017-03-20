let express = require('express');
let router = express.Router();
let pg = require('pg')

router.post('', function(req, res){
    // console.log(req.params.token);
    let status_payment, code, message;
    let field = req.body.field;
    let token = req.body.token;
    let sqlString = '';
    let data = req.body.data;
    if(data){
        status_payment = data.status_payment;
        message = data.message;
        code = data.code;
    }
    if(field && token){
        switch (field) {
            case 'status_receive':
                sqlString = 'update payments set  status_receive = true, date_receive = now() where token_id = $1';
                break;
            case 'status_send':
                sqlString = 'update payments set  status_send = true, date_send = now() where token_id = $1';
                break;
            default:
                break;
        }
        if(req.dburl){
            pg.connect(req.dburl, function(err, client, done) {
                if(err){
                    console.log('Erreur connection a la bd : payment-routes');
                    console.error(err); 
                    return res.status(500).json({ err: true, msg: 'Database connection error.'});
                }
                client.query(sqlString, [token, status_payment, code, message], function(err, result) {
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
    }else{
        console.log('Bad request : payment-routes');
        return res.status(404).json({err: true, msg: 'Bad request.'});
    }
})

module.exports = router;