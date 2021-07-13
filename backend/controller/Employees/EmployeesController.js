const Employee = require("../../models/Employees");

const addData = async (req, res) => {
    const {
        employee, task, deadline
    } = req.body;

    try {
        const newData = new Employee({
            employee: employee,
            task: task,
            deadline: deadline,

        });

        await newData.save();
        res.send(newData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const getData = async (req, res) => {
    try {
        const Data = await Employee.find({});
        res.json(Data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const updateStatus = async (req, res) => {
    const { id } = req.body
    try {
        await Employee.deleteOne({ "_id": id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};


module.exports = {
    addData,
    getData,
    updateStatus
};

