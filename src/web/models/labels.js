const Users = require('./store');

// Create a new mail object and add it to both sender and recipient
const createLabel = (user, name) => {
    // Check if the user already has a label with the same name
    if (user.labels.some(label => label.name === name)) {
        return null; 
    }

    // Create a new label object and add it to the user's labels
    const labelId = `l-${user.id}-${user.labelCounter++}`; 
    const label = {
         id: labelId,
         name
    };
    user.labels.push(label);
    return label;

}

const getAllLabels = (user) => {}
const getLabelById = (user, id) => {}
const updateLabel = (user, id) => {}
const deleteLabel = (user, id) => {}


module.exports = { createLabel, getAllLabels, getLabelById, updateLabel, deleteLabel };


