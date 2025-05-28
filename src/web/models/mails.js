
const { isBlacklisted } = require('../blackList')

const extractLink = (text) => {
    const preLinks = typeof text === 'string' ? text.match(/https?:\/\/[^\s]+/g) || [] : []
    const validUrlRegex = /^((https?:\/\/)?[a-z0-9.-]+\.[a-z]{2,10}[0-9]*(\/.*)?)$/
    return preLinks.filter(link => validUrlRegex.test(link))
}

const checkLinks = async (body, subject) => {
    const bodyLinks = extractLink(body)
    const subjectLinks = extractLink(subject)
    const links = [...bodyLinks, ...subjectLinks]
    for (const link of links) {
        const blacklisted = await isBlacklisted(link);
        if (blacklisted) {
            throw new Error('BLACKLISTED_LINK')
        }
    }
    return links
}

const createMail = async (sender, recipient, subject, body) => {
    const links = await checkLinks(body, subject)
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

  return mail
}



const get50LastMails = (user) => {
    const sortedMails = [...user.mails].sort((a,b) => {
        return new Date(b.time)- new Date(a.time)
    })
    return sortedMails.slice(0, 50)
}



module.exports = { createMail, get50LastMails }


