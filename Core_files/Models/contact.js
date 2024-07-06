const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Contact = sequelize.define("Contact", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  isSpam: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  reportBy: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Contact;
