const express = require('express')
const router = express.Router()
const Category = require('../models/category')

router.route('/').post(async (req, res) => {
    try {
        const catName = await Category.create({ ...req.body })
        await catName.save();
        res.status(200).json(catName)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}).get(async (req, res) => {
    try {
        const categories = await Category.find({}).select('-_id')
        res.status(200).json({ categories })
    } catch (err) {
        res.status(401).json({ error: err.message })
    }
})


module.exports = router;