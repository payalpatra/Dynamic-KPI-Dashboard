const express = require("express");
const router = express.Router();

const {
    addData,
    getData
} = require("../controller/Employees/EmployeesController");

router.post("/addData", addData);
router.get("/employeeData", getData);

module.exports = router;