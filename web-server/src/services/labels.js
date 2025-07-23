const Label = require('../models/labels.js');
const Mail = require('../models/mails.js');

// This function creates a new label for a specific user.
const createLabel = async (userId, name, options = {}) => {
    // Check if the user already has a label with the same name
    const existingLabel = await Label.findOne({ name: name, user: userId });
     if (existingLabel) {
        throw new Error('A label with this name already exists.'); 
    }

    // Create a new label object and add it to the user's labels array
    const newLabel = await Label.create({
         name: name,
         isDefault: options.isDefault ?? false,
         allowAdd: options.allowAdd ?? true,
         user: userId
    });

    return newLabel;
}

// This function retrieves all labels for a specific user.
const getAllLabels = async (userId) => {
    const labels = await Label.find({ user: userId });
    return labels;
};

// This function retrieves a specific label of a specific user.
const getLabelById = async (labelId, userId) => {
    // Find the label by id in the user's labels object array
    const label = await Label.findOne({ _id: labelId, user: userId });

    if (!label) {
        throw new Error('Label not found.'); 
    }
    return label;
};

// This function updates the name of a specific label for a specific user.
const updateLabel = async (labelId, newName, userId) => {
    // If a label with the same name already exists, return null
       const existingLabel = await Label.findOne({ 
        name: newName, 
        user: userId, 
        _id: { $ne: labelId }
    });
    if (existingLabel) {
        throw new Error('INVALID_NAME: A label with this name already exists.');
    }

    const updatedLabel = await Label.findOneAndUpdate(
        { _id: labelId, user: userId }, 
        { name: newName }, 
        { new: true }
    );

       if (!updatedLabel) {
         throw new Error('LABEL_NOT_FOUND');
    }
    return updatedLabel; 
};


// This function deletes a specific label of a specific user.
const deleteLabel = async (labelId, userId) => {
    // Check if the label exists in the user's labels array
    const labelToDelete = await Label.findOne({ _id: labelId, user: userId });
    if (!labelToDelete) {
        throw new Error('LABEL_NOT_FOUND'); 
    }

    // Check if this label is default
    if (labelToDelete.isDefault) {
        throw new Error('CANNOT_DELETE_THIS_LABEL');
    }

    // Remove the label ID from all mails that have it
    await Mail.updateMany(
        { _id: { $in: labelToDelete.mails } },
        { $pull: { labels: labelId } }
    );

    // Remove the label from the user's labels array
    await Label.findByIdAndDelete(labelId);

    return true; 
}


// Adds a mail to a user label
const addMailToUserLabel = async (userId, mailId, labelName) => {
    // Find the label by name
    const label = await Label.findOne({ name: labelName, user: userId });
    if (!label) {
        throw new Error('LABEL_NOT_FOUND');
    }

    // Check if adding to this label is allowed
    if (!label.allowAdd) {
        throw new Error('CANNOT_ADD_TO_LABEL');
    }

    // Avoid add a mail to a label when the mail already there
     if (label.mails.includes(mailId)) {
        throw new Error('MAIL_ALREADY_IN_LABEL');
    }

    // Add the mail to the label
    await addMailToLabel(label._id, mailId);
   
    return true;
};

// Removes a mail from a specific label
const removeMailFromLabel = async (labelId, mailId, userId) => {
    // Find the label by name
    const label = await Label.findOne({ _id: labelId, user: userId });
    if (!label) {
        throw new Error('LABEL_NOT_FOUND');
    }

    if (!label.mails.includes(mailId)) {
        throw new Error('MAIL_NOT_IN_LABEL');
    }

    await Label.findByIdAndUpdate(labelId, { $pull: { mails: mailId } });
    await Mail.findByIdAndUpdate(mailId, { $pull: { labels: labelId } });

    return true;
};

// Adds a mail to a specific label. Also used for add to default labels
const addMailToLabel = async (labelId, mailId) => {
    await Label.findByIdAndUpdate(labelId, { $addToSet: { mails: mailId } });
    await Mail.findByIdAndUpdate(mailId, { $addToSet: { labels: labelId } });
};

module.exports = { createLabel, getAllLabels, getLabelById, updateLabel, deleteLabel, addMailToLabel, removeMailFromLabel, addMailToUserLabel };