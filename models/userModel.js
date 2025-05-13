const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true,
        /* validate: {
          validator: function (v) {
            // Alphanumeric validation (e.g., ABC123)
            return /^[a-zA-Z0-9]+$/.test(v);
          },
          message: (props) => `${props.value} is not a valid idea USERNAME! Must be alphanumeric.`,
        }, */
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true
    }
});
//static signup method
userSchema.statics.signup = async function (username, password,name) {

    //validator
    if (!username || !password) {
        throw Error('All fields must be filled')
    }
    if (!validator.isLength(username, { min: 3, max: 15 })) {
         throw Error( 'Username must be between 3 and 15 characters.');
      }
      if (!validator.isLength(name, { min: 3, max: 15 })) {
          throw Error('Nick-name must be between 3 and 12 characters.');
      }
    if (!validator.isAlphanumeric(username)) {
        throw Error('Username should be Alphanumeric')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough')
    }

    const exists = await this.findOne({ username })//when this is used, we have to use a regular function instead of arrow
    if (exists) {
        throw Error('Username already taken')
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({ username, password: hash,name })
    return user
}

//static login method
userSchema.statics.login = async function (username, password) {
    if (!username || !password) {
        throw Error('All fields must be filled')
    }
    const user = await this.findOne({ username })//when this is used, we have to use a regular function instead of arrow
    if (!user) {
        throw Error('Invalid Login Credentials')
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Invalid Login Credentials')
    }
    return user
}

// Create the user model
const User = mongoose.model('User', userSchema);

module.exports = User;
