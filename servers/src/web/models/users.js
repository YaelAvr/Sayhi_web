const Users = require('./store');
const { createLabel } = require('./labels')
const multer = require("multer");

let userCount = 0;
const storage = multer.memoryStorage(); // Store files in memory


const createUser = (username, displayName, password, picture, gender, birthday) => {
    // Check if there is already a user with this username
    if(Users.find(user => user.username === username)) {
        return null //400
    }

    const newUser = {
        id: `u-${userCount++}`,
        username,
        displayName,
        password,
        picture,   
        gender, 
        birthday,
        mailCounter: 0,
        mails: [],
        labelCounter: 0,
        labels: [],
        isDarkMode: false
    }
    createDefaultLabels(newUser);
    Users.push(newUser);
    return newUser;
}

const getUserById = (id) => Users.find(user => user.id === id)

//Create default labels for each new user
const createDefaultLabels = (user) => {
    createLabel(user, 'Inbox' ,{ isDefault: true, allowAdd: false })
    createLabel(user, 'Starred',{ isDefault: true })
    createLabel(user, 'Sent', { isDefault: true, allowAdd: false })
    createLabel(user, 'Drafts', { isDefault: true, allowAdd: false })
    createLabel(user, 'Spam', { isDefault: true })
}

const isUserNameRegistered =(username) => {
    username = username.toLowerCase();
    return Users.find(user => user.username === username);
}

const toggleDarkMode = (id) => {
    const user = getUserById(id); 
    if (!user) {
        throw new Error("User not found");
        
    }
    const temp = user.isDarkMode; // Store the current state
    user.isDarkMode = !temp; // Toggle dark mode
    return user.isDarkMode; // Return the new dark mode state
}

module.exports = {
    createUser,
    getUserById,
    isUserNameRegistered,
    toggleDarkMode
}