const Store = require('../models/store')
const { createMail } = require('../models/mails')
const { get50LastMails } = require('../models/mails')

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
    try{
    // Try to create the mail using the createMail function
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

exports.get50LastMails = (req, res ) => {
    // Find the user in the users list
    const userId = req.headers['x-user-id']
    const user = Store.find(u => u.id === userId)
    // If the user is not found, return an error
    if (!user) {
         return res.status(400).json({ error: 'Bad Request' });
    }
    // Get the last 50 mails of the user and return them
    const mails = get50LastMails(user)
    res.status(200).json(mails)


    
}



