const mongoose = require("mongoose");
const ContactSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
        required: true,
    },
    adddate: {
        type: Date,
        default: Date.now,
    },
    UserId: {
        type: String,
        required: false,
    },
    qrcode: {
        type: String,
        required: false
    }
});
const Contact = mongoose.model("Contact", ContactSchema);
module.exports = Contact;