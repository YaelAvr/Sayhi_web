const Users = require('./store');
let userCount = 0;

const createUser = (username, password, picture, gender, birthday) => {
    // Check if there is already a user with this username
    if(Users.find(user => user.username === username)) {
        return null //400
    }

    const newUser = {
        id: `u-${userCount++}`,
        username,
        password,
        picture,   
        gender, 
        birthday,
        mailCounter: 0,
        mails: [],
        labelCounter: 0,
        labels: []
    }
    Users.push(newUser);
    return newUser;
}

const getUserById = (id) => Users.find(user => user.id === id)

module.exports = {
    createUser,
    getUserById
}