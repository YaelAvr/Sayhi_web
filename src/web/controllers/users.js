const Users = require("../models/users");

exports.createUser = (req, res) => {
    const { username, picture, gender, birthday } = req.body;
    const genderOptions = ["female", "male", "other"];

    if (!username || !gender || !birthday) {
    return res.status(400).json({ error: "Bad Request" });
    }

    // Check if all the given parameters are valid
    const lowGender = gender.trim().toLowerCase();
    const imagePattern = /\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i; 
    if (!genderOptions.includes(lowGender) || (!(picture === undefined) && !imagePattern.test(picture)) 
        || !isDateValid(birthday)) {
      return res.status(400).json({ error: "Bad Request" });
    }

    const newUser = Users.createUser(username, picture, gender, birthday);
    if (newUser === null) {
    return res.status(400).json({ error: "Bad Request" });
    }
    res.status(201).location(`/api/users/${newUser.id}`).end();
};

exports.getUserById = (req, res) => {};


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
  const month = parseInt(parts[1], 10); // Month is 1-based in input
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


