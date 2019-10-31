const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    description: String

})

module.exports = mongoose.model('Movie', movieSchema);