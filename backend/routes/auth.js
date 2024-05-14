const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    const token = jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
    return token;
}

router.route('/register')
    .post(async (req, res) => {
        const { username, email, password } = req.body;
        try {
            const user = await User.signup(username, email, password)
            if (user) {
                await user.save()
                const token = createToken(user._id)
                return res.status(200).json({ user, token })
            }
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    })

router.route('/login')
    .post(async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.login(email, password);
            if (user) {
                const token = createToken(user._id)
                return res.status(200).json({ user, token })
            }
        } catch (error) {
            res.status(409).json({ error: error.message })
        }

    })

module.exports = router;