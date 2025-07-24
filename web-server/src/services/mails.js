const Mail = require('../models/mails');
const User = require('../models/users');
const Label = require('../models/labels');
const { isBlacklisted, addUrlToBlacklist, deleteUrlFromBlacklist } = require('./blacklist');
const { addMailToLabel, removeMailFromLabel, addMailToUserLabel } = require('./labels');



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
  const time = new Date();
    
  const baseMail = await Mail.create({
    from: sender._id,
    to: recipient._id,
    subject: subject || '',
    body: body || '',
    links,
    labels: [],
    time,
    fromName: sender.displayName,
    toName: recipient.displayName,
    fromUserName: sender.username,
    toUserName: recipient.username,
    fromPicture: sender.picture,
    isStarred: false
  });


  // Find label objects by name
  const senderLabel = await Label.findOne({ user: sender._id, name: 'Sent' });
  const recipientLabel = await Label.findOne({ user: recipient._id, name: isContain ? 'Spam' : 'Inbox' });

  let mail;
  if (sender._id.equals(recipient._id)) {
    // שינוי: רק מייל אחד כאשר שולח = נמען
    mail = await Mail.create(baseMail);
    await addMailToLabel(senderLabel._id, mail._id);
    await addMailToLabel(recipientLabel._id, mail._id);
  } else {
    const senderMail = await Mail.create(baseMail);
    const recipientMail = await Mail.create(baseMail);
    await addMailToLabel(senderLabel._id, senderMail._id);
    await addMailToLabel(recipientLabel._id, recipientMail._id);
    mail = senderMail;
  }

  // If it was a draft - delete it from mails and label references
  if (originalDraftId) {
    await Mail.findByIdAndDelete(originalDraftId);
    await Label.updateMany({ user: sender._id }, { $pull: { mails: originalDraftId } });
  }

  return mail;
};

// Return up to 50 mails from a given label, starting at the given offset
const getMailsByLableWithOffset = async (user, labelName, offset) => {
  const label = await Label.findOne({ user: user._id, name: labelName }).populate('mails');
  if (!label) throw new Error('LABEL_NOT_FOUND');

  //Sort the mails array by time
  const labelMails = label.mails.sort((a, b) => new Date(b.time) - new Date(a.time));
  return labelMails.slice(offset, offset + 50);
};


// Search for query string in selected fields of user's mails
const searchMailsByQuery = async (user, query) => {
  // Convert query to lowercase for case-insensitive comparison
  const lowerQuery = query.toLowerCase()
  // שלב 1: שלוף את כל המיילים שהמשתמש שלח או קיבל
  const mails = await Mail.find({
    $or: [
      { from: user._id },
      { to: user._id }
    ]
  });

  // שלב 2: סנן לפי הטקסט
  return mails.filter(mail =>
    mail.subject?.toLowerCase().includes(lowerQuery) ||
    mail.body?.toLowerCase().includes(lowerQuery) ||
    mail.fromName?.toLowerCase().includes(lowerQuery) ||
    mail.toName?.toLowerCase().includes(lowerQuery)
  );
};


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

  const recipient = to ? await User.findOne({ username: to }) : null;
  const time = new Date().toISOString()

  // Check if 'to' is a valid user, if it is keeps it in recipient
  //create mail
  const draftMail = {
    from: sender._id,
    to: recipient ? recipient._id : null,
    subject: subject || '',
    body: body || '',
    links: [],
    labels: [],
    time,
    fromName: sender.displayName,
    toName: recipient ? recipient.displayName : '',
    fromUserName: sender.username,
    toUserName: recipient ? recipient.username : '',
    fromPicture: sender.picture,
     isStarred: false
  }

  const draftLabel = await Label.findOne({ user: sender._id, name: 'Drafts' });
  if (!draftLabel) throw new Error('NO_DRAFT_LABEL')
  
  // Add mail to labels using external helper
  await addMailToLabel(draftLabel._id, draftMail._id);


  return draftMail
}

// Adds an existing mail to a user's label by label name.
// If the label is "Spam", the mail's links are added to the global blacklist.
const addLabelToMail = async (user, mailId, labelName) => {
  const mail = await Mail.findById(mailId);
  if (!mail) {
    throw new Error('MAIL_NOT_FOUND');
  }

  // If adding to Spam, attempt to blacklist all links
  if (labelName === 'Spam') {
    for (const link of mail.links) {
      await addUrlToBlacklist(link)
    }
  }

  addMailToUserLabel(user._id, mailId, labelName)
}


// Deletes a mail completely from user.mails and all labels.
// If deleted from "Spam", also removes its links from the blacklist.
const deleteMail = async (user, mailId) => {
  const mail = await Mail.findById(mailId);
  if (!mail) {
    throw new Error('MAIL_NOT_FOUND')
  }
  // If mail is in Spam, remove its links from the blacklist
  const spamLabel = await Label.findOne({ user: user._id, name: 'Spam', mails: mailId });
  if (spamLabel) {
    for (const link of mail.links) {
      try {
        await deleteUrlFromBlacklist(link);
      } catch (err) {
        console.warn(`Failed to delete link ${link}: ${err.message}`);
      }
    }
  }

  // Remove the mail from all labels
  await Label.updateMany({ user: user._id }, { $pull: { mails: mailId } });
  await Mail.findByIdAndDelete(mailId);
};

module.exports = { createMail, getMailsByLableWithOffset, searchMailsByQuery, createDraft, addLabelToMail, deleteMail }