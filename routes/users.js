let express = require('express')
let router = express.Router()
let User = require('../models/user')

router.post('/login', (req, res, next) => {

    let user = new User({
        apikey: 'Qw2@ivd56njks&jso9bc#cxz9-caxm-0',
        email: res.body.email,
        password: res.body.passsword,
    })
    user.save((err, data) => {
        if(err){
            res.status(404).json({
                message: 'Ab error occur',
                err: err,
            })
            res.end()
        }
        res.status(202).json({
            message: 'Register succesfully',
            data: data,
        })

    })
})

router.get('/login', (req, res, next) => {

})

router.post('/register', (req, res, next) => {

})

router.get('/register', (req, res, next) => {

})

module.exports = router