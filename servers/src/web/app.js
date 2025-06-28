const express = require('express')
const path = require('path');
const app = express();

app.use(express.json());

// // --- Serve React Build ---
const reactBuildPath = path.join(__dirname, '..', '..', '..', 'react-app', 'build');
app.use(express.static(reactBuildPath));

// --- NEW: Serve the permanent 'pictures' folder statically ---
// This allows the client to access final images via URLs like /pictures/user_123.jpg
app.use('/pictures', express.static(path.join(__dirname,  '..', '..', 'pictures')));

const userRoutes = require('./routes/users')
const mailRoutes = require('./routes/mails')
const tokenRoutes = require('./routes/tokens')
const labelRoutes = require('./routes/labels')
const blacklistRoutes = require('./routes/blacklist');

app.use('/api/mails', mailRoutes)
app.use('/api/users', userRoutes)
app.use('/api/tokens', tokenRoutes)
app.use('/api/labels', labelRoutes)
app.use('/api/blacklist', blacklistRoutes)

// React fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(reactBuildPath, 'index.html'));
});

app.listen(3000);

