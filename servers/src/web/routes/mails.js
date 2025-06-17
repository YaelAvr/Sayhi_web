const express = require('express')
const router = express.Router()
const mails = require('../controllers/mails')

const authenticateToken = require('../middlewares/authenticateToken');
router.use(authenticateToken)

// Route: /api/mails
// Handles both sending a new mail and retrieving the last 50 mails for a user


router.route('/search/:query')
    .get(mails.searchMailsByQuery)


router.route('/drafts')
    .post(mails.createDraft)

router.route('/:id/add-label')
  .post(mails.addLabelToMail)

router.route('/label-mails')
    .get(mails.getMailsByLableWithOffset)

router.route('/:id')  
    .get(mails.getSpecificMail)
    .delete(mails.deleteMail)


router.route('/')  
    .post(mails.createMail)          // POST /api/mails -> create a new mail


module.exports = router

