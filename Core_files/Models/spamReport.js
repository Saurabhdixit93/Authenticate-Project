const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/database");

class SpamReport extends Model {}
SpamReport.init(
  {
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reportedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, modelName: "spamReport_db" }
);

module.exports = SpamReport;
