const Store = require('../models/store')
const { createMail } = require('../models/mails')
const { get50LastMails } = require('../models/mails')
const { editMail } = require('../models/mails')


// Controller to handle creation of a new mail

exports.createMail = async (req, res) => {
    const from = req.headers['x-user-id']
    const { to, subject, body} = req.body

    // Validate presence of 'from' and 'to' fields
    if (!from || !to) {
        return res.status(400).json({ error: 'Bad Request' })
    }

    // Find the sender and recipient users in the users list
    const sender = Store.find(u => u.id == from)
    const recipient = Store.find(u => u.id === to)

    // If either user is not found, return an error
    if (!sender || !recipient) {
         return res.status(404).json({ error: 'Not Found' });
    }

    // Validate optional fields if provided
    if (subject !== undefined && typeof subject !== 'string') {
        return res.status(400).json({ error: 'Subject must be a string if provided' });
    }

    if (body !== undefined && typeof body !== 'string') {
        return res.status(400).json({ error: 'Body must be a string if provided' });
    }

    // Try to create the mail using the createMail function
    try{
    const mail = await createMail(sender, recipient, subject, body)
    // Return a success response with the new mail's location
    res.status(201).location(`/api/mails/${mail.id}`).end()
    } catch (err) {
        // If the mail contains a blacklisted link, return a 400 error
        if (err.message === 'BLACKLISTED_LINK') {
            return res.status(400).json({ error: 'Bad Request' })
        } else {
            return res.status(500).json({ error: 'Server Error' })
        }
    }
}

// Controller to Handle the request to get the user's last 50 mails

exports.get50LastMails = (req, res) => {
    // Find the user in the users list
    const userId = req.headers['x-user-id']
    // If the user ID was not provided at all
    if (!userId) {
    return res.status(400).json({ error: 'Bad Request' });
    }
    const user = Store.find(u => u.id === userId)
    // If the user is not found, return an error
    if (!user) {
         return res.status(404).json({ error: 'Not Found' });
    }
    // Get the last 50 mails of the user and return them
    const mails = get50LastMails(user)
    res.status(200).json(mails)
}

checkIdValid = (userId, mailId, res) => {
    // If the IDs were not provided at all
    if (!userId || !mailId) {
        res.status(400).json({ error: 'Bad Request' });
        return null
    }
    const user = Store.find(u => u.id === userId)
     if (!user) {
        res.status(404).json({ error: 'Not Found'})
        return null
     }
    const mail = user.mails.find(m => m.id === mailId)
    if (!mail) {
        res.status(404).json({ error: 'Not Found'})
        return null
    }
    return { mail, user }
}

exports.getSpecificMail = (req, res) => {
    // Get the user Id
    const userId = req.headers['x-user-id']
    //Get the mails'id from the url
    const mailId = req.params.id

   console.log(" PATCH called for:", mailId, "by user", userId) 

    // Use helper function to validate user and mail
    const result = checkIdValid(userId, mailId, res)
    if (!result){

        console.log("checkIdValid failed")

        return
    }    

    const { mail, user} = result

    res.status(200).json(mail)
}

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
        return res.status(400).json({ error: 'Bad Request' })
    }

    // Prevent subject from being updated
    if ('subject' in req.body) {
        return res.status(400).json({ error: 'Bad Request' })
    }

    // Ensure body exists and is a string
    if (!('body' in req.body) || typeof req.body.body !== 'string') {
        return res.status(400).json({ error: 'Bad Request' })
    }

    try {
        // Delegate the edit logic (including blacklist check) to the model
        await editMail(mailId, req.body.body);
        res.status(204).end(); // No content response
    } catch (err) {
        console.error(" Edit mail failed:", err);

        if (err.message === 'BLACKLISTED_LINK') {
        res.status(400).json({ error: 'Body contains blacklisted link' });
        } else {
            res.status(500).json({ error: 'Server Error' });
    }
  }
}