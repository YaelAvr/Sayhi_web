const express = require('express')
const app = express()

const mailRoutes = require('./routes/mails')

app.use(express.json())

app.use('/api/mails', mailRoutes)

app.listen(3000)
