const Labels = require("../models/labels");
const { getUserById } = require("../models/users");

// Create a new label for a specific user
exports.createLabel = (req, res) => {
  const { name } = req.body;

  // Validate required fields
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  // get the auterized user user we want to add the label to
  const user = getUserById(req.user.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Try to create label. Fail if name already exists
  const newLabel = Labels.createLabel(user, name);
  if (newLabel === null) {
    return res.status(400).json({ error: "The label name you have chosen already exists. Please try another name:" });
  }
  res.status(201).location(`/api/labels/${newLabel.id}`).end();
};

// Get all labels for a specific user
exports.getAllLabels = (req, res) => {
  // find the user we want to add the label to
  const user = getUserById(req.user.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const allLabels = Labels.getAllLabels(user);
  res.status(200).json(allLabels);
};

// Get a specific label for a specific user
exports.getLabelById = (req, res) => {
  const labelId = req.params.id;
  const user = getUserById(req.user.id);

  if (!user) return res.status(404).json({ error: "User not found" });

  const label = Labels.getLabelById(user, labelId);
  if (!label) {
    return res.status(403).json({ error: "Unauthorized access to label or label not found" });
  }
  res.status(200).json(label);
};

// Update a specific label name of a specific user
exports.updateLabel = (req, res) => {
  const labelId = req.params.id;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  const user = getUserById(req.user.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  try {
    const updatedLabel = Labels.updateLabel(user, labelId, name);
    res.status(200).json(updatedLabel); // אפשר גם 204 ללא תוכן אם לא מחזירים את התווית
  } catch (err) {
    if (err.message === "INVALID_NAME") {
      // 400 Bad Request if the name already exists for this user
      return res.status(400).json({ error: "Name already exists" });
    }
    if (err.message === "LABEL_NOT_FOUND") {
      // valedate the labelId that was given as a parameter

      return res.status(403).json({ error: "Unauthorized access to label or label not found" });
    }
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};


// Delete a specific label of a specific user
exports.deleteLabel = async (req, res) => {
  // Check if the user id matches the id in the request header
  const labelId = req.params.id;

  const user = await getUserById(req.user.id);
  if (!user) return res.status(404).json({ error: "User not found" });

  try {
    const result = await Labels.deleteLabel(user, labelId);
    res.status(204).json({ message: 'Label deleted', result })
  } catch (err) {
    // If the label was not found
    if (err.message === 'LABEL_NOT_FOUND') {
    return res.status(403).json({ error: "Unauthorized access to label or label not found" });
    }
    // If the user can't delete the label, return a 400 error
    if (err.message === 'CANNOT_DELETE_THIS_LABEL') {
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
    const result = await addMailToUserLabel(user, mail, labelName);
    res.status(201).json({ message: "Mail added to label", result });
  } catch (err) {
    if (err.message === 'LABEL_NOT_FOUND') {
      return res.status(404).json({ error: "Label not found" });
    }
    if (err.message === 'CANNOT_ADD_TO_LABEL') {
      return res.status(400).json({ error: "Cannot add to this label" });
    }
    if (err.message === 'MAIL_ALREADY_IN_LABEL') {
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

  const user = await getUserById(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const mail = user.mails.find(m => m.id === mailId);
  if (!mail) {
    return res.status(404).json({ error: "Mail not found" });
  }

  try {
    const result = await Labels.removeMailFromLabel(user, mail, labelName);
    return res.status(200).json({ message: "Mail removed from label", result });
  } catch (err) {
    if (err.message === 'LABEL_NOT_FOUND') {
      return res.status(404).json({ error: "Label not found" });
    }
    if (err.message === 'MAIL_NOT_IN_LABEL') {
      return res.status(400).json({ error: "Mail not in label" });
    }
  }
};