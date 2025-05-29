const { isBlacklisted } = require('./blacklist')

// Extract all valid links from a given text (e.g., body or subject)
const extractLink = (text) => {
    const preLinks = typeof text === 'string' ? text.match(/https?:\/\/[^\s]+/g) || [] : []
    const validUrlRegex = /^((https?:\/\/)?[a-z0-9.-]+\.[a-z]{2,10}[0-9]*(\/.*)?)$/
    return preLinks.filter(link => validUrlRegex.test(link))
}

// Check if any links in the body or subject are blacklisted
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

// Create a new mail object and add it to both sender and recipient
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
  // Save the mail to both users' mailboxes
  sender.mails.push(mail)
  recipient.mails.push(mail)

  return mail
}

// Return the user's 50 most recent mails, sorted by time
const get50LastMails = (user) => {
    //Sort the mails array by time
    const sortedMails = [...user.mails].sort((a,b) => {
        return new Date(b.time)- new Date(a.time)
    })
    //Return only up to 50 mails
    return sortedMails.slice(0, 50)
}

module.exports = { createMail, get50LastMails }


