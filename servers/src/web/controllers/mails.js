const Store = require('../models/store')
const { createMail } = require('../models/mails')
const { getMailsByLableWithOffset } = require('../models/mails')
const { searchMailsByQuery } = require('../models/mails')
const { createDraft } = require('../models/mails')
const { addLabelToMail } = require('../models/mails')
const { deleteMail } = require('../models/mails')
const { getUserById } = require("../models/users");
const { isUserNameRegistered } = require("../models/users");

// Controller to handle creation of a new mail

exports.createMail = async (req, res) => {
    const { to, subject, body, originalDraftId } = req.body

    // Validate presence of 'from' and 'to' fields
    if (!to) {
        return res.status(400).json({ error: 'Missing recipient ID' })
    }

    // get the auterized sender from the request user
    const sender = getUserById(req.user.id);

    // Find the sender and recipient users in the users list
    const recipient = isUserNameRegistered(to)

    // If either user is not found, return an error
    if (!sender || !recipient) {
        return res.status(404).json({ error: 'Sender or recipient not found' })
    }

    // Validate optional fields if provided
    if (subject !== undefined && typeof subject !== 'string') {
        return res.status(400).json({ error: 'Subject must be a string' })
    }

    if (body !== undefined && typeof body !== 'string') {
        return res.status(400).json({ error: 'Body must be a string' })
    }

    //if draftid was send, check if it exist
    if (originalDraftId) {
        const draft = sender.mails.find(m => m.id === originalDraftId);
        const draftsLabel = sender.labels.find(l => l.name === 'Drafts');
        if (!draft || !draftsLabel || !draft.labels.includes(draftsLabel.id)) {
            return res.status(400).json({ error: 'Invalid or non-draft mail ID' });
        }
    }

    // Try to create the mail using the createMail function
    try {
        const mail = await createMail(sender, recipient, subject, body, originalDraftId)
        // Return a success response with the new mail's location
        res.status(201).location(`/api/mails/${mail.id}`).end()
    } catch (err) {

        console.error(err);
        res.status(500).json({ error: 'Server Error' })
    }
}

// Controller to Handle the request to get the user's last 50 mails by lable and offset

exports.getMailsByLableWithOffset = (req, res) => {
    // Find the user in the users list
    const user = getUserById(req.user.id)
    const labelName = req.query.label
    const rawOffset = req.query.offset
    const offset = parseInt(rawOffset)

    if (isNaN(offset) || offset < 0) {
        return res.status(400).json({ error: 'Offset must be a non-negative integer' })
    }
    // If the lable name not provided at all
    if (!labelName) {
        return res.status(400).json({ error: 'Missing label name' })
    }

    // If the user is not found, return an error
    if (!user) {
        return res.status(404).json({ error: 'User not found' })
    }

    try {
        const mails = getMailsByLableWithOffset(user, labelName, offset)
        res.status(200).json(mails)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

// function to check if inputs id's are valid
checkIdValid = (userId, mailId, res) => {
    // If the IDs were not provided at all
    if (!userId || !mailId) {
        res.status(400).json({ error: 'Missing user ID or mail ID' });
        return null
    }

    const user = getUserById(userId)
    if (!user) {
        res.status(404).json({ error: 'User not found' })
        return null
    }

    const mail = user.mails.find(m => m.id === mailId)
    if (!mail) {
        res.status(403).json({ error: "Unauthorized access to mail or mail not found" });
        return null
    }
    return { mail, user }
}

// Controller to Handle handle the option to delete a mail
exports.deleteMail = async (req, res) => {
    // Get the user Id
    const userId = req.user.id
    const mailId = req.params.id

    // Use the helper function to validate and retrieve user and mail
    const result = checkIdValid(userId, mailId, res)
    if (!result) return

    const { user, mail } = result

    try {
        await deleteMail(user, mailId)
        res.status(204).end()
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}



// Controller to Handle the option to get a specific mail 
exports.getSpecificMail = (req, res) => {
    if (req.params.id !== req.user.id) {
        return res.status(403).json({ error: "Unauthorized access" });
    }

    // Get the user Id
    const userId = req.user.id
    //Get the mails'id from the url
    const mailId = req.params.id

    // Use helper function to validate user and mail
    const result = checkIdValid(userId, mailId, res)
    if (!result) {
        return
    }

    const { mail, user } = result

    res.status(200).json(mail)
}

// Controller to handle searching mails by query
exports.searchMailsByQuery = (req, res) => {
    // Get the user Id
    const userId = req.user.id
    //Get query
    const query = req.params.query

    // Check for missing headers or params
    if (!userId || query === undefined) {
        return res.status(400).json({ error: 'Missing x-user-id or query parameter' })
    }

    // Find user in users array
    const user = getUserById(userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' })
    }

    //Remove spaces from start and end
    const trimmedQuery = query.trim()
    if (trimmedQuery === '') {
        // No search query — return all mails
        return res.status(200).json(user.mails)
    }

    // Call model logic to search mails
    const results = searchMailsByQuery(user, trimmedQuery)
    res.status(200).json(results)
}


// Controller to handle creating draft (even from an exicted draft)
exports.createDraft = async (req, res) => {
    // Get the user Id
    const userId = req.user.id
    const { to, subject, body, originalDraftId } = req.body

    if (!userId) {
        return res.status(400).json({ error: 'Missing sender ID' })
    }
    const sender = getUserById(userId)
    if (!sender) {
        return res.status(404).json({ error: 'Sender not found' })
    }

    try {
        const draft = await createDraft(sender, to, subject, body, originalDraftId)
        res.status(201).json(draft)
    } catch (err) {
        if (err.message === 'DRAFT_EMPTY') {
            return res.status(400).json({ error: 'Draft must contain at least one field' })
        } else if (err.message === 'NO_DRAFT_LABEL') {
            return res.status(500).json({ error: 'Draft label not found for user' })
        }
        console.error(err)
        res.status(500).json({ error: 'Server Error' })
    }
}


// Controller to handle adding mail to lable
exports.addLabelToMail = async (req, res) => {
    // Get the user Id
    const userId = req.user.id
    const mailId = req.params.id
    const { labelName } = req.body

    if (!userId || !labelName) {
        return res.status(400).json({ error: 'Missing user ID or label name' })
    }

    const user = getUserById(userId)
    if (!user) {
        return res.status(404).json({ error: 'User not found' })
    }

    try {
        // Add the label (with blacklist logic for "Spam")
        await addLabelToMail(user, mailId, labelName);
        return res.status(200).json({ message: `Mail ${mailId} labeled as ${labelName}` })
    } catch (err) {
        // Handle expected error cases
        if (err.message === 'MAIL_NOT_FOUND') {
            res.status(403).json({ error: "Unauthorized access to mail or mail not found" });
        } else if (err.message === 'LABEL_NOT_FOUND') {
            return res.status(404).json({ error: 'Label not found' })
        } else if (err.message === 'CANNOT_ADD_TO_LABEL') {
            return res.status(400).json({ error: 'Cannot add to this label' })
        } else if (err.message === 'MAIL_ALREADY_IN_LABEL') {
            return res.status(400).json({ error: 'Mail already in label' })
        } else if (err.message === 'BAD_REQUEST_CPP_SERVER') {
            return res.status(400).json({ error: 'Invalid URL in mail links (rejected by C++ server)' })
        } else {
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
}