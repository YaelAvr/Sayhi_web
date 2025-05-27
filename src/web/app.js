const express = require('express')
const app = express()

const userRoutes = require('./routes/users')
const mailRoutes = require('./routes/mails')

app.use(express.json())

app.use('/api/mails', mailRoutes)
app.use('/api/user', userRoutes)

app.listen(3000)

