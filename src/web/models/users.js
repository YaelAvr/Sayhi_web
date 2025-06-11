const Users = require('./store');
const { createLabel } = require('./labels')
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
    createDefaultLabels(newUser);
    Users.push(newUser);
    return newUser;
}

const getUserById = (id) => Users.find(user => user.id === id)

//Create default labels for each new user
const createDefaultLabels = (user) => {
    createLabel(user, 'Inbox' ,{ isDefault: true, allowAdd: false })
    createLabel(user, 'starred',{ isDefault: true })
    createLabel(user, 'Sent', { isDefault: true, allowAdd: false })
    createLabel(user, 'Drafts', { isDefault: true, allowAdd: false })
    createLabel(user, 'Spam', { isDefault: true })
}

module.exports = {
    createUser,
    getUserById
}