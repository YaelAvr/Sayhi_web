const path = require('path');
const multer = require("multer");
const Users = require("../models/users");

// This function creates a new user with the given parameters
exports.createUser = (req, res) => {
  const { username, displayName, password, picture, gender, birthday } = req.body;
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
    || !OLDisDateValid(birthday) || !passwordPattern.test(password)) {
    return res.status(400).json({ error: "One of the fildes are not valid" });
  }

  const lowUsername = username.trim().toLowerCase();
  const newUser = Users.createUser(lowUsername, displayName, password, picture, lowGender, birthday);
  if (newUser === null) {
    return res.status(400).json({ error: "This username is taken" });
  }
  res.status(201).location(`/api/users/${newUser.id}`).end();
};

// Create a Valid display name
exports.createName = (req, res) => {
  const { firstWord, secondWord } = req.body;

  if (!firstWord) {
    return res.status(400).json({ error: "Enter first name" });
  }
  const displayName = firstWord + " " + secondWord;
  res.status(200).json({ displayName: displayName });
};

// This function creates a new user with the given parameters
exports.createPassword = (req, res) => {
  const { password, confirm } = req.body;
  if (!password) {
    return res.status(400).json({ error: "Enter password" });
  }

  // const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  // Check if all the given parameters are valid
    if (password.trim().length < 8) {
    return res.status(400).json({ error: "Use 8 characters or more for your password" });
  }
  // if (!passwordPattern.test(password)) {
  //   return res.status(400).json({ error: "Use 8 characters or more for your password" });
  // }

  if (!confirm) {
    return res.status(400).json({ error: "Confirm your password" });
  }

  if (confirm !== password) {
    return res.status(400).json({ error: "Those passwords did not match. Try again." });
  }

  res.status(200).json({ password: password });
};


// this function generate a valid gender option
exports.createGender = (req, res) => {
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

//Create an only low cased userName that is 6-30 letters long.
// If the username that was provided included 'user-name@sayhi.com', only usr the first part.
exports.createUserName = (req, res) => {
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

  const user = Users.isUserNameRegistered(lowUsername)
  if (!user) {
    return res.status(200).json({ username: lowUsername });
  }
  res.status(404).json({ error: "That username is taken. Try another." });

};

// this function recives a potential birthday and return a valid print date or an error
exports.createBirthday = (req, res) => {
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
  // const dd = String(day).padStart(2, '0');

  const mm = monthNames[month - 1];
  return `${day} ${mm} ${year}`;
}


// this function returns the information of a specific user with the given id
exports.getUserById = (req, res) => {
  // Check if the user id matches the id in the request header
  const userHeader = req.user.id
  const userId = req.params.id

  if (req.params.id !== req.user.id) {
    return res.status(403).json({ error: "Unauthorized access" });
  }

  if (!userHeader || !userId || userHeader !== userId) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  const user = Users.getUserById(userId)
  if (!user) return res.status(404).json({ error: 'No user was found' })

  res
    .status(200)
    .json({
      id: user.id, username: user.username, displayName: user.displayName, picture: user.picture,
      gender: user.gender, birthday: user.birthday
    })
};

exports.isUserNameRegistered = (req, res) => {
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

  const user = Users.isUserNameRegistered(username)

  if (!user) { return res.status(404).json({ exists: false, error: 'Could not find your SayHi Account' }); }
  else {
    return res.status(200).json({ displayName: user.displayName });
  }
}



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

/*  This function checks if the date string is valid 
    and if it is in the format "DD.MM.YYYY".*/
function OLDisDateValid(dateString) {
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
    day === 0 || day > 31) {
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
