const path = require('path');
const multer = require("multer");
const Users = require("../models/users");

// This function creates a new user with the given parameters
exports.createUser = (req, res) => {
    const { username, displayName, password , picture, gender, birthday } = req.body;
    const genderOptions = ["female", "male", "other"];

    if (!username) {
     return res.status(400).json({ error: "Username is required" });
    }
    if (!displayName) {
     return res.status(400).json({ error: "Display Name is required" });
    }
    if (!password) {
     return res.status(400).json({ error: "Password is required" });
    }
    if (!gender) {
     return res.status(400).json({ error: "Gender is required" });
    }
    if (!birthday) {
     return res.status(400).json({ error: "Birthday is required" });
    }
    if (!picture) {
     return res.status(400).json({ error: "Picture is required" });
    }
   
    const lowGender = gender.trim().toLowerCase();
    // Check if the picture is a valid image file
    const imagePattern = /\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i; 
    // The password must be at least 8 characters long, 
    // contain at least one uppercase letter and one lowercase letter
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    // Check if all the given parameters are valid
    if (!genderOptions.includes(lowGender) || (!imagePattern.test(picture)) 
        || !isDateValid(birthday) || !passwordPattern.test(password)) {
      return res.status(400).json({ error: "One of the fildes are not valid" });
    }

    const newUser = Users.createUser(username, password, picture, lowGender, birthday);
    if (newUser === null) {
        return res.status(400).json({ error: "This username is taken" });
    }
    res.status(201).location(`/api/users/${newUser.id}`).end();
};

// this function returns the information of a specific user with the given id
exports.getUserById = (req, res) => {
    // Check if the user id matches the id in the request header
    const userHeader = req.headers['x-user-id']
    const userId = req.params.id

    if (!userHeader || !userId || userHeader !== userId ) {
        return res.status(400).json({ error: 'All fields are required' })
    }

    const user = Users.getUserById(userId)
    if (!user) return res.status(404).json({ error: 'No user was found' })
        
    res
        .status(200)
        .json({id: user.id, username: user.username, picture: user.picture,
                gender: user.gender, birthday: user.birthday})
};


/*  This function checks if the date string is valid 
    and if it is in the format "DD.MM.YYYY".*/
function isDateValid(dateString) {
  // Check if the string is an optional date
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return false;
  }

  // Check if the date is of the format "DD.MM.YYYY"
  const regex = /^\d{1,2}\.\d{1,2}\.\d{4}$/;
  if (!regex.test(dateString)) {
    return false; // Format is incorrect
  }

  const parts = dateString.split(".");
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10); 
  const year = parseInt(parts[2], 10);

  //  Basic range checks
  if (year < 1000 || year > 3000 ||
    month === 0 || month > 12 ||
    day === 0 || day > 31 ) {
    return false;
  }

  // Create a Date object. of the input components
  const dateObj = new Date(year, month - 1, day);

  // Check if the object construction was successful
  if (!(!isNaN(dateObj.getTime()) && dateObj.getFullYear() === year &&
      dateObj.getMonth() === month - 1 && dateObj.getDate() === day)) {
    return false;
  }

  // Get today's date and check if the "birthday" is a past date
  const today = new Date();
  if (dateObj >= today) {
    return false;
  }

  return true;
}


function isPicValid(picture) {
    const imagePattern = /\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i; 

  return (
    picture.toLowerCase().endsWith('.png') ||
    picture.toLowerCase().endsWith('.jpg') ||
    picture.toLowerCase().endsWith('.jpeg') ||
    picture.toLowerCase().endsWith('.gif') ||
    picture.toLowerCase().endsWith('.bmp') ||
    picture.toLowerCase().endsWith('.webp')
  );
  
}

// function isImage(picture) {
//     const ext = path.extname(picture).toLowerCase();
//     return ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'].includes(ext);
// }
