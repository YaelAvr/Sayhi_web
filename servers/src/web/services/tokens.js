const Users = require("../models/users");
const jwt = require("jsonwebtoken");
// The JWT secret key used to sign the tokens.
const JWT_SECRET = process.env.JWT_SECRET || "secret-key";


// this function checks if a user is registered by matching username and password
// and returns the user object if found, otherwise returns undefined.
const isUserRegistered = async (username, password) => {
    const user = await Users.findOne({username});
    if (!user) {throw new Error("User not found");}
    
    if(user.password != password) {throw new Error('Wrong password. Please try again.');}
    return user;
}

const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, username: user.username },
    JWT_SECRET,
    { expiresIn: '2h' }
  );
};

const verifyToken =(token)=> { return jwt.verify(token, JWT_SECRET);}


module.exports = {isUserRegistered, generateToken, verifyToken }