const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Post = require('../models/post')

router.route('/')
    .get(async (req, res) => {
        const { username, catName } = req.query;
        let posts;
        try {
            if (username || catName) {
                posts = await Post.find({ author: username })
            } else if (catName) {
                posts = await Post.find({ categories: { $in: [catName] } })
            } else {
                posts = await Post.find({}).lean().exec()
            }
            res.status(200).json(posts)
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    })
    .post(async (req, res) => {
        const post = await Post.create({ ...req.body })
        try {
            await post.save()
            res.status(200).json(post)
        } catch (err) {
            res.status(401).json({ error: err.message })
        }
    })

router.route('/:id')
    .get(async (req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json('Invalid ID')
        }
        try {
            const post = await Post.findById(id)
            if (!post) {
                return res.status(400).json({ error: 'Post not found' })
            }
            res.status(200).json(post)
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    })
    .patch(async (req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json('Invalid ID')
        }
        try {
            const post = await Post.findById(id)
            if (!post) {
                return res.status(400).json({ error: 'Post not found' })
            }
            const updatePost = await Post.findByIdAndUpdate(id, { ...req.body }, { new: true })
            res.status(200).json(updatePost)
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    })
    .delete(async (req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json('Invalid ID')
        }
        try {
            const post = await Post.findByIdAndDelete(id)
            res.status(200).json(post)
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    })

module.exports = router;