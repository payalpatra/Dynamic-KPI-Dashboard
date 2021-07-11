const mongoose = require("mongoose");
// employee, task, deadline

const employeeDataSchema = mongoose.Schema({
    employee: {
        type: String,
        required: false,
    },
    task: {
        type: String,
        required: false,
    },
    deadline: {
        type: String,
        required: false,
    }


});

const Employee = mongoose.model("employee", employeeDataSchema);

module.exports = Employee;
