const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema(
    {
        seller: {
            type: Schema.Types.ObjectId,
            ref: 'Order',
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Ticket', ticketSchema);