const express = require("express");
const router = express.Router();

const {
    addData,
    getData
} = require("../controller/Messages/MessageController");

// -- /api/message -- \\

router.post("/addMessage", addData);
router.get("/messages", getData);

module.exports = router;