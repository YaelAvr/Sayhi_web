const labelService = require('../services/labels.js');



// Create a new label for a specific user
exports.createLabel = async (req, res) => {
  const { name } = req.body;

  // Validate required fields
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  // get the auterized user user we want to add the label to
    const userId = req.user.id;  
    if (!userId) {
    return res.status(404).json({ error: "User not found" });
  }

  // Try to create label. Fail if name already exists
  try {
    const newLabel = await labelService.createLabel(userId, name);
    res.status(201).location(`/api/labels/${newLabel.id}`).json(newLabel);
  } catch (error) {
    // השירות זורק שגיאה אם השם כבר קיים
    res.status(400).json({ error: error.message });
  }
};

// Get all labels for a specific user
exports.getAllLabels = async (req, res) => {
  // find the user we want to add the label to
  const userId = req.user.id;
  if (!userId) {
    return res.status(404).json({ error: "User not found" });
  }

   try {
    const allLabels = await labelService.getAllLabels(userId);
    res.status(200).json(allLabels);
  } catch (error) {
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};

// Get a specific label for a specific user
exports.getLabelById = async (req, res) => {

  const labelId = req.params.id;
  const userId = req.user.id;

  if (!userId) return res.status(404).json({ error: "User not found" });

   try {
    const label = await labelService.getLabelById(labelId, userId);
    res.status(200).json(label);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Update a specific label name of a specific user
exports.updateLabel = async (req, res) => {
  const labelId = req.params.id;
  const { name } = req.body;
  const userId = req.user.id;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  if (!userId) {
    return res.status(404).json({ error: "User not found" });
  }

   try {
    const updatedLabel = await labelService.updateLabel(labelId, name, userId);
    res.status(200).json(updatedLabel);
  } catch (error) {
    if (error.message.includes("INVALID_NAME") || error.message.includes("already exists")) {
      return res.status(400).json({ error: "Name already exists" });
    }
    if (error.message.includes("NOT_FOUND")) {
      return res.status(404).json({ error: "Label not found" });
    }
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};


// Delete a specific label of a specific user
exports.deleteLabel = async (req, res) => {
  // Check if the user id matches the id in the request header
  const labelId = req.params.id;
  const userId = req.user.id;

  if (!userId) return res.status(404).json({ error: "User not found" });

  try {
    const result = await labelService.deleteLabel(labelId, userId);
    res.status(204).json({ message: 'Label deleted', result })
  } catch (error) {
    // If the label was not found
    if (error.message.includes('NOT_FOUND')) {
      return res.status(403).json({ error: "Unauthorized access to label or label not found" });

    }
    // If the user can't delete the label, return a 400 error
    if (error.message.includes('CANNOT_DELETE')) {
      return res.status(400).json({ error: 'Bad Request' })
    }
  }
}

exports.addMailToLabel = async (req, res) => {
  const userId = req.user.id;
  const { labelName, mailId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  if (!labelName || !mailId) {
    return res.status(400).json({ error: "Label name and mail ID are required" });
  }

  const user = await getUserById(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const mail = user.mails.find(m => m.id === mailId);
  if (!mail) {
    return res.status(404).json({ error: "Mail not found" });
  }

  try {
    const result = await labelService.addMailToUserLabel(userId, mailId, labelName);
    res.status(201).json({ message: "Mail added to label", result });
  } catch (error) {
    if (error.message.includes('NOT_FOUND')) {
      return res.status(404).json({ error: "Label not found" });
    }
    if (error.message.includes('CANNOT_ADD')) {
      return res.status(403).json({ error: "Cannot add mail to this label" });
    }
    if (error.message.includes('CANNOT_ADD_TO_LABEL')) {
      return res.status(400).json({ error: "Cannot add to this label" });
    }
    if (error.message.includes('ALREADY_IN_LABEL')) {
      return res.status(400).json({ error: "Mail already in label" });
    }
  }
};

exports.removeMailFromLabel = async (req, res) => {
  const userId = req.user.id;
  const { mailId, labelName } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  if (!labelName || !mailId) {
    return res.status(400).json({ error: "Label name and mail ID are required" });
  }

  try {
    const result = await labelService.removeMailFromUserLabel(userId, mailId, labelName);
    return res.status(200).json({ message: "Mail removed from label", result });
  } catch (error) {
    if (error.message.includes('LABEL_NOT_FOUND')) {
      return res.status(404).json({ error: "Label not found" });
    }
    if (error.message.includes('MAIL_NOT_IN_LABEL')) {
      return res.status(400).json({ error: "Mail not in label" });
    }
  }
};