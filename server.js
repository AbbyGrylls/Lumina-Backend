require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bloomRoutes = require('./routes/blooms')
const userRoutes = require('./routes/user')
//const port = process.env.PORT
const cors = require('cors');
//const jwt = require('jsonwebtoken');

const app = express()

app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend URL
  }));
  

//routes
app.use('/api/blooms',bloomRoutes)
app.use('/api/user',userRoutes)
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('connected to db: listeneing on port number',process.env.PORT)
    })
})
.catch((error)=>{
    console.log(error)
})
process.env