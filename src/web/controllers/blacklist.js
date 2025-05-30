const { addUrlToBlacklist, deleteUrlFromBlacklist } = require('../models/blacklist');

exports.addUrlToBlacklist = async (req, res) => {
  const { link } = req.body;
  if (!link) {
    return res.status(400).json({ error: 'Missing link in request body' });
  }

  try {
    const result = await addUrlToBlacklist(link);
    res.status(201).json({ message: 'Link added to blacklist', result });
  } catch (err) {
    if (err.message === 'BAD_REQUEST_CPP_SERVER') {
    return res.status(400).json({ error: 'Bad Request' });
  }
    res.status(500).json({ error: err.message });
  }
}

// DELETE /api/blacklist/:id
exports.deleteUrlFromBlacklist = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: 'Missing ID in request URL' });
  }

  try {
    const result = await deleteUrlFromBlacklist(id);
    res.status(200).json({ message: 'Link removed from blacklist', result });
  } catch (err) {
    if (err.message === 'BAD_REQUEST_CPP_SERVER') {
    return res.status(400).json({ error: 'Bad Request' });
  }
  if (err.message === 'URL_NOT_FOUND') {
    return res.status(404).json({ error: 'Not Found' });
  }
    res.status(500).json({ error: err.message });
  }
}

// module.exports = {
//   addUrlToBlacklist,
//   deleteUrlFromBlacklist,
// };