const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    roomNumber: {
        type: String,
        required: true
    },
    seatNumber: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model('Room', roomSchema);