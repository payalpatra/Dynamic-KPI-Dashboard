const Customer = require("../../models/Customer");

const addData = async (req, res) => {
    const {
        company,
        name,
        email,
        title,
        amount
    } = req.body;

    try {
        const newData = new Customer({
            company: company,
            name: name,
            email: email,
            title: title,
            status: "In Progress",
            amount: amount,
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
        const Data = await Customer.find({});
        res.json(Data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const updateStatus = async (req, res) => {
    const { id } = req.body
    try {
        let customer = await Customer.findOne({ "_id": id });
        if (customer.status === "In Progress") {
            await Customer.updateOne(customer, { status: 'Completed' });
            res.send(customer)
        } else {
            await Customer.updateOne(customer, { status: 'In Progress' });
            res.send(customer)
        }

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

