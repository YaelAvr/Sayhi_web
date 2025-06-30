const { sendToCppServer } = require('../connectToServerCpp')

//Add URL to blacklist 
const addUrlToBlacklist = async (link) => {
  const res = await sendToCppServer(`POST ${link}`) //sends the post command to the cpp server
 if (res.includes('400')) {
    // If the link is not valid, return a 400 error
    throw new Error('BAD_REQUEST_CPP_SERVER')
  }

  if (!res.includes('201')) {
    throw new Error(`Unexpected response when adding: ${res}`)
  }
  return res
}

//Delete URL from blacklist 
const deleteUrlFromBlacklist = async (id) => {
  const res = await sendToCppServer(`DELETE ${id}`) //sends the delete command to the cpp server
   if (res.includes('404')) {
    // If the link wasn't in the blacklist from the start, return a 404 error
    throw new Error('URL_NOT_FOUND')
  }
  if (res.includes('400')) {
    // If the link is not valid, return a 400 error
    throw new Error('BAD_REQUEST_CPP_SERVER')
  }
  if (!res.includes('204')) {
    throw new Error(`Unexpected response when deleting: ${res}`)
  }
  return res
}

const isBlacklisted = async (link) => {
  const res = await sendToCppServer(`GET ${link}`) //sends the get command to the cpp server
  const lines = res.split('\n')
  const lastLine = lines[lines.length - 1].trim() //get the last line from the recived data
  return lastLine === 'true true' //if last line equals to true true, the URL is blacklisted
}

module.exports = {
  addUrlToBlacklist,
  deleteUrlFromBlacklist,
  isBlacklisted,
}