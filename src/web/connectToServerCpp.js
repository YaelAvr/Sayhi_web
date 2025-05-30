const net = require('net');

const SERVER_HOST = process.env.SERVER_HOST || 'server'
const SERVER_PORT = parseInt(process.env.SERVER_PORT || '8080',10)

function sendToCppServer(command) {
  return new Promise((resolve, reject) => {
    const client = new net.Socket();
    let response = '';

    client.connect(SERVER_PORT, SERVER_HOST, () => {
        console.log('Connected to server');
        console.log(command)
      client.write(command + '\n');
    });

    client.on('data', (data) => {
        console.log('Received data:', data.toString());
      response += data.toString();
    });

    client.on('end', () => {
        console.log('Server closed the connection');
      resolve(response.trim());
    });

    client.on('error', (err) => {
      reject(err);
    });
  });
}

module.exports = { sendToCppServer }