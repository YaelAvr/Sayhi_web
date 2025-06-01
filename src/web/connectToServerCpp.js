const net = require('net')

//Gets the values of server host and port from the environment variables in the docker compose
const SERVER_HOST = process.env.SERVER_HOST || 'server'
const SERVER_PORT = parseInt(process.env.SERVER_PORT || '8080',10)

//Connects the js server to the cpp server
function sendToCppServer(command) {
  return new Promise((resolve, reject) => {
    const client = new net.Socket()
    let response = ''

    client.connect(SERVER_PORT, SERVER_HOST, () => {
      client.write(command + '\n') //sends the command to the cpp server
    })

    client.on('data', (data) => {
      response += data.toString() //saves the data that the cpp server sent in response
    })

    client.on('end', () => { 
      resolve(response.trim()) //after the connection with the cpp server ends, it will work on the recived data
    })

    client.on('error', (err) => {
      reject(err)
    })
  })
}

module.exports = { sendToCppServer }