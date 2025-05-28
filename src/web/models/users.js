const User = require('./store');
let userCount = 0;

const createUser = (username, picture, gender, birthday) => {
    // Check if there is already a user with this username
    if(User.find(user => user.username === username)) {
        return null //400
    }

    const newUser = {
        id: `u-${++userCount}`,
        username,
        picture,   
        gender, 
        birthday,
        mailCounter: 0,
        mail: [],
        lableCounter: 0,
        lable: []
    }
    User.push(newUser);
    return newUser;
}

const getUserById = (id) => {}

module.exports = {
    createUser,
    getUserById
}