const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

class Contact extends Model {}
Contact.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isSpam: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { sequelize, modelName: "contact_db" }
);

module.exports = Contact;
