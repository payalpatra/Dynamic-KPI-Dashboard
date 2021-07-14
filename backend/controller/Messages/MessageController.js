const Message = require("../../models/Message");

const addData = async (req, res) => {
    const { message, name } = req.body

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();

    today = mm + '-' + dd + '-' + yyyy;
    let createdAt = today

    try {
        const newData = new Message({
            message: message,
            name: name,
            createdAt: createdAt,
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
        const Data = await Message.find({});
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