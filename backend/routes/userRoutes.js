const express = require("express");
const router = express.Router();

const {
    login,
    register,
    authUser
} = require("../controller/User/userController");

// /api/auth

router.post("/login", login);
router.post("/register", register);
router.get("/authUser", authUser);

module.exports = router;
