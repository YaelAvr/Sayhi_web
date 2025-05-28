const express = require('express')
const router = express.Router()
const controller = require('../controllers/tokens')

router.route('/').post(controller.isUserRegistered) 

module.exports = router