const express = require('express')
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });


app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the permanent 'pictures' folder statically ---
// This allows the client to access final images via URLs like /pictures/user_123.jpg
app.use('/pictures', express.static(path.join(__dirname, '..',  'pictures')));

const connectDB = require('./db')
connectDB()

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

const PORT = process.env.WEB_PORT || 3000;
const HOST = process.env.WEB_HOST || '0.0.0.0';

// app.listen(4000);
app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});

