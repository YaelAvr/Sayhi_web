const express = require('express')
const router = express.Router()
const controller = require('../controllers/users')
const authenticateToken = require('../middlewares/authenticateToken');


router.route('/')
        .post(controller.createUser)

router.route('/validation/:username').post(controller.isUserNameRegisterd)

router.route('/:id')
        .get(authenticateToken, controller.getUserById)

module.exports = router