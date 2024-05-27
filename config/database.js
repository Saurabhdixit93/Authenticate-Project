const { Sequelize } = require("sequelize");
const config = require("./config.json");
const environment = process.env.NODE_ENV || "development";

const envConfig = config[environment];

let sequelize;

if (envConfig.use_env_variable) {
  sequelize = new Sequelize(process.env[envConfig.use_env_variable], {
    dialect: envConfig.dialect,
    dialectOptions: envConfig.dialectOptions,
  });
} else {
  sequelize = new Sequelize(
    envConfig.database,
    envConfig.username,
    envConfig.password,
    {
      host: envConfig.host,
      dialect: envConfig.dialect,
      dialectOptions: envConfig.dialectOptions,
    }
  );
}

module.exports = sequelize;
