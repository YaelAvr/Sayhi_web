const { isBlacklisted, addUrlToBlacklist, deleteUrlFromBlacklist } = require('./blacklist')
const Store = require('../models/store')
const { addMailToLabel, addMailToUserLabel, removeMailFromLabel } = require('../models/labels')



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

    let isContain = false
    for (const link of links) {
      const blacklisted = await isBlacklisted(link)
        if (blacklisted) {
            isContain = true
        }
    }
    return { links, isContain }
}

// Create a new mail object and add it to both sender and recipient
const createMail = async (sender, recipient, subject, body, originalDraftId = null) => {
    const  { links, isContain } = await checkLinks(body, subject)
    const mailId = `m-${sender.id}-${sender.mailCounter++}`
    const time = new Date().toISOString()
    const senderMail  = {
        id: mailId,
        from: sender.id,
        to: recipient.id,
        subject: subject || '',
        body: body || '',
        links,
        labels: [],
        time,
        fromName: sender.displayName,
        toName: recipient.displayName,
        fromUserName: sender.username,
        toUserName: recipient.username,
        fromPicture: sender.picture
    }
    const recipientMail = {
      id: `${mailId}-copy`,
      from: sender.id,
      to: recipient.id,
      subject: subject || '',
      body: body || '',
      links,
      labels: [],
      time,
      fromName: sender.displayName,
      toName: recipient.displayName,
      fromUserName: sender.username,
      toUserName: recipient.username,
      fromPicture: sender.picture
  }

  // Find label objects by name
  const senderLabel = sender.labels.find(l => l.name === 'Sent')
  const recipientLabel = recipient.labels.find(l => l.name === (isContain ? 'Spam' : 'Inbox'));

  // Add mail to labels using external helper
  addMailToLabel(senderLabel, senderMail)
  addMailToLabel(recipientLabel, recipientMail)

  // Save the mails to the users' mailboxes
  sender.mails.push(senderMail)
  recipient.mails.push(recipientMail)

  // If it was a draft - delete it from mails and label references
  if (originalDraftId) {
    const originalDraft = sender.mails.find(m => m.id === originalDraftId);
    sender.mails = sender.mails.filter(m => m.id !== originalDraftId)
    // for (const label in sender.labels) {
    //   sender.labels[label].mails = sender.labels[label].mails.filter(id => id !== originalDraftId)
    // }
    removeMailFromLabel(sender,originalDraft,'Drafts')

  }

  return senderMail;
}

// Return up to 50 mails from a given label, starting at the given offset
const getMailsByLableWithOffset = (user, labelName, offset) => {
  const label = user.labels.find(l => l.name === labelName)
  if (!label) {
    throw new Error('LABEL_NOT_FOUND')
  }

  //Sort the mails array by time
  const labelMails = label.mails
    .map(mailId => user.mails.find(m => m.id === mailId))
    .filter(mail => mail !== undefined)
    .sort((a, b) => new Date(b.time) - new Date(a.time))

    //Return only up to 50 mails, depends on
    return labelMails.slice(offset, offset + 50)
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
            mail.fromName.toLowerCase().includes(lowerQuery) ||        // Check 'from' field (always exists)
            mail.toName.toLowerCase().includes(lowerQuery)             // Check 'to' field (always exists)
        )
  })
}


// Creates a draft mail(even from an exicted draft)
const createDraft = async (sender, to, subject, body, originalDraftId = null) => {
  // Validate at least one field is non-empty
  if (!to && !subject && !body) {
    throw new Error('DRAFT_EMPTY')
  }

  // delete source draft if existed
  if (originalDraftId) {
    try {
      await deleteMail(sender, originalDraftId);
    } catch (err) {
      console.warn(`Failed to delete original draft ${originalDraftId}: ${err.message}`);
      // We don’t throw — we continue anyway
    }
  }


  const mailId = `m-${sender.id}-${sender.mailCounter++}`
  const time = new Date().toISOString()

  // Check if 'to' is a valid user, if it is keeps it in recipient
  const recipient = to ? Store.find(u => u.username === to) : null;

  //create mail
  const draftMail = {
    id: mailId,
    from: sender.id,
    to: recipient ? recipient.id : '',
    subject: subject || '',
    body: body || '',
    links: [],
    labels: [],
    time,
    fromName: sender.displayName,
    toName: recipient ? recipient.displayName : '',
    fromUserName: sender.username,
    toUserName: recipient ? recipient.username : '',
    fromPicture: sender.picture 
  }

  const draftLabel = sender.labels.find(l => l.name === 'Drafts')
  if (!draftLabel) throw new Error('NO_DRAFT_LABEL')
  
  // Add mail to labels using external helper
  addMailToLabel(draftLabel, draftMail)
  // Save the mails to the users' mailboxes
  sender.mails.push(draftMail)

  return draftMail
}

// Adds an existing mail to a user's label by label name.
// If the label is "Spam", the mail's links are added to the global blacklist.
const addLabelToMail = async (user, mailId, labelName) => {
  const mail = user.mails.find(m => m.id === mailId);
  if (!mail) {
    throw new Error('MAIL_NOT_FOUND');
  }

  // If adding to Spam, attempt to blacklist all links
  if (labelName === 'Spam') {
    for (const link of mail.links) {
      await addUrlToBlacklist(link)
    }
  }

  addMailToUserLabel(user, mail, labelName)
}


// Deletes a mail completely from user.mails and all labels.
// If deleted from "Spam", also removes its links from the blacklist.
const deleteMail = async (user, mailId) => {
  const mail = user.mails.find(m => m.id === mailId)
  if (!mail) {
    throw new Error('MAIL_NOT_FOUND')
  }

  // If mail is in Spam, remove its links from the blacklist
  const wasInSpam = user.labels.find(label =>
    label.name === 'Spam' && label.mails.includes(mailId)
  )
  if (wasInSpam) {
  for (const link of mail.links) {
    try {
      await deleteUrlFromBlacklist(link)
    } catch (err) {
      console.warn(`Failed to delete link ${link}: ${err.message}`)
    }
  }
}

  // Remove the mail from all labels
  for (const label of user.labels) {
    if (label.mails.includes(mail.id)) {
      removeMailFromLabel(user, mail, label.name)
    }
  }

  // Remove the mail from user.mails
  user.mails = user.mails.filter(m => m.id !== mailId)
}









module.exports = { createMail, getMailsByLableWithOffset, searchMailsByQuery, createDraft, addLabelToMail, deleteMail }