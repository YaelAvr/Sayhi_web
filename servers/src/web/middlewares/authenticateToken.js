const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "secret-key";

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if(!authHeader) return res.status(400).json({ error: 'Missing token' })

  const token = authHeader?.split(' ')[1];

  if (!token) return  res.status(401).json({ error: 'Access token missing' });

  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
}

module.exports = authenticateToken;
