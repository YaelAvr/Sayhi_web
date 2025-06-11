const Users = require('./store');

// This function creates a new label for a specific user.
const createLabel = (user, name) => {
    // Check if the user already has a label with the same name
    if (user.labels.find(label => label.name === name)) {
        return null; 
    }

    // Create a new label object and add it to the user's labels array
    const labelId = `l-${user.id}-${user.labelCounter++}`; 
    const label = {
         id: labelId,
         name
    };
    user.labels.push(label);
    return label;

}

// This function retrieves all labels for a specific user.
const getAllLabels = (user) => {
    return user.labels
}

// This function retrieves a specific label of a specific user.
const getLabelById = (user, id) => {
    // Find the label by id in the user's labels object array
    const label = user.labels.find(label => label.id === id);
    if (!label) {
        return null; 
    }
    return label;
}

// This function updates the name of a specific label for a specific user.
const updateLabel = (user, id, name) => {
    // If a label with the same name already exists, return null
    if (user.labels.find(label => label.name === name && label.id !== id)) {
        throw new Error('INVALID_NAME') 
    }

    const label = getLabelById(user, id);
    if (!label) {
         throw new Error('LABEL_NOT_FOUND')
    }
    label.name = name;
    return label; 
}

// This function deletes a specific label of a specific user.
const deleteLabel = (user, id) => {
    // Check if the label exists in the user's labels array
    const label = getLabelById(user, id);
    if (!label) {
        return null; 
    }

    // Remove the label from the user's labels array
    user.labels = user.labels.filter(label => label.id !== id);
    return true; 
}


module.exports = { createLabel, getAllLabels, getLabelById, updateLabel, deleteLabel };