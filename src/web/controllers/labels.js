
const Labels = require("../models/labels");
const Store = require('../models/store');
const {getUserById} = require("../models/users");

// Controller to handle creation of a new mail
exports.createLabel = (req, res) => {
    const user_id = req.headers['x-user-id']
    const { name } = req.body

    // Validate presence of 'from' and 'to' fields
    if (!user_id || !name) {
        return res.status(400).json({ error: 'Name is required' }) 
    }

    // find the user we want to add the label to
    const user = getUserById(user_id);
    if(!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const newLabel = Labels.createLabel(user, name);
    if (newLabel === null) {
        return res.status(400).json({ error: "Bad Request" });
    }
    res.status(201).location(`/api/labels/${newLabel.id}`).end();
}

exports.getAllLabels = (req, res) => {
    // get the user id from the http header
    const user_id = req.headers['x-user-id']
    if (!user_id) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    // find the user we want to add the label to
    const user = getUserById(user_id);
    if(!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const allLabels = Labels.getAllLabels(user);
    if (allLabels === null) {
        return res.status(400).json({ error: "Bad Request" });
    }

    res
        .status(200)
        .json(allLabels)
}

exports.getLabelById = (req, res) => {
    // Check if the user id matches the id in the request header
    const userId = req.headers['x-user-id']
    const labelId = req.params.id

    if (!userId ) { return res.status(400).json({ error: 'User id is required' }) }

    const user = getUserById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' })
        
    const label = Labels.getLabelById(user, labelId);
    if (!label) return res.status(404).json({ error: 'Label not found' })
    res
        .status(200)
        .json(label)
}
exports.updateLabel = (req, res) => {
     // Check if the user id matches the id in the request header
    const userId = req.headers['x-user-id']
    const labelId = req.params.id
    const { name } = req.body

    if (!name) { return res.status(400).json({ error: 'Name is required' }) }
    if (!userId ) { return res.status(400).json({ error: 'User id is required' }) }

    const user = getUserById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' })
        
    const newLabel = Labels.updateLabel(user, labelId, name);
    if (!newLabel) return res.status(404).json({ error: 'Label not found' })
    
    res.status(204).end()
    
}
exports.deleteLabel = (req, res) => {}