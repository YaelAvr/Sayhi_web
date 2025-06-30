const fs = require('fs').promises;
const path = require('path');
const multer = require("multer");
const Users = require("../services/users");


// This function creates a new user with the given parameters
exports.createUser = async (req, res) => {
  const { username, displayName, password, picture, gender, birthday } = req.body;
  let missingVal = [];
  if (!picture) {
    missingVal.push("Picture")
    // return res.status(400).json({ error: "Picture is required" });
  }
  if (!username) {
    missingVal.push("Username")

    // return res.status(400).json({ error: "Username is required" });
  }
  if (!displayName) {
    missingVal.push("Display Name")
  }
  if (!password) {
    missingVal.push("Password")
  }
  if (!gender) {
    missingVal.push("Gender")
  }
  if (!birthday) {
    missingVal.push("Birthday")
  }

  if (missingVal.length > 0) {
    if(!missingVal.includes("Picture")){  try { await fs.unlink(path.resolve(picture)); } catch (e) {}}
    return res.status(400).json({ error: "Missig: " + missingVal.join(", ") });
    // throw new Error("Missig: " + missingVal.join(", "));
  }

  try {
     const newUser = await Users.createUser(username, displayName, password, picture, gender, birthday);
     res.status(201).location(`/api/users/${newUser._id}`).end();
  } catch (error) {
    // This catches errors from fs.rename or fs.unlink
    console.error('Server error during user registration:', error);

    // Attempt to clean up the temp file if it still exists
    if (picture) {
      try { await fs.unlink(path.resolve(picture)); } catch (e) { /* ignore cleanup error */ }
    }

    res.status(400).json({ error: err.message });
  }


  // try {
  //   const sourcePath = path.resolve(picture); // Gets the absolute path of the picture in the tempUploads folder
  //   const fileExtension = path.extname(picture); //Gets the file extension: .jpg\.png\...

  //   // We pass `null` for the picture initially, because we don't know the final path.
  //   const newUser = Users.createUser(username, displayName, password, null, gender, birthday);
  //   if (!newUser) { // the username was taken.
  //     await fs.unlink(sourcePath);  // Delete the temporary file
  //     return res.status(400).json({ error: "This username is taken" });
  //   }
  //   const newUserId = newUser.id;
  //   const finalFileName = `${newUserId}${fileExtension}`; // The final file name will be the user id with the original file extension 
  //   const destinationPath = path.resolve('pictures', finalFileName); // The final path where the picture will be stored

  //   // Replace fs.rename with fs.copyFile and fs.unlink
  //   await fs.copyFile(sourcePath, destinationPath); // Copy the file to the new location
  //   await fs.unlink(sourcePath); // Delete the original file from the temp directory

  //   //  Update the user object with the final, permanent picture path.
  //   const finalImagePath = `pictures/${finalFileName}`;
  //   newUser.picture = finalImagePath;
  //   res.status(201).location(`/api/users/${newUser.id}`).end();

  // } catch (error) {
  //   // This catches errors from fs.rename or fs.unlink
  //   console.error('Server error during user registration:', error);

  //   // Attempt to clean up the temp file if it still exists
  //   if (picture) {
  //     try { await fs.unlink(path.resolve(picture)); } catch (e) { /* ignore cleanup error */ }
  //   }

  //   res.status(500).json({ message: 'An internal server error occurred.' });
  // }
};

// Create a Valid display name
exports.validateDisplayName = (req, res) => {
  const { firstWord, secondWord } = req.body;

  if (!firstWord) {
    return res.status(400).json({ error: "Enter first name" });
  }
  let displayName = firstWord;
  if (secondWord !== "") {
    displayName += " " + secondWord;
  }
  res.status(200).json({ displayName: displayName });
};

// This function creates a new user with the given parameters
exports.validatePassword = (req, res) => {
  const { password, confirm } = req.body;
  if (!password) {
    return res.status(400).json({ error: "Enter password" });
  }

  // Check if all the given parameters are valid
  if (password.trim().length < 8) {
    return res.status(400).json({ error: "Use 8 characters or more for your password" });
  }

  if (!confirm) {
    return res.status(400).json({ error: "Confirm your password" });
  }

  if (confirm !== password) {
    return res.status(400).json({ error: "Those passwords did not match. Try again." });
  }

  res.status(200).json({ password: password });
};


// this function generate a valid gender option
exports.validateGender = (req, res) => {
  const { gender } = req.body;

  const genderOptions = ["female", "male", "other"];

  if (!gender) {
    return res.status(400).json({ error: "Please select your gender" });
  }

  const lowGender = gender.trim().toLowerCase();

  // // Check if all the given parameters are valid
  if (!genderOptions.includes(lowGender)) {
    return res.status(400).json({ error: "Please select your gender" });
  }

  res.status(200).json({ gender: lowGender });
};

