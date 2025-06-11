const Tokens = require("../models/tokens");
const Store = require('../models/store')

// this function checks if a user is registered by matching username and password
// and returns the user id if found, otherwise returns an error.
exports.isUserRegistered = (req, res) => {
    const { username, password } = req.body;
 
    if (!username || !password) { return res.status(400).json({ error: "Bad Request" }); }

    const user = Tokens.isUserRegistered(username, password);
    if (!user) return res.status(404).json({ error: 'Not Found' });
        
    res
        .status(200)
        .json({id:user.id})

}
