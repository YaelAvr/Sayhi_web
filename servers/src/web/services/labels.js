const Users = require('./store');

// This function creates a new label for a specific user.
const createLabel = async (user, name, options = {}) => {
    // Check if the user already has a label with the same name
    if (user.labels.find(label => label.name === name)) {
        return null; 
    }

    // Create a new label object and add it to the user's labels array
    const labelId = `l-${user.id}-${user.labelCounter++}`; 
    const label = {
         id: labelId,
         name,
         mails: [], //saved the mails id
         isDefault: options.isDefault ?? false,
         allowAdd: options.allowAdd ?? true
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
        throw new Error('LABEL_NOT_FOUND'); 
    }

    // Check if this label is default
    if (label.isDefault) {
        throw new Error('CANNOT_DELETE_THIS_LABEL');
    }

    // Remove the label ID from all mails that have it
    for (const mail of user.mails) {
        if (mail.labels) {
            mail.labels = mail.labels.filter(labelId => labelId !== id);
        }
    }

    // Remove the label from the user's labels array
    user.labels = user.labels.filter(label => label.id !== id);
    return true; 
}


// Adds a mail to a user label
const addMailToUserLabel = (user, mail, labelName) => {
    // Find the label by name
    const label = user.labels.find(label => label.name === labelName);
    if (!label) {
        throw new Error('LABEL_NOT_FOUND');
    }

    // Check if adding to this label is allowed
    if (!label.allowAdd) {
        throw new Error('CANNOT_ADD_TO_LABEL');
    }

    // Avoid add a mail to a label when the mail already there
    if (label.mails.includes(mail.id)) {
        throw new Error('MAIL_ALREADY_IN_LABEL');
    }

    // Add the mail to the label
    addMailToLabel(label, mail)
   
    return true;
};

// Removes a mail from a specific label
const removeMailFromLabel = (user, mail, labelName) => {
    // Find the label by name
    const label = user.labels.find(label => label.name === labelName);
    if (!label) {
        throw new Error('LABEL_NOT_FOUND');
    }

    // Check if the mail is actually in the label
    if (!label.mails.includes(mail.id)) {
        throw new Error('MAIL_NOT_IN_LABEL');
    }

    // Remove the mail ID from the label
    label.mails = label.mails.filter(id => id !== mail.id);

    // Remove the label ID from the mail
    mail.labels = mail.labels.filter(id => id !== label.id);

    return true;
};

// Adds a mail to a specific label. Also used for add to default labels
const addMailToLabel = (label, mail) => {
    label.mails.push(mail.id); //add the mail ID to the label
    mail.labels.push(label.id); //add the label ID to the mail's labelID list
}

module.exports = { createLabel, getAllLabels, getLabelById, updateLabel, deleteLabel, addMailToLabel, removeMailFromLabel, addMailToUserLabel };