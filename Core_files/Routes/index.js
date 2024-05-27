const express = require("express");
const router = express.Router();
const contactRouter = require("./contactRoute");
const userRouter = require("./userRoutes");
const ValidateAuthUser = require("../Middleware/AuthRequire");

router.use("/contact", ValidateAuthUser, contactRouter);
router.use("/user", userRouter);

module.exports = router;
