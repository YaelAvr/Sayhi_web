const express = require('express')
const router = express.Router()
const multer = require("multer");
const controller = require('../controllers/users')
const authenticateToken = require('../middlewares/authenticateToken');
const { uploadTemp } = require('../middlewares/uploadImage');


router.route('/')
        .post(controller.createUser)
router.route('/displayName')
        .post(controller.validateDisplayName)
router.route('/password')
        .post(controller.validatePassword)
router.route('/gender')
        .post(controller.validateGender)
router.route('/userName')
        .post(controller.validateUserName)
router.route('/birthday')
        .post(controller.validateBirthday)

// Handle temporary image upload and validation
router.route('/picture')
        .post(uploadTemp.single('profilePic'), controller.validatePicture)


router.route('/allUsernames')
        .get(controller.getAllUserNames)


// This will catch any errors (like from Multer) from the routes defined ABOVE it.
router.use((err, req, res, next) => {
        console.log('Error handled by user routes specific handler:', err.message);

        if (err instanceof multer.MulterError) {
                // A Multer-specific error (e.g., file too large)
                return res.status(400).json({ message: `File upload error: ${err.message}` });
        } else if (err) {
                // Our custom error from the fileFilter
                return res.status(400).json({ message: err.message });
        }

        // If the error is not one we handle here, pass it on
        next(err);
});

router.route('/validation/:username').get(controller.isUserNameRegistered)

router.route('/:id')
        .get(authenticateToken, controller.getUserById)

router.route('/darkMode/:id')
        .get(authenticateToken, controller.getUserDarkMode)
        .patch(authenticateToken, controller.toggleDarkMode)


module.exports = router