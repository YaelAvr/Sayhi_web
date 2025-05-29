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

exports.getAllLabels = (req, res) => {}
exports.getLabelById = (req, res) => {}
exports.updateLabel = (req, res) => {}
exports.deleteLabel = (req, res) => {}