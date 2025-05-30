const Users = require('./store');

// Create a new mail object and add it to both sender and recipient
const createLabel = (user, name) => {
    // Check if the user already has a label with the same name
    if (user.labels.find(label => label.name === name)) {
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

const getAllLabels = (user) => {
    return user.labels
}
const getLabelById = (user, id) => {
    // Find the label by id in the user's labels object array
    const label = user.labels.find(label => label.id === id);
    if (!label) {
        return null; // 404 Not Found
    }
    return label;
}
const updateLabel = (user, id, name) => {
    const label = getLabelById(user, id);
    if (!label) {
        return null; // 404 Not Found
    }
    label.name = name;
    return label; 

}
const deleteLabel = (user, id) => {
    const label = getLabelById(user, id);
    if (!label) {
        return null; // 404 Not Found
    }

    user.labels = user.labels.filter(label => label.id !== id);
    return true; 
}


module.exports = { createLabel, getAllLabels, getLabelById, updateLabel, deleteLabel };