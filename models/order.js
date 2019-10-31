const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        userName: String,
        movieId: {
            type: Schema.Types.ObjectId,
            ref: 'Movie',
            required: true
        },
        movieTitle: String,
        roomId: {
            type: Schema.Types.ObjectId,
            ref: 'Room',
            required: false
        },
        room: String,
        validTime: String,
        isPaid: Boolean
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);