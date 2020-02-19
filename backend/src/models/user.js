const mongoose = require('mongoose')
const schema = mongoose.Schema
mongoose.promise = Promise

const userSchema = new schema({
    name : {type: String, unique: false},
    email : {type: String, unique: false},
    googleId : {type: String, unique: true},
    posts : [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}]
})

const user = mongoose.model('user', userSchema)
module.exports = user