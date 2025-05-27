const express = require('express')
const app = express()
const mailRoutes = require('./routes/mails')
app.use(express.json())

app.use('/api/mails', mailRoutes)

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});