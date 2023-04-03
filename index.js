const express = require('express')
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler')
const userRouter = require('./routes/v1/user.route')
require('dotenv').config
const app = express()
const port = process.env.PORT || 5000

//middlewares
app.use(cors())
app.use(express.json())

//Routes
app.use('/api/v1/user', userRouter)


app.get('/', (req,res)=>{
    res.send("Hello random users")
})

app.all('*', (req,res)=>{
    res.send('No route found')
  })
app.use(errorHandler)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });