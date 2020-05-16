const mongoose = require('mongoose')
const schema = mongoose.Schema
mongoose.promise = Promise

const reservationSchema = new schema({
    dateStart: {type: Date},
    dateEnd: {type: Date},
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'post' },
})

const reservation = mongoose.model('reservation', reservationSchema)
module.exports = reservation