const express = require('express')
const app = express()

const userRoutes = require('./routes/users')
const mailRoutes = require('./routes/mails')
const tokenRoutes = require('./routes/tokens')

app.use(express.json())

app.use('/api/mails', mailRoutes)
app.use('/api/users', userRoutes)
app.use('/api/tokens', tokenRoutes)

app.listen(3000)
