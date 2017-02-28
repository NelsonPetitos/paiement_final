let express = require('express')
let router = express.Router()

router.get('', (request, response, next) => {
    console.log('Connection a la home page')
    response.render('index')
})

module.exports =  router