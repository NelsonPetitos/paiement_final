let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')
let Adress = require('../models/adress')

router.post('/', function(req, res) {

    let adress = new Adress()
    adress.phone = req.body.phone;
    adress.code = req.body.code;
    adress.street = req.body.street;
    adress.country = req.body.country;
    adress.town = req.body.town;
    adress.postalbox = req.body.postalbox;
    adress.user = mongoose.Types.ObjectId(req.body.user);

    if (adress.phone.trim() == '' || adress.phone == null) {
        res.send({ err: true, msg: "Make sure that all required fields are provided", data: null })
    } else {
        adress.save().then(
            (data) => {
                console.log(`Adress create`);
                res.send({ err: false, msg: 'Adress create.', data: data });
            },
            (err) => {
                console.log(`Erreur de sauvegarde de l'adress. ${err}`);
                res.send({ err: true, msg: 'Invalid validation rules.', data: JSON.stringify(err) });
            }
        );
    }
})

router.get('/:userid', function(req, res) {
    if (req.params.userid == '' || req.params.userid == null) {
        res.send({ err: true, msg: "No users specified.", data: null })
    } else {
        Adress.find({ user: mongoose.Types.ObjectId(req.params.userid) }, (err, adresses) => {
            if (err) {
                console.log(`erreur de recherche d'adress: ${err}`);
                res.send({ err: true, msg: 'Error while fetching adresses.', data: err });
            } else {
                console.log(`User's adresses find`);
                res.send({ err: false, msg: 'User\'s adresses find.', data: adresses });
            }
        });
    }
})

router.delete('/:id', function(req, res) {
    if (req.params.id.trim() == '' || req.params.id == null) {
        res.send({ err: true, msg: "No users specified.", data: null })
    } else {
        Adress.findOneAndRemove({ _id: mongoose.Types.ObjectId(req.params.id) }, (err, adress) => {
            if (err) {
                console.log(`erreur supression de l'adresse`);
                res.send({ err: true, msg: 'Error occur.', data: err });
            } else {
                if (adress) {
                    console.log(`Adress delete`);
                    res.send({ err: false, msg: 'Adress delete.', data: adress });
                } else {
                    res.send({ err: true, msg: 'Adress not exist.', data: err });
                }
            }
        });
    }
})

module.exports = router