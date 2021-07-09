const express = require("express");
const router = express.Router();

const {
  login,
  register,
  authUser,
  allUsers,
  updateRole
} = require("../controller/User/userController");

// /api/auth

router.post("/login", login);
router.post("/register", register);
router.get("/authUser", authUser);
router.get("/allUsers", allUsers);
router.post("/updateRole",updateRole );

module.exports = router;
