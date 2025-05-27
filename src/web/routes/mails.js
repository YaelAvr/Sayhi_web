const express = require('express')
const router = express.Router()
const mails = require('../controllers/mails')

router.route('/')  
    .post(mails.createMail)    



    module.exports = router
