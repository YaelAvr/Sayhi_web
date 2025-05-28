const express = require('express')
const app = express()
const userRoutes = require('./routes/users')

app.use(express.json())
app.use('/api/users', userRoutes)


// הפעלת השרת על פורט 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});