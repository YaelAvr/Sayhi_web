const Store = require('../models/store')
const { createMail } = require('../models/mails')
const { get50LastMails } = require('../models/mails')

exports.createMail = async (req, res) => {
    const from = req.headers['x-user-id']
    const { to, subject, body} = req.body
    if (!from || !to) {
        return res.status(400).json({ error: 'Bad Request' })
    }
    const sender = Store.find(u => u.id == from)
    const recipient = Store.find(u => u.id === to)

    if (!sender || !recipient) {
         return res.status(404).json({ error: 'Not Found' });
    }
    try{
    const mail = await createMail(sender, recipient, subject, body)
    res.status(201).location(`/api/mails/${mail.id}`).end()
    } catch (err) {
        if (err.message === 'BLACKLISTED_LINK') {
            return res.status(400).json({ error: 'Bad Request' })
        } else {
            return res.status(500).json({ error: 'Server Error' })
        }
    }
}


exports.get50LastMails = (req, res ) => {
    const userId = req.headers['x-user-id']
    const user = Store.find(u => u.id === userId)
    if (!user) {
         return res.status(400).json({ error: 'Bad Request' });
    }
    const mails = get50LastMails(user)
    res.status(200).json(mails)


    
}



