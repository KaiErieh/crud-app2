const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const uuid = require("uuid");

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("Fill all fields");
  }

  const user = await User.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json(
      res.json({
        _id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      })
    );
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { username, password, role, email } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: "Please fill all fields" });
  }

  const userExists = await User.findOne({ username });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists!");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const registeredUser = await User.create({
    username,
    email,
    role,
    password: hashedPassword,
  });

  res
    .status(201)
    .json({
      _id: registeredUser.id,
      username: registeredUser.username,
      email: registeredUser.email,
      role: registeredUser.role,
      token: generateToken(registeredUser._id),
    });
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await User.remove(user);
    res.status(200).json(`Removed user ${user.username}`);
  } else {
    res.status(400).json("User not found");
  }
});
const getMe = asyncHandler(async (req, res) => {
  res.json("Me");
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

module.exports = { loginUser, registerUser, deleteUser, getMe, getUsers };
