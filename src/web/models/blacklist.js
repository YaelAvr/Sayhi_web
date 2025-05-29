const { sendToCppServer } = require('../connectToServerCpp');

const addUrlToBlacklist = async (link) => {
  const res = await sendToCppServer(`POST ${link}`)
    if (res.includes('400')) {
    throw new Error('BAD_REQUEST_CPP_SERVER')
  }

  if (!res.includes('201')) {
    throw new Error(`Unexpected response when adding: ${res}`)
  }
  return res;
}

const deleteUrlFromBlacklist = async (id) => {
  const res = await sendToCppServer(`DELETE ${id}`);
   if (res.includes('404')) {
    throw new Error('URL_NOT_FOUND')
  }
  if (res.includes('400')) {
    throw new Error('BAD_REQUEST_CPP_SERVER')
  }
  if (!res.includes('204')) {
    throw new Error(`Unexpected response when deleting: ${res}`);
  }
  return res;
}

const isBlacklisted = async (link) => {
  const res = await sendToCppServer(`GET ${link}`);
  const lines = res.split('\n');
  const lastLine = lines[lines.length - 1].trim();
  return lastLine === 'true true';
}

module.exports = {
  addUrlToBlacklist,
  deleteUrlFromBlacklist,
  isBlacklisted,
};