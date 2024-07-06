const express = require("express");
const router = express.Router();
const contactRouter = require("./contactRoute");
const userRouter = require("./userRoutes");
const ValidateAuthUser = require("../Middleware/AuthRequire");

router.get("/", (req, res) => {
  return res.status(200).json({ message: "Server Running Successfully" });
});
router.use("/contact", ValidateAuthUser, contactRouter);
router.use("/user", userRouter);

module.exports = router;
