const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }

})

module.exports = mongoose.model('Movie', movieSchema);