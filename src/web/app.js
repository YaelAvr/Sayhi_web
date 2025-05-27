const express = require('express')
const app = express()
const userRoutes = require('./routes/users')

app.use(express.json())
app.use('/api/user', userRoutes)

app.listen(3000)