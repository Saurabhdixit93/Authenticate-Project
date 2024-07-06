// const { Model, DataTypes } = require("sequelize");
// const sequelize = require("../../config/database");

// class User extends Model {}
// User.init(
//   {
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
// phoneNumber: {
//   type: DataTypes.STRING,
//   unique: true,
//   allowNull: false,
// },
//     email: {
//       type: DataTypes.STRING,
//       unique: true,
//       allowNull: true,
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   { sequelize, modelName: "user_db" }
// );

// module.exports = User;

// models/user.js

const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const Contact = require("./contact");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    unique: true,
    // allowNull: false,
  },
});

User.hasMany(Contact);
Contact.belongsTo(User);

module.exports = User;
