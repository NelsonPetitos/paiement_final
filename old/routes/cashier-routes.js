let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();
let Cashier = require('../models/cashier');

router.get('/:userid', function(req, res) {
    if (req.params.userid == '' || req.params.userid == null) {
        res.send({ err: true, msg: "No users specified.", data: null })
    } else {
        Cashier.find({ user: mongoose.Types.ObjectId(req.params.userid) }, (err, adresses) => {
            if (err) {
                console.log(`Erreur de recherche de caissiers: ${err}`);
                res.send({ err: true, msg: 'Error while fetching cashiers.', data: err });
            } else {
                console.log(`User's cashiers find`);
                res.send({ err: false, msg: 'User\'s cashiers find.', data: adresses });
            }
        });
    }
})

function testCashier (cashier){
    return ((cashier.name == null || cashier.name.trim() == '') || (cashier.code == null || cashier.code.trim() == '') || (cashier.phone == null || cashier.phone.trim() == ''))
}

function epurer(cashier){
    cashier.name = cashier.name.trim();
    cashier.code = cashier.code.trim();
    cashier.phone = cashier.phone.trim();
    return cashier;
}

router.post('/', function(req, res) {
    let cashier = new Cashier()
    cashier.name = req.body.name;
    cashier.email = req.body.email;
    cashier.phone = req.body.phone;
    cashier.code = req.body.code;
    cashier.adress = req.body.adress;
    cashier.user = mongoose.Types.ObjectId(req.body.user);

    if (testCashier(cashier)) {
        res.send({ err: true, msg: "Make sure that the all required fields.", data: null })
    } else {
        cashier = epurer(cashier);
        cashier.save().then(
            (data) => {
                console.log(`Cashier create`);
                res.send({ err: false, msg: 'Cashier create.', data: data });
            },
            (err) => {
                console.log(`Erreur de création cassier. ${err}`);
                res.send({ err: true, msg: 'Error occur.', data: JSON.stringify(err) });
            }
        );
    }
})


router.post('/login', function(req, res) {
    if (req.body.phone == '' || req.body.phone == null || req.body.code == '' || req.body.code == null) {
        console.log('bad parameters')
        res.send({ err: true, msg: "Make sure that there is no empty fields", data: null })
    } else {
        Cashier.find({ phone: req.body.phone }, (err, cashiers) => {
            for(i=0; i < cashiers.length; i++){
                if (cashiers[i].compareCode(req.body.code)) {
                    console.log(`Cashier find`);
                    res.send({ err: false, msg: 'Cashier login', data: cashiers[i] });
                    return;
                }
            }
            console.log(`Wrong code or phone number`);
            res.send({ err: true, msg: 'Wrong code or phone number', data: null });
            return;
        });
    }
})


module.exports = router