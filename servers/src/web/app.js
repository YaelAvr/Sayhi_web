const express = require('express')
const path = require('path');
const app = express();

app.use(express.json());


// // --- Serve React Build ---
const reactBuildPath = path.join(__dirname, '..', '..', '..', 'react-app', 'build');
app.use(express.static(reactBuildPath));
// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });


const userRoutes = require('./routes/users')
const mailRoutes = require('./routes/mails')
const tokenRoutes = require('./routes/tokens')
const labelRoutes = require('./routes/labels')
const blacklistRoutes = require('./routes/blacklist');

// app.use(express.json())

app.use('/api/mails', mailRoutes)
app.use('/api/users', userRoutes)
app.use('/api/tokens', tokenRoutes)
app.use('/api/labels', labelRoutes)
app.use('/api/blacklist', blacklistRoutes)

// React fallback
app.get('/', (req, res) => {
  res.sendFile(path.join(reactBuildPath, 'index.html'));
});

/*
app.get('/*', (req, res) => {
  res.sendFile(path.join(reactBuildPath, 'index.html'));
});*/

// // --- Start server ---
// const PORT = 5000;
// app.listen(PORT, 

app.listen(3000, () => {
  console.log("Server running");
});

