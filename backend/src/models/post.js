const mongoose = require('mongoose')
const schema = mongoose.Schema
mongoose.promise = Promise

const postSchema = new schema({
    title: { type: String, unique: false },
    description: { type: String, unique: false },
    location: { type: String, unique: false },
    numberOfPeople: { type: Number, unique: false },
    pricePerNight: { type: Number, unique: false },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    imageUrlList: [{
        type: String
    }]
})

const post = mongoose.model('post', postSchema)
module.exports = post