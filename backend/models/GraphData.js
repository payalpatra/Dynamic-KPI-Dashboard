const mongoose = require("mongoose");
// let setData =
//     [
//         { ActualSales: [1000, 1600, 900, 1300, 2450, 3700, 4000] },
//         { TargetSales: [4900, 2600, 5350, 4800, 5200, 4800, 5000] },
//         {
//             MLabels: ["12-01-2020", "01-01-2021", "02-01-2021", "03-01-2021", "04-01-2021", "05-01-2021", "06-01-2021",]
//         },
//         { CapexData: [6200, 9200, 6600, 8800, 5200, 9200] },
//         { DividendsData: [4000, 2600, 5350, 4000, 7500, 2000] },
//         {
//             Clabels: ['12-01-2020', '01-01-2021', '02-01-2021', '03-01-2021', '04-01-2021', '05-01-2021', "06-01-2021"]
//         },
//         { customerSatisfaction: ["60", "30", "20"] }
//     ]

const graphDataSchema = mongoose.Schema({
    ActualSales: {
        type: Array,
        required: false,
    },
    TargetSales: {
        type: Array,
        required: false,
    },
    MLabels: {
        type: Array,
        required: false,
    },
    CapexData: {
        type: Array,
        required: false,
    },

    DividendsData: {
        type: Array,
        required: false,
    },
    Clabels: {
        type: Array,
        required: false,
    },
    customerSatisfaction: {
        type: Array,
        required: false,
    }

});

const graphData = mongoose.model("graph", graphDataSchema);

module.exports = graphData;