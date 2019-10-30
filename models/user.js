const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobilePhone: {
        type: String,
        required: true
    },
    firstName: String,
    LastName: String,
    isAdmin: {
        type: Boolean,
        required: true
    }

})

module.exports = mongoose.model('User', userSchema);