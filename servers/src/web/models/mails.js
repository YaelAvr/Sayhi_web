const { isBlacklisted } = require('./blacklist')
const Store = require('./store')

// Extract all valid links from a given text (e.g., body or subject)
const extractLink = (text) => {
    if (typeof text !== 'string') return []

    const tokens = text.split(/\s+/)
    const validUrlRegex = /^((https?:\/\/)?[a-z0-9.-]+\.[a-z]{2,10}[0-9]*(\/.*)?)$/

    return tokens.filter(token => validUrlRegex.test(token))
}

// Check if any links in the body or subject are blacklisted
const checkLinks = async (body, subject) => {
    const bodyLinks = extractLink(body)
    const subjectLinks = extractLink(subject)
    const links = [...bodyLinks, ...subjectLinks]

    for (const link of links) {
        const blacklisted = await isBlacklisted(link)
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

// Edit the body of an existing mail by ID, after checking for blacklisted links
const editMail = async (mailId, newBody) => {
  // Validate that the new body does not contain blacklisted URLs
  const links = await checkLinks(newBody, "")

  // Update the body and (and mail's links) for every user who holds a copy of the mail
  Store.forEach(user => {
    const mail = user.mails.find(m => m.id === mailId);
    if (mail) {
      mail.body = newBody;
      mail.links = links
    }
  })
}

// Search for query string in selected fields of user's mails
const searchMailsByQuery = (user, query) => {
  
  // Convert query to lowercase for case-insensitive comparison
    const lowerQuery = query.toLowerCase()

  // Return only mails where the query appears in one of the relevant fields
  return user.mails.filter(mail => {
    return (
            (mail.subject?.toLowerCase().includes(lowerQuery)) ||  // Check subject if exists
            (mail.body?.toLowerCase().includes(lowerQuery)) ||     // Check body if exists
            mail.from.toLowerCase().includes(lowerQuery) ||        // Check 'from' field (always exists)
            mail.to.toLowerCase().includes(lowerQuery)             // Check 'to' field (always exists)
        )
  })
}







module.exports = { createMail, get50LastMails, editMail, searchMailsByQuery }


