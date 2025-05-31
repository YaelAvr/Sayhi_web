
const Labels = require("../models/labels");
const {getUserById} = require("../models/users");

// Create a new label for a specific user
exports.createLabel = (req, res) => {
    const user_id = req.headers['x-user-id']
    const { name } = req.body

    // Validate required fields
    if (!user_id || !name) {
        return res.status(400).json({ error: 'Name is required' }) 
    }

    // find the user we want to add the label to
    const user = getUserById(user_id);
    if(!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Try to create label. Fail if name already exists
    const newLabel = Labels.createLabel(user, name);
    if (newLabel === null) {
        return res.status(400).json({ error: "Bad Request" });
    }
    res.status(201).location(`/api/labels/${newLabel.id}`).end();
}

// Get all labels for a specific user
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
    res
        .status(200)
        .json(allLabels)
}

// Get a specific label for a specific user
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

// Update a specific label name of a specific user
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

// Delete a specific label of a specific user
exports.deleteLabel = (req, res) => {
    // Check if the user id matches the id in the request header
    const userId = req.headers['x-user-id']
    const labelId = req.params.id

    if (!userId ) { return res.status(400).json({ error: 'User id is required' }) }

    const user = getUserById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' })
        
    const success = Labels.deleteLabel(user, labelId);
    if (!success) return res.status(404).json({ error: 'Label not found' })
    
    res.status(204).end()
    
}