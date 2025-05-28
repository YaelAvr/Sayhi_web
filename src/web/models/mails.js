
const { isBlacklisted } = require('../blackList');

    const createMail = async (sender, recipient, subject, body) => {
    const preLinks = typeof body === 'string' ? body.match(/https?:\/\/[^\s]+/g) || [] : []
    const validUrlRegex = /^((https?:\/\/)?[a-z0-9.-]+\.[a-z]{2,10}[0-9]*(\/.*)?)$/
    const links = preLinks.filter(link => validUrlRegex.test(link))

    for (const link of links) {
        const blacklisted = await isBlacklisted(link);
        if (blacklisted) {
            return res.status(400).json({ error: 'Bad Request' })
        }
    }

    const mailId = `m-${sender.id}-${sender.mailCounter++}`
    const time = new Date().toISOString()
    const mail = {
        id: mailId,
        from: sender.id,
        to: recipient.id,
        subject: subject || '',
        body: body || '',
        links,
        labelIds: [],
        time
  }

  sender.mails.push(mail)
  recipient.mails.push(mail)

  return mail;
}


module.exports = {createMail}
