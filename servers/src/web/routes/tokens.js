const express = require('express')
const router = express.Router()
const controller = require('../controllers/tokens')
const authenticateToken = require('../middlewares/authenticateToken');

router.route('/').post(controller.isUserRegistered) 

router.route('/verify').get(authenticateToken, controller.verifyToken);

module.exports = router