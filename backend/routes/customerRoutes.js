const express = require("express");
const router = express.Router();

const {
    addData,
    getData,
    updateStatus
} = require("../controller/Customers/CustomerController");

router.post("/addData", addData);
router.get("/getData", getData);
router.post("/updateStatus", updateStatus);

module.exports = router;