const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validator = require('validator')

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        default: "",
    },
}, {
    timestamps: true
})

userSchema.statics.signup = async function (username, email, password) {
    if (!username || !email || !password) {
        throw Error('Fields cannot be empty')
    }
    if (!validator.isEmail(email)) {
        throw Error('Invalid email address')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }
    const profile = await this.findOne({ email })
    if (profile) {
        throw Error('Email already in use')
    }
    const hash = await bcrypt.hash(password, 10);
    const user = this.create({ username, email, password: hash })
    return user;
}

userSchema.statics.login = async function (email, password) {
    let user;
    if (!email || !password) {
        throw Error('Fields cannot be empty')
    }
    user = await this.findOne({ email }).lean().exec()
    if (!user) {
        throw Error('Invalid login credentials')
    }
    const verified = await bcrypt.compare(password, user.password);
    if (!verified) {
        throw Error('Invalid login credentials')
    }
    user = await this.findOne({ email }).select('-password')
    return user;
}

const User = mongoose.model('User', userSchema)

module.exports = User;