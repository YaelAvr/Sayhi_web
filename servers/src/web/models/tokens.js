const Users = require('./store');

// this function checks if a user is registered by matching username and password
// and returns the user object if found, otherwise returns undefined.
const isUserRegistered = (username, password) => {
    return Users.find(user => user.username === username && user.password === password);
}

module.exports = {isUserRegistered}