const { Op } = require("sequelize");
const Contact = require("../Models/contact");
const User = require("../Models/user");
const SpamReport = require("../Models/spamReport");

exports.reportSpam = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const userId = req.UserId;

    if (!phoneNumber) {
      return res.status(400).json({ error: "Phone number is required" });
    }

    // same number with same user report will be ignored
    const spamReport = await SpamReport.findOne({
      where: { phoneNumber, reportedBy: userId },
    });
    if (spamReport) {
      return res.status(400).json({ error: "Spam report already exists" });
    }

    // create spam report
    await SpamReport.create({ phoneNumber, reportedBy: userId });

    // and also update the isSpam field in the Contact model
    const contact = await Contact.findOne({ where: { phoneNumber } });
    if (contact) {
      contact.isSpam = true;
      await contact.save();
    }
    return res.status(201).json({ message: "Spam reported successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.searchByName = async (req, res) => {
  try {
    const { name } = req.body;

    // starts with name
    const startsWithName = await User.findAll({
      where: {
        name: {
          [Op.iLike]: `${name}%`,
        },
      },
      attributes: ["id", "name", "phoneNumber"],
      include: { model: SpamReport, attributes: [] },
    });

    // contains name
    const containsName = await User.findAll({
      where: {
        name: {
          [Op.and]: {
            [Op.notLike]: `${name}%`,
            [Op.iLike]: `%${name}%`,
          },
        },
      },
      attributes: ["id", "name", "phoneNumber"],
      include: { model: SpamReport, attributes: [] },
    });

    // Combine and send the search results
    const searchResults = startsWithName.concat(containsName);

    if (searchResults.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json({ searchResults });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.searchByPhoneNumber = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const users = await User.findAll({
      where: { phoneNumber },
      attributes: ["id", "name", "phoneNumber"],
      include: { model: SpamReport, attributes: [] },
    });

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
