const { createLabel } = require('./labels')
const fs = require('fs').promises;
const path = require('path');
const multer = require("multer");
const User = require("../models/users");

const PIC_FOLDER = "pictures"


const createUser = async (username, displayName, password, picture, gender, birthday) => {
  // Check if there is already a user with this username
  if (await User.findOne({ username: username })) {
    await fs.unlink(path.resolve(picture))  // Delete the temporary file
    throw new Error("This username is taken");
  }

  // We pass `null` for the picture initially, because we don't know the final path.
  const newUser = new User({
    username,
    displayName,
    password,
    picture: null,
    gender,
    birthday
  });
  await newUser.save();

  //  const finalImagePath =
  newUser.picture = await uplodePic(picture, newUser._id);
  await newUser.save();
  await createDefaultLabels(newUser);

  return newUser;
}


const getUserById = async (id) => {return await User.findById(id);}

//Create default labels for each new user
const createDefaultLabels = async (userId) => {
  const defaults_add = ['Spam', 'Starred'];
  const defaults_noAdd = ['Inbox', 'Sent', 'Drafts'];

  for (const name of defaults_add) {
    await createLabel(userId , name, { isDefault: true, allowAdd: false })
  }
  for (const name of defaults_noAdd) {
    await createLabel(userId , name, { isDefault: true, allowAdd: false })
  }
  // createLabel(user, 'Inbox', { isDefault: true, allowAdd: false })
  // createLabel(user, 'Starred', { isDefault: true })
  // createLabel(user, 'Sent', { isDefault: true, allowAdd: false })
  // createLabel(user, 'Drafts', { isDefault: true, allowAdd: false })
  // createLabel(user, 'Spam', { isDefault: true })
}

const isUserNameRegistered = async (username) => {
  return await User.findOne({username});
}

const toggleDarkMode = async (id) => {
  const user = await getUserById(id);
  if (!user) {
    throw new Error("User not found");

  }
  const temp = user.isDarkMode; // Store the current state
  user.isDarkMode = !temp; // Toggle dark mode
  await user.save();
  return user.isDarkMode; // Return the new dark mode state
}

const uplodePic = async (picture, userId) => {
  try {
    const sourcePath = path.resolve(picture); // Gets the absolute path of the picture in the tempUploads folder
    const fileExtension = path.extname(picture); //Gets the file extension: .jpg\.png\...


    // const newUserId = newUser.id;
    const finalFileName = `${userId}${fileExtension}`; // The final file name will be the user id with the original file extension 
    const destinationPath = path.resolve(PIC_FOLDER, finalFileName); // The final path where the picture will be stored

    // Replace fs.rename with fs.copyFile and fs.unlink
    await fs.copyFile(sourcePath, destinationPath); // Copy the file to the new location
    await fs.unlink(sourcePath); // Delete the original file from the temp directory

    //  Update the user object with the final, permanent picture path.
    const finalImagePath = `${PIC_FOLDER}/${finalFileName}`;
    return finalImagePath;
    // res.status(201).location(`/api/users/${newUser.id}`).end();

  } catch (error) {
    // This catches errors from fs.rename or fs.unlink
    console.error('Server error during user registration:', error);

    // Attempt to clean up the temp file if it still exists
    if (picture) {
      try { await fs.unlink(path.resolve(picture)); } catch (e) { /* ignore cleanup error */ }
    }
    User.deleteOne({id})
    throw new Error('An internal server error occurred.');

  }
}



module.exports = {
  createUser,
  getUserById,
  isUserNameRegistered,
  toggleDarkMode
}