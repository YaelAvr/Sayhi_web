const express = require('express')
const router = express.Router()
const labels = require('../controllers/labels')

const authenticateToken = require('../middlewares/authenticateToken');
router.use(authenticateToken)

// Route: /api/labels
   

router.route('/')  
    .post(labels.createLabel)         
    .get(labels.getAllLabels) 

router.route('/:id') 
    .get(labels.getLabelById)
    .patch(labels.updateLabel)
    .delete(labels.deleteLabel)


 
    
module.exports = router
