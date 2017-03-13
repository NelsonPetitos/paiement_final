let express = require('express');
let router = express.Router();
let User = require('../models/user');
let crypto = require('crypto');
let mongoose = require('mongoose');
let pg = require('pg');

let bcrypt = require('bcrypt')
const saltRounds = 10;


//Les url sur une base de données mongoose
router.post('/', function(req, res) {
    // let user = new User()
    // user.apikey = crypto.randomBytes(20).toString('hex');
    // user.privatekey = crypto.randomBytes(20).toString('hex');
    // user.email = req.body.email;
    // user.password = req.body.password;

    console.log(req.dburl);

    if (req.body.email == '' || req.body.email == null || req.body.password == '' || req.body.password == null ) {
        res.status(200).json({ err: true, msg: "Send valid not empty parameters.", data: null })
    } else {    
        // Pour les base de données nosql mongoose
        // user.save().then((data) => {
        //     console.log(`User create`);
        //     res.send({ err: false, msg: 'user create.', data: data });
        // }, (err) => {
        //     console.log(`Erreur de sauvegarde du user. ${err}`);
        //     res.send({ err: true, msg: 'Invalid unique rule. User exist already.', data: JSON.stringify(err) });
        // });

        // user.password = bcrypt.hashSync(user.password, saltRounds);

        pg.connect(req.dburl, function(err, client, done) {
            if(err){
                console.log('Erreur connection a la bd');
                console.error(err); 
                res.status(200).json({ err: true, msg: 'Database connection error.', data: null });
            }
            client.query('INSERT INTO users(email, password) VALUES ($1, $2) returning email, apikey, privatekey', [req.body.email, req.body.password], function(err, result) {
                done();
                if(err){ 
                    console.error('Erreur requete'); 
                    console.log(err);
                    res.status(200).json({ err: true, msg: 'User exist already.', data: null});
                }
                
                // console.log(result.rows);
                
                if(result.rows.length === 1){
                    let data = {
                        email: result.rows[0].email,
                        privatekey : result.rows[0].privatekey,
                        apikey: result.rows[0].apikey
                    }
                    res.status(200).json({ err: false, msg: 'User create.', data: data });
                }else{
                    res.status(200).json({ err: false, msg: 'Multiple results not expected.', data: result.rows});
                }

            });
        });
    }
})

router.post('/login', function(req, res) {
    if (req.body.email == '' || req.body.email == null || req.body.password == '' || req.body.password == null) {
        // console.log(req.body);
        res.status(200).json({ err: true, msg: "Send valid not empty parameters.", data: null })
    } else {

        // User.findOne({ email: req.body.email }, (err, user) => {
        //     if (err != null || user == null) {
        //         console.log(`erreur de recherche d'un user: ${err}`);
        //         res.send({ err: true, msg: 'User does not exist', data: err });
        //     } else if (user.comparePassword(req.body.password)) {
        //         console.log(`User find`);
        //         res.send({ err: false, msg: 'user login', data: user });
        //     } else {
        //         console.log(`User - password couple does not fit`);
        //         res.send({ err: true, msg: 'Wrong email or password', data: null });
        //     }
        // });

        pg.connect(req.dburl, function(err, client, done) {
            if(err){
                console.log('Erreur connection a la bd');
                console.error(err); 
                res.status(200).json({ err: true, msg: 'Database connection error.', data: null });
            }
            client.query('SELECT * FROM users WHERE email = $1 AND password = crypt($2, password) ', [req.body.email, req.body.password], function(err, result) {
                done();
                if(err){ 
                    console.error('Erreur requete'); 
                    console.log(err);
                    res.status(200).json({ err: true, msg: 'Fetching user error.', data: null });
                }
                
                // console.log(result.rows.length);
                
                if(result.rows.length === 0){
                    res.status(200).json({ err: true, msg: 'Wrong users infos.', data: null });
                }
                
                if(result.rows.length > 1){
                    res.status(200).json({err: true, msg: 'Multiple request responses unexpecte', data: null})
                }

                if(result.rows.length === 1){
                    let data = {
                        email: result.rows[0].email,
                        privatekey : result.rows[0].privatekey,
                        apikey: result.rows[0].apikey
                    }
                    res.status(200).json({ err: false, msg: 'User login.', data: data });
                }
                
            });
        });
    }
})

// router.get('/:userid', function(req, res) {
//     if (req.params.userid == '' || req.params.userid == null) {
//         res.send({ err: true, msg: "No users specified.", data: null })
//     } else {
//         User.findOne({ _id: mongoose.Types.ObjectId(req.params.userid) }, (err, user) => {
//             if (err) {
//                 console.log(`erreur de recherche utilisateur ${err}`);
//                 res.send({ err: true, msg: 'Error fetching user.', data: err });
//             } else {
//                 console.log(`User find`);
//                 res.send({ err: false, msg: 'User find.', data: user });
//             }
//         });
//     }
// })

// router.post('/change-pwd', function(req, res) {
//     if (req.body.user == '' || req.body.user == null || req.body.password == '' || req.body.password == null || req.body.oldPassword == '' || req.body.oldPassword == null || req.body.confirmPassword == '' || req.body.confirmPassword == null || req.body.confirmPassword != req.body.password) {
//         res.send({ err: true, msg: "Make sure that the passwords or user id match.", data: null })
//     } else {
//         User.findOne({ _id: mongoose.Types.ObjectId(req.body.user) }, (err, user) => {
//             if (err) {
//                 res.send({ err: true, msg: 'Error fetching user.', data: err });
//             } else {
//                 if (user) {
//                     if (bcrypt.compareSync(req.body.oldPassword, user.password)) {
//                         user.password = req.body.password;
//                         user.save().then(
//                             (data) => {
//                                 res.send({ err: false, msg: 'Password change.', data: null });
//                             },
//                             (err) => {
//                                 res.send({ err: true, msg: 'Server error password not change.', data: null })
//                             }
//                         )
//                     } else {
//                         res.send({ err: true, msg: 'Wrong old password.', data: null });
//                     }
//                 } else {
//                     res.send({ err: true, msg: 'No user identified.', data: null });
//                 }
//             }
//         });
//     }
// })

module.exports = router



