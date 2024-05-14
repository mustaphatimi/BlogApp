const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: false,
    },
    author: {
        type: String,
        required: true,
    },
    categories: {
        type: Array,
        required: false,
    },

}, {
    timestamps: true
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post;