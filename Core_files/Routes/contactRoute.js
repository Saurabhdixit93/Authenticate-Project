const express = require("express");
const {
  markAsSpam,
  searchByName,
  searchByPhoneNumber,
} = require("../../Core_files/Controller/contactController");

const router = express.Router();

router.post("/mark-spam", markAsSpam);
router.get("/search/name", searchByName);
router.get("/search/phone", searchByPhoneNumber);

module.exports = router;
