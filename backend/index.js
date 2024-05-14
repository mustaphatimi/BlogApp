require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth')
const postRoutes = require('./routes/posts')
const userRoutes = require('./routes/user')
const catRoutes = require('./routes/categories')
const path = require('path')
const multer = require('multer')
// const { storage } = require('./cloudinary')
// const upload = multer({ storage })
const app = express()

const port = process.env.PORT || 3500;
const dbUrl = process.env.ATLAS_URI || 'mongodb://localhost:27017/mernblogDB';

app.use(express.json())
app.use(cors())
app.use('/images', express.static(path.join(__dirname, 'images')))

const storage = multer.diskStorage({
    destination: (req, file, callb) => {
        callb(null, 'images')
    },
    filename: (req, file, callb) => {
        callb(null, 'file.png')
    }
})

const upload = multer({ storage })


mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log('Connected to MongoDB'))
    .catch((err) => console.log(err))

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    app.listen(port, () => {
        console.log(`Listening on port: ${port}`)
    })
})



app.post('/upload', upload.single('file'), (req, res) => {
    return res.status(200).json('File successfully uploaded!')
})
app.use('/auth', authRoutes)
app.use('/post', postRoutes)
app.use('/user', userRoutes)
app.use('/category', catRoutes)



// module.exports = fn => {
//     return (req, res, next) => {
//         fn(req,res,next).catch(e=> console.log(e))
//     }
// }




