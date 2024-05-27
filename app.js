require("dotenv").config();
const express = require("express");
const sequelize = require("./config/database");
const mainRoute = require("./Core_files/Routes/index");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", mainRoute);
app.use("*", (req, res) => {
  return res.status(404).json({ error: "Route not found" });
});
// Database synchronization and server start
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    await sequelize.sync({ alter: true });
    console.log("Database synchronized.");

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

// Start the server
startServer();
