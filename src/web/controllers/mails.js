const Store = require('../models/store')
const { createMail } = require('../models/mails')

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
    const mail = await createMail(sender, recipient, subject, body)

    res.status(201).location(`/api/mails/${mail.id}`).end()
}



