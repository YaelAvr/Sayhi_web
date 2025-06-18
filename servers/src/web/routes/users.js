const express = require('express')
const router = express.Router()
const controller = require('../controllers/users')
const authenticateToken = require('../middlewares/authenticateToken');


router.route('/')
        .post(controller.createUser)
router.route('/displayName')
        .get(controller.createName)
router.route('/password')
        .get(controller.createPassword)
router.route('/gender')
        .get(controller.createGender)
router.route('/userName')
        .get(controller.createUserName)
router.route('/birthday')
        .get(controller.createBirthday)

router.route('/validation/:username').post(controller.isUserNameRegistered)

router.route('/:id')
        .get(authenticateToken, controller.getUserById)

module.exports = router