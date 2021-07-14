const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    message: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: false,
    },
    createdAt: {
        type: String,
        required: false,
    }

});

const Message = mongoose.model("message", messageSchema);

module.exports = Message;