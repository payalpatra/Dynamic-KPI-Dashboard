const graphData = require("../../models/GraphData");

const addData = async (req, res) => {
  const {
    ActualSales,
    TargetSales,
    customerSatisfaction,
    CapexData,
    DividendsData,
  } = req.body;

  try {
    const newData = new graphData({
      ActualSales: ActualSales,
      TargetSales: TargetSales,
      customerSatisfaction: customerSatisfaction,
      CapexData: CapexData,
      DividendsData: DividendsData,
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
    const Data = await graphData.find({});
    res.json(Data[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  addData,
  getData,
};

// const Data =
// {
//     "ActualSales": [1000, 1600, 900, 1300, 2450, 3700, 4000],
//     "TargetSales": [4900, 2600, 5350, 4800, 5200, 4800, 5000],
//     "customerSatisfaction": [60, 30, 20],
//     "CapexData": [6200, 9200, 6600, 8800, 5200, 9200],
//     "DividendsData": [4000, 2600, 5350, 4000, 7500, 2000],
//     "labels": [
//         '12-01-2020', '01-01-2021', '02-01-2021',
//         '03-01-2021', '04-01-2021', '05-01-2021', '06-01-2021'
//     ]
// }
