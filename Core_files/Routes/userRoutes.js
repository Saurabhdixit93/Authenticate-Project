const express = require("express");
const {
  register,
  login,
  getProfile,
} = require("../../Core_files/Controller/userController");
const ValidateAuthUser = require("../Middleware/AuthRequire");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", ValidateAuthUser, getProfile);

module.exports = router;
