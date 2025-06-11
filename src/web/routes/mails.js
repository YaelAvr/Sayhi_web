const express = require('express')
const router = express.Router()
const mails = require('../controllers/mails')

// Route: /api/mails
// Handles both sending a new mail and retrieving the last 50 mails for a user
router.route('/')  
    .post(mails.createMail)          // POST /api/mails -> create a new mail
    .get(mails.get50LastMails)       // GET /api/mails -> return up to 50 recent mails for a user

router.route('/drafts')
    .post(mails.createDraft)

router.route('/:id')  
    .get(mails.getSpecificMail)
    .patch(mails.editMail)
    .delete(mails.deleteMail)

router.route('/search/:query')
    .get(mails.searchMailsByQuery)

module.exports = router

