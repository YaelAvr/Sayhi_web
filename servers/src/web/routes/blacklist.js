const express = require('express')
const router = express.Router()
const blacklist = require('../controllers/blacklist')




router.route('/:id')
    .delete(blacklist.deleteUrlFromBlacklist)

router.route('/')
    .post(blacklist.addUrlToBlacklist)

module.exports = router;