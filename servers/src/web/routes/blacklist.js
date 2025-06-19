const express = require('express')
const router = express.Router()
const blacklist = require('../controllers/blacklist')

const authenticateToken = require('../middlewares/authenticateToken');
router.use(authenticateToken)


router.route('/:id')
    .delete(blacklist.deleteUrlFromBlacklist)

router.route('/')
    .post(blacklist.addUrlToBlacklist)

module.exports = router;