//validate a given username if it's only low cased and is 6-30 letters long.
// If the username that was provided included 'user-name@sayhi.com', only usr the first part.
exports.validateUserName = async (req, res) => {
  const { username } = req.body;
  let regex = /^[a-zA-Z0-9.]+$/;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  var lowUsername = username.toLowerCase();

  if (lowUsername.endsWith("@sayhi.com")) {
    let splitParts = lowUsername.split('@');
    if (splitParts.length === 2) {
      lowUsername = splitParts[0];
    } else {
      return res.status(400).json({ error: "Sorry, your username must only include letters, numbers & periods." });
    }
  }

  if (!regex.test(lowUsername)) {
    return res.status(400).json({ error: "Sorry, your username must only include letters, numbers & periods." });
  }

  if (lowUsername.length < 6 || lowUsername.length > 30) return res.status(400).json({ error: "Sorry, your username must be between 6 and 30 characters long." });

  const user = await Users.isUserNameRegistered(lowUsername)
  
  if (!user) {
    return res.status(200).json({ username: lowUsername });
  }
  res.status(404).json({ error: "That username is taken. Try another." });

};

// this function recives a potential birthday and return a valid print date or an error
exports.validateBirthday = (req, res) => {
  const { day, month, year } = req.body;

  if (!day || !month || !year) {
    return res.status(400).json({ error: "Please fill in a complete birthday" });
  }

  // Check if all the given parameters are valid
  if (!isDateValid(day, month, year)) {
    return res.status(400).json({ error: "Please enter a valid date" });
  }

  const birthday = formatDateWithMonthName(day, month, year);

  res.status(200).json({ birthday: birthday });
};

function formatDateWithMonthName(day, month, year) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const mm = monthNames[month - 1];
  return `${day} ${mm} ${year}`;
}

//This function checks if the date string is valid 
function isDateValid(day, month, year) {
  const intDay = parseInt(day);
  const intMonth = parseInt(month);
  const intYear = parseInt(year);
  //  Basic range checks
  if (intYear < 1000 || intYear > 3000 ||
    intMonth <= 0 || intMonth > 12 ||
    intDay <= 0 || intDay > 31) {
    return false;
  }

  const dateObj = new Date(intYear, intMonth - 1, intDay);
  // Check if the object construction was successful
  if (!(!isNaN(dateObj) && dateObj.getFullYear() === intYear &&
    dateObj.getMonth() === intMonth - 1 && dateObj.getDate() === intDay)) {
    return false;
  }

  // Get today's date and check if the "birthday" is a past date
  const today = new Date();
  if (dateObj >= today) {
    return false;
  }

  return true;
}

exports.validatePicture = (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "No file uploaded or file type is invalid." });
  }

  res.status(200).json({
    tempImageUrl: req.file.path // e.g., 'tempUploads/u-0.jpg'
  });
}


// this function returns the information of a specific user with the given id
exports.getUserById = async (req, res) => {
  // Check if the user id matches the id in the request header
  const userHeader = req.user.id
  const userId = req.params.id

  if (req.params.id !== req.user.id) {
    return res.status(403).json({ error: "Unauthorized access" });
  }

  if (!userHeader || !userId || userHeader !== userId) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  const user = await Users.getUserById(userId)
  if (!user) return res.status(404).json({ error: 'No user was found' })

  res
    .status(200)
    .json({
      id: user.id, username: user.username, displayName: user.displayName, picture: user.picture,
      gender: user.gender, birthday: user.birthday
    })
};

exports.isUserNameRegistered = async (req, res) => {
  const username = req.params.username

  if (!username) return res.status(400).json({ error: "Enter an email" });

  var lowUsername = username.toLowerCase();

  if (lowUsername.endsWith("@sayhi.com")) {
    let splitParts = lowUsername.split('@');
    if (splitParts.length === 2) {
      lowUsername = splitParts[0];
    } else {
      return res.status(400).json({ error: "Invalid username." });
    }
  }

  const user = await Users.isUserNameRegistered(lowUsername)

  if (!user) { return res.status(404).json({ exists: false, error: 'Could not find your SayHi Account' }); }
  else {
    return res.status(200).json({ displayName: user.displayName, username: user.username });
  }
}

exports.getUserDarkMode = async (req, res) => {
  // Check if the user id matches the id in the request header
  const userHeader = req.user.id
  const userId = req.params.id

  if (req.params.id !== req.user.id) {
    return res.status(403).json({ error: "Unauthorized access" });
  }

  if (!userHeader || !userId || userHeader !== userId) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  const user = await Users.getUserById(userId)
  if (!user) return res.status(404).json({ error: 'No user was found' })


  res
    .status(200)
    .json({ isDarkMode: user.isDarkMode })
}

exports.toggleDarkMode = (req, res) => {
  // Check if the user id matches the id in the request header
  const userHeader = req.user.id
  const userId = req.params.id

  if (userHeader !== userId) {
    return res.status(403).json({ error: "Unauthorized access" });
  }

  if (!userHeader || !userId || userHeader !== userId) {
    return res.status(400).json({ error: 'All fields are required' })
  }
  try {
    const userIsDarkMode = Users.toggleDarkMode(userId)
    res
      .status(200)
      .json({ isDarkMode: userIsDarkMode })
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
}