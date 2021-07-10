const express = require("express");
const router = express.Router();

const {
    addData,
    getData
} = require("../controller/Graph/graphController");

router.post("/addData", addData);
router.get("/graphData", getData);

module.exports = router;