let express = require('express')
let router = express.Router()
let User = require('../models/user')
let crypto = require('crypto')
let mongoose = require('mongoose')

router.post('/', function(req, res) {
    let user = new User()
    user.apikey = crypto.randomBytes(20).toString('hex');
    user.email = req.body.email;
    user.password = req.body.password;
    console.log(`email : ${req.body.email}`);
    console.log(`password: ${req.body.password}`);
    if (user.email == '' || user.email == null || user.password == '' || user.password == null || user.apikey == '' || user.apikey == null) {
        res.send({ err: true, msg: "Make sure that all required fields are provided", data: null })
    } else {
        user.save().then((data) => {
            console.log(`User create`);
            res.send({ err: false, msg: 'user create.', data: data });
        }, (err) => {
            console.log(`Erreur de sauvegarde du user. ${err}`);
            res.send({ err: true, msg: 'Invalid unique rule. User exist already.', data: JSON.stringify(err) });
        });
    }
})

router.post('/login', function(req, res) {
    if (req.body.email == '' || req.body.email == null || req.body.password == '' || req.body.password == null) {
        res.send({ err: true, msg: "Make sure that there is no empty fields", data: null })
    } else {
        User.findOne({ email: req.body.email }, (err, user) => {
            if (err != null || user == null) {
                console.log(`erreur de recherche d'un user: ${err}`);
                res.send({ err: true, msg: 'User does not exist', data: err });
            } else if (user.comparePassword(req.body.password)) {
                console.log(`User find`);
                res.send({ err: false, msg: 'user login', data: user });
            } else {
                console.log(`User - password couple does not fit`);
                res.send({ err: true, msg: 'Wrong email or password', data: null });
            }
        });
    }
})

router.get('/:userid', function(req, res) {
    if (req.params.userid == '' || req.params.userid == null) {
        res.send({ err: true, msg: "No users specified.", data: null })
    } else {
        User.findOne({ _id: mongoose.Types.ObjectId(req.params.userid) }, (err, user) => {
            if (err) {
                console.log(`erreur de recherche utilisateur ${err}`);
                res.send({ err: true, msg: 'Error fetching user.', data: err });
            } else {
                console.log(`User find`);
                res.send({ err: false, msg: 'User find.', data: user });
            }
        });
    }
})

router.post('/change-pwd', function(req, res) {
    if (req.body.user == '' || req.body.user == null || req.body.password == '' || req.body.password == null || req.body.oldPassword == '' || req.body.oldPassword == null || req.body.confirmPassword == '' || req.body.confirmPassword == null || req.body.confirmPassword != req.body.password) {
        res.send({ err: true, msg: "Make sure that the passwords match or no user precise.", data: null })
    } else {
        User.findOne({ _id: mongoose.Types.ObjectId(req.body.user) }, (err, user) => {
            if (err) {
                console.log(`erreur de recherche utilisateur ${err}`);
                res.send({ err: true, msg: 'Error fetching user.', data: err });
            } else {
                console.log(`User find`);
                res.send({ err: false, msg: 'I\'ll implememts on the server', data: user });
            }
        });
    }
})


module.exports = router