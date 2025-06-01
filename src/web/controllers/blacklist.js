const { addUrlToBlacklist, deleteUrlFromBlacklist } = require('../models/blacklist')

//Add URL to blacklist 
exports.addUrlToBlacklist = async (req, res) => {
  const { link } = req.body
  if (!link) {
    // If the link is missing, return a 400 error
    return res.status(400).json({ error: 'Missing link in request body' })
  }

  try {
    const result = await addUrlToBlacklist(link);
    res.status(201).json({ message: 'Link added to blacklist', result })
  } catch (err) {
    // If the link is not valid, return a 400 error
    if (err.message === 'BAD_REQUEST_CPP_SERVER') {
    return res.status(400).json({ error: 'Bad Request' })
  }
    res.status(500).json({ error: err.message });
  }
}

//Delete URL from blacklist 
exports.deleteUrlFromBlacklist = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    // If the link is missing, return a 400 error
    return res.status(400).json({ error: 'Missing URL in the request' })
  }

  try {
    const result = await deleteUrlFromBlacklist(id)
    res.status(200).json({ message: 'Link removed from blacklist', result })
  } catch (err) {
    // If the link is not valid, return a 400 error
    if (err.message === 'BAD_REQUEST_CPP_SERVER') {
    return res.status(400).json({ error: 'Bad Request' })
  }
  if (err.message === 'URL_NOT_FOUND') {
    // If the link wasn't in the blacklist from the start, return a 404 error
    return res.status(404).json({ error: 'Not Found' })
  }
    res.status(500).json({ error: err.message })
  }
}