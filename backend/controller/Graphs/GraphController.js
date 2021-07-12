const graphData = require("../../models/graphData");

const addData = async (req, res) => {
    const { type, Data1, Data2, Data3 } = req.body
    let labels = '["12-01-2020", "01-01-2021", "02-01-2021", "03-01-2021", "04-01-2021", "05-01-2021", "06-01-2021"]'


    try {
        const newData = new graphData({
            type: type,
            Data1: Data1,
            Data2: Data2,
            Data3: Data3,
            labels: labels,
        });

        await newData.save();
        console.log(newData)
        res.send(newData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const getData = async (req, res) => {
    try {
        const Data = await graphData.find({});
        res.json(Data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    addData,
    getData,
};