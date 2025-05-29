const express = require('express');
const router = express.Router();
const blacklist = require('../controllers/blacklist')


router.route('/')
    .post(blacklist.addUrlToBlacklist);

router.route('/:id')
    .delete(blacklist.deleteUrlFromBlacklist);

module.exports = router;