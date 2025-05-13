const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}
//login user
const loginUser = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await User.login(username, password);

        //create token
        const token = createToken(user._id)
        //console.log(user.name)
        res.status(200).json({ username, token, name:user.name })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
//sign up
const signupUser = async (req, res) => {
    const { username, password,name } = req.body
    try {
        const user = await User.signup(username, password,name)

        //create token
        const token = createToken(user._id)

        res.status(200).json({ username, token,name })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
module.exports = { signupUser, loginUser }