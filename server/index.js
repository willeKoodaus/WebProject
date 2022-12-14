const dotenv = require('dotenv')
dotenv.config({ path: './env' })
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const recipeRoutes = require('./routes/recipes')
const userRoutes = require('./routes/user')

// express app
const app = express()

// middleware
app.use(express.json({limit: '10mb'}))
app.use(express.urlencoded({limit: '10mb'}));
app.use(cors())


app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/recipes', recipeRoutes)
app.use('/user', userRoutes)

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

// connect to db
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT || 3000)
    })
  })
  .catch((error) => {
    console.log(error)
  })