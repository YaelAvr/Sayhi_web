const Store = require('../models/store')
const { createMail } = require('../models/mails')
const { get50LastMails } = require('../models/mails')
const { editMail } = require('../models/mails')
const { searchMailsByQuery } = require('../models/mails')
const { createDraft } = require('../models/mails')
const { addLabelToMail } = require('../models/mails')
const { deleteMail } = require('../models/mails')

// Controller to handle creation of a new mail

exports.createMail = async (req, res) => {
    const from = req.headers['x-user-id']
    const { to, subject, body, originalDraftId} = req.body

    // Validate presence of 'from' and 'to' fields
    if (!from || !to) {
        return res.status(400).json({ error: 'Missing sender or recipient ID' })
    }

    // Find the sender and recipient users in the users list
    const sender = Store.find(u => u.id == from)
    const recipient = Store.find(u => u.id === to)

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
        const draft = sender.mails.find(m => m.id === originalDraftId)
        if (!draft || !draft.labels.includes('Draft')) {
            return res.status(400).json({ error: 'Invalid or non-draft mail ID' });
    }
    }

    // Try to create the mail using the createMail function
    try{
    const mail = await createMail(sender, recipient, subject, body, originalDraftId)
    // Return a success response with the new mail's location
    res.status(201).location(`/api/mails/${mail.id}`).end()
    } catch (err) {

    console.error(err);
    res.status(500).json({ error: 'Server Error' })
    }
}

// Controller to Handle the request to get the user's last 50 mails

exports.get50LastMails = (req, res) => {
    // Find the user in the users list
    const userId = req.headers['x-user-id']

    // If the user ID was not provided at all
    if (!userId) {
    return res.status(400).json({ error: 'Missing x-user-id header' })
    }

    const user = Store.find(u => u.id === userId)
    // If the user is not found, return an error
    if (!user) {
         return res.status(404).json({ error: 'User not found' })
    }

    // Get the last 50 mails of the user and return them
    const mails = get50LastMails(user)
    res.status(200).json(mails)
}

// function to check if inputs id's are valid
checkIdValid = (userId, mailId, res) => {
    // If the IDs were not provided at all
    if (!userId || !mailId) {
        res.status(400).json({ error: 'Missing user ID or mail ID' });
        return null
    }

    const user = Store.find(u => u.id === userId)
     if (!user) {
        res.status(404).json({ error: 'User not found' })
        return null
     }

    const mail = user.mails.find(m => m.id === mailId)
    if (!mail) {
        res.status(404).json({ error: 'Mail not found for this user' })
        return null
    }
    return { mail, user }
}

// Controller to Handle handle the option to delete a mail
exports.deleteMail = (req, res) => {
  const userId = req.headers['x-user-id']
  const mailId = req.params.id

  // Use the helper function to validate and retrieve user and mail
  const result = checkIdValid(userId, mailId, res)
  if (!result) return

  const { user, mail } = result

  try {
    deleteMail(user, mailId)
    res.status(204).end()
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
};





// Controller to Handle the option to get a specific mail 
exports.getSpecificMail = (req, res) => {
    // Get the user Id
    const userId = req.headers['x-user-id']
    //Get the mails'id from the url
    const mailId = req.params.id

    // Use helper function to validate user and mail
    const result = checkIdValid(userId, mailId, res)
    if (!result){
        return
    }    

    const { mail, user} = result

    res.status(200).json(mail)
}

// Controller to Handle the option to edit a mail
exports.editMail = async (req, res) => {
    // Get the user Id
    const userId = req.headers['x-user-id']
    //Get the mails'id from the url
    const mailId = req.params.id

    // Use helper function to validate user and mail
    const result = checkIdValid(userId, mailId, res)
    if (!result) return

    const { mail } = result
    if (mail.from !== userId) {
        return res.status(400).json({ error: 'Only the sender can edit the mail' })
    }

    // Prevent subject from being updated
    if ('subject' in req.body) {
        return res.status(400).json({ error: 'Subject cannot be edited' })
    }

    // Ensure body exists and is a string
    if (!('body' in req.body) || typeof req.body.body !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid body field' })
    }

    try {
        // Delegate the edit logic (including blacklist check) to the model
        await editMail(mailId, req.body.body);
        res.status(204).end()// No content response
    } catch (err) {
        if (err.message === 'BLACKLISTED_LINK') {
        res.status(400).json({ error: 'Updated body contains blacklisted link' })
        } else {
            res.status(500).json({ error: 'Server Error' })
    }
  }
}

// Controller to handle searching mails by query
exports.searchMailsByQuery = (req, res) => {
    // Get the user Id
    const userId = req.headers['x-user-id']
    //Get query
    const query = req.params.query

    // Check for missing headers or params
    if (!userId || query === undefined) {
    return res.status(400).json({ error: 'Missing x-user-id or query parameter' })
    }

    // Find user in users array
    const user = Store.find(u => u.id === userId);
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


// Controller to handle creating draft
exports.createDraft = (req, res) => {
    // Get the user Id
    const userId = req.headers['x-user-id']
    const { to, subject, body } = req.body

    if (!userId) {
            return res.status(400).json({ error: 'Missing sender ID' })
    }
    const sender = Store.find(u => u.id === userId)
    if (!sender) {
        return res.status(404).json({ error: 'Sender not found' })
    }

    try {
        const draft = createDraft(sender, to, subject, body)
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
    const userId = req.headers['x-user-id']
    const mailId = req.params.id
    const { labelName } = req.body

    if (!userId || !labelName) {
        return res.status(400).json({ error: 'Missing user ID or label name' })
    }

    const user = Store.find(u => u.id === userId)
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
        return res.status(404).json({ error: 'Mail not found' })
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
