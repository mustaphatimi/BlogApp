const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user')
const Post = require('../models/post')
const bcrypt = require('bcrypt');
const validator = require('validator')

router.route('/').get(async (req, res) => {
    try {
        const users = await User.find({}).select('-password').lean().exec()
        res.status(200).json(users)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

router.route('/:id')
    .get(async (req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json('Invalid user ID')
        }
        try {
            const user = await User.findById(id).select('-password')
            res.status(200).json(user)
        } catch (err) {
            res.status(409).json('User not found')
        }
    })
    .patch(async (req, res) => {
        const { email, username, password } = req.body;
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json('Invalid ID')
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json('Password too weak')
        }
        const hash = await bcrypt.hash(password, 10)
        try {
            const user = await User.findByIdAndUpdate(id, { username, email, password: hash }, { new: true })
            res.status(200).json(user)
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    })
    .delete(async (req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json('Invalid ID')
        }
        try {
            const user = await User.findById(id).lean().exec()
            await Post.deleteMany({ author: user.username })
            await User.findByIdAndDelete(id)
            res.status(200).json(`User ${user.username} deleted!`)

        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    })



module.exports = router;