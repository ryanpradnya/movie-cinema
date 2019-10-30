const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        seller: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        movie: {
            type: Schema.Types.ObjectId,
            ref: 'Movie',
            required: true
        },
        room: {
            type: Schema.Types.ObjectId,
            ref: 'Room',
            required: true
        },
        validTime: String,
        isPaid: Boolean
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);