const express = require('express')

const {signupUser, loginUser} = require ('../controllers/userController')
const router = express.Router()

//login Route
router.post('/login',loginUser)

//signup route
router.post('/signup',signupUser)

module.exports= router