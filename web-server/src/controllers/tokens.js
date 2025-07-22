const Tokens = require("../services/tokens");
const { getUserById } = require("../services/users");

// this function checks if a user is registered by matching username and password
// and returns the user id if found, otherwise returns an error.
exports.isUserRegistered = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) { return res.status(400).json({ error: "Enter a password" }); }

    try {
        const user = await Tokens.isUserRegistered(username, password);
        const token = Tokens.generateToken(user)

        // Generate a JWT token for the user
        // The token contains the user id and username, and expires in 1 hour.
        res
            .status(201)
            .json({ token })
    } catch (err) {
        if (err.message === "User not found" || err.message === "Incorrect password") {
            return res.status(401).json({ error: err.message });
        }
        res.status(500).json({ error: "Internal server error" });
    }
}

exports.verifyTokenUser = async (req, res) => {
    const user = await getUserById(req.user.id);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    // This route is protected by the authenticateToken middleware.
    // If the token is valid, req.user will be populated with the user info.
    res.status(200).json({ user: user });
}