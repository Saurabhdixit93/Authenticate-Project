const { Op } = require("sequelize");
const Contact = require("../Models/contact");
const User = require("../Models/user");

exports.reportSpam = async (req, res) => {
  const { phoneNumber } = req.body;
  const userId = req.userId;

  try {
    // Check if the phone number already exists in contacts
    let contact = await Contact.findOne({ where: { phoneNumber } });

    // If the contact doesn't exist, create a new one
    if (!contact) {
      contact = await Contact.create({ phoneNumber, isSpam: true });
    } else {
      contact.isSpam = true;
      contact.reportBy = userId;
      await contact.save();
    }

    return res
      .status(200)
      .json({ message: "Phone number reported as spam successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to report phone number as spam." });
  }
};

exports.searchByName = async (req, res) => {
  try {
    const { name } = req.body;

    const users = await User.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` },
      },
      attributes: ["name", "phoneNumber", "id"],
    });

    const phoneNumbers = await Promise.all(
      users.map(async (user) => {
        const contacts = await Contact.findAll({
          attributes: ["phoneNumber", "isSpam", "id"],
          where: {
            phoneNumber: user?.phoneNumber, // Filter contacts by phoneNumber
          },
        });
        if (contacts.length === 0) return user;
        return contacts.map((contact) => ({
          user,
          phoneNumber: contact.phoneNumber,
          isSpam: contact.isSpam,
        }));
      })
    );
    // Flatten the array of phone numbers
    const flattenedPhoneNumbers = phoneNumbers.flat();
    if (phoneNumbers.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json({ data: flattenedPhoneNumbers });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.searchByPhoneNumber = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const contactsDetails = await Contact.findAll({
      where: {
        phoneNumber: { [Op.iLike]: `%${phoneNumber}%` },
      },
      attributes: ["isSpam", "phoneNumber", "id"],
    });
    const phoneNumbers = await Promise.all(
      contactsDetails.map(async (contact) => {
        const users = await User.findAll({
          attributes: ["phoneNumber", "name", "email", "id"],
          where: {
            phoneNumber: contact?.phoneNumber, // Filter contacts by phoneNumber
          },
          required: false,
        });

        if (users?.length === 0) {
          return contact;
        }
        return users.map((specificUser) => ({
          contact,
          user: specificUser,
        }));
      })
    );
    // Flatten the array of phone numbers
    const flattenedPhoneNumbers = phoneNumbers.flat();
    if (phoneNumbers.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json({ data: flattenedPhoneNumbers });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
