const mongoose = require("mongoose");

const customerDataSchema = mongoose.Schema({
    company: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: false,
    },
    amount: {
        type: String,
        required: false,
    }

});

const Customer = mongoose.model("customer", customerDataSchema);

module.exports = Customer;
