const express = require('express')
const router = express.Router()
const labels = require('../controllers/labels')

const authenticateToken = require('../middlewares/authenticateToken');
router.use(authenticateToken)

// Route: /api/labels
   

router.route('/:id')  
    .get(labels.getLabelById)
    .patch(labels.updateLabel)
    .delete(labels.deleteLabel)


router.route('/')  
    .post(labels.createLabel)         
    .get(labels.getAllLabels)  
    
module.exports = router
