const express = require("express");
const {
  reportSpam,
  searchByName,
  searchByPhoneNumber,
} = require("../../Core_files/Controller/contactController");

const router = express.Router();

router.post("/mark-spam", reportSpam);
router.get("/search/name", searchByName);
router.get("/search/phone", searchByPhoneNumber);

module.exports = router;
