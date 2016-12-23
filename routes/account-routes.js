let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')
let Account = require('../models/account')

router.post('/', function(req, res) {

    let account = new Account()
    account.num = req.body.num;
    account.user = mongoose.Types.ObjectId(req.body.user);

    if (account.num == '' || account.num == null) {
        res.send({ err: true, msg: "Make sure that the account number is provided.", data: null })
    } else {
        account.save().then(
            (data) => {
                console.log(`Account create`);
                res.send({ err: false, msg: 'Account create.', data: data });
            },
            (err) => {
                console.log(`Erreur de sauvegarde du compte. ${err}`);
                res.send({ err: true, msg: 'Error occur.', data: JSON.stringify(err) });
            }
        );
    }
})

router.get('/:id', function(req, res) {
    if (req.params.id == '' || req.params.id == null) {
        res.send({ err: true, msg: "No users specified.", data: null })
    } else {
        Account.find({ user: mongoose.Types.ObjectId(req.params.id) }, (err, accounts) => {
            if (err) {
                console.log(`erreur de recherche de comptes`);
                res.send({ err: true, msg: 'Error while fetching accounts.', data: err });
            } else {
                console.log(`User's accounts find`);
                res.send({ err: false, msg: 'User\'s accounts find.', data: accounts });
            }
        });
    }
})

router.delete('/:id', function(req, res) {
    if (req.params.id == '' || req.params.id == null) {
        res.send({ err: true, msg: "No users specified.", data: null })
    } else {
        Account.remove({ user: mongoose.Types.ObjectId(req.params.id) }, (err) => {
            if (err) {
                console.log(`erreur supression du compte`);
                res.send({ err: true, msg: 'Account deletion error.', data: err });
            } else {
                console.log(`Account delete`);
                res.send({ err: false, msg: 'Account delete.', data: { id: req.params.id } });
            }
        });
    }
})


module.exports = router