const Tokens = require("../models/tokens");
const Store = require('../models/store');
const jwt = require("jsonwebtoken");

// The JWT secret key used to sign the tokens.
const JWT_SECRET = process.env.JWT_SECRET || "secret-key";

// this function checks if a user is registered by matching username and password
// and returns the user id if found, otherwise returns an error.
exports.isUserRegistered = (req, res) => {
    const { username, password } = req.body;
 
    if (!username || !password) { return res.status(400).json({ error: "Enter a password" }); }

    const user = Tokens.isUserRegistered(username, password);
    if (!user) return res.status(404).json({ error: 'Wrong password. Please try again.' });
       
    // Generate a JWT token for the user
    // The token contains the user id and username, and expires in 1 hour.
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "1h" }  );
    res
        .status(201)
        .json({token})
}
