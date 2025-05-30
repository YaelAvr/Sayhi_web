const express = require('express')
const app = express()

const userRoutes = require('./routes/users')
const mailRoutes = require('./routes/mails')
const tokenRoutes = require('./routes/tokens')
const blacklistRoutes = require('./routes/blacklist');

app.use(express.json())

app.use('/api/mails', mailRoutes)
app.use('/api/users', userRoutes)
app.use('/api/tokens', tokenRoutes)
app.use('/api/blacklist', blacklistRoutes)

app.listen(3000)
