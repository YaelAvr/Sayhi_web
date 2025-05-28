const net = require('net');
const SERVER_HOST = 'server'
const SERVER_PORT = 8080
async function isBlacklisted(link) {
  return new Promise((resolve, reject) => {
     let response = '';
     const client = new net.Socket();
     client.connect(SERVER_PORT, SERVER_HOST, () => {
      client.write(`GET ${link}\n`) // sends the get command to the c++ server
    })

    client.on('data', (data) => {
      response += data.toString();
    });

     client.on('end', () => {
      const trimmed = response.trim();
      const lines = trimmed.split('\n');
      const lastLine = lines[lines.length - 1].trim(); //get the information about the last line

      if (lastLine === 'true true') { // if the last line equals true true, the link is blacklisted
        resolve(true); 
      } else {
        resolve(false);
      }
    });

    client.on('error', (err) => {
      console.error('Error connecting server:', err);
      reject(err);
    });
  });
}


module.exports = { isBlacklisted }