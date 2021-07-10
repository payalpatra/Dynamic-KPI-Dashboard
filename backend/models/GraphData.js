const mongoose = require("mongoose");

const graphDataSchema = mongoose.Schema({
    ActualSales: {
        type: [Number],
        required: false,
    },
    TargetSales: {
        type: [Number],
        required: false,
    },
    customerSatisfaction: {
        type: [Number],
        required: false,
    },
    CapexData: {
        type: [Number],
        required: false,
    },

    DividendsData: {
        type: [Number],
        required: false,
    },


});

const graphData = mongoose.model("graph", graphDataSchema);

module.exports = graphData;
