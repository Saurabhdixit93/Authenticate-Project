const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/user");

exports.register = async (req, res) => {
  const { name, phoneNumber, email, password } = req.body;

  if (!name || !phoneNumber || !email || !password) {
    return res.status(400).json({ error: "Please enter all fields" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    //   First find if the user already exists with the same phone number
    const user = await User.findOne({ where: { phoneNumber } });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newuser = await User.create({
      name,
      phoneNumber,
      email,
      password: hashedPassword,
    });
    return res
      .status(201)
      .json({ account: newuser, message: "User created successfully" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { phoneNumber, password } = req.body;

  try {
    const user = await User.findOne({ where: { phoneNumber } });
    if (!user) return res.status(400).json({ error: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.json({ token, message: "Logged in successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.UserId);
    if (!user) return res.status(400).json({ error: "User not found" });
    return res.json({ user, message: "Profile fetched successfully" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
