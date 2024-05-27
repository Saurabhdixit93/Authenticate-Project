const { Op, Sequelize } = require("sequelize");
const Contact = require("../Models/contact");
const User = require("../Models/user");

exports.markAsSpam = async (req, res) => {
  const { phoneNumber } = req.body;
  if (!phoneNumber)
    return res.status(400).json({ error: "Phone number is required" });

  try {
    // here check if already exists with isSpam true return with message "Already marked as spam"

    const contact = await Contact.findOne({ where: { phoneNumber } });
    if (contact) {
      if (contact.isSpam) {
        return res.status(400).json({ error: "Already marked as spam" });
      }
      contact.isSpam = true;
      await contact.save();
    } else {
      await Contact.create({ phoneNumber, isSpam: true });
    }
    return res.json({ message: "Marked as spam" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.searchByName = async (req, res) => {
  try {
    const { name } = req.body;

    const startsWithName = await User.findAll({
      where: {
        name: {
          [Op.iLike]: `${name}%`,
        },
      },
      attributes: ["name", "phoneNumber"],
    });

    const containsName = await User.findAll({
      where: {
        name: {
          [Op.and]: {
            [Op.notLike]: `${name}%`,
            [Op.like]: `%${name}%`,
          },
        },
      },
      attributes: ["name", "phoneNumber"],
    });
    // Combine and send the search results
    const searchResults = startsWithName.concat(containsName);
    return res.json({ searchResults });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.searchByPhoneNumber = async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    const contacts = await Contact.findAll({
      where: { phoneNumber },
      attributes: ["name", "phoneNumber"],
    });
    if (contacts.length === 0) {
      return res.status(404).json({ message: "No contacts found" });
    }
    return res.json({ data: contacts, message: "Contacts found" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
