const Tokens = require("../models/tokens");
const Store = require('../models/store');
const jwt = require("jsonwebtoken");

// The JWT secret key used to sign the tokens.
const JWT_SECRET = process.env.JWT_SECRET || "secret-key";

// this function checks if a user is registered by matching username and password
// and returns the user id if found, otherwise returns an error.
exports.isUserRegistered = (req, res) => {
    const { username, password } = req.body;
 
    if (!username || !password) { return res.status(400).json({ error: "Bad Request" }); }

    const user = Tokens.isUserRegistered(username, password);
    if (!user) return res.status(404).json({ error: 'Not Found' });
       
    // Generate a JWT token for the user
    // The token contains the user id and username, and expires in 1 hour.
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "1h" }  );
    res
        .status(201)
        .json({token})
}

// exports.isLoggedIn = (req, res, next) => {
//   if (req.headers.authorization) {
//     const token = req.headers.authorization.split(" ")[1];
//     try {
//       const data = jwt.verify(token, key);
//     //   console.log("The logged in user is: " + data.username);
//       return next();
//     } catch (err) {
//       return res.status(401).send("Invalid Token");
//     }
//   } else return res.status(403).send("Token required");
// };

