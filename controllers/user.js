const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
//@desc Get all users
//@route Get /api/bap-store/users
//@access private

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

//@desc Create user
//@route Post /api/bap-store/user
//@access private

const createUser = asyncHandler(async (req, res) => {
  try {
    const { username, password, email, phone } = req.body;
    if (!username || !password || !email || !phone) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }

    const userAvailabel = await User.findOne({ username, phone });
    if (userAvailabel) {
      res.status(400);
      throw new Error("User already registered!");
    }

    const emailAvailable = await User.findOne({ email });
    if (emailAvailable) {
      res.status(400);
      throw new Error("Email duplicate key error collection!");
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // const hashedPassword = await bcrypt.hashSync(
    //   "password",
    //   bcrypt.genSaltSync(10)
    // );

    const user = await User.create({
      username,
      password: hashedPassword,
      email,
      phone,
    });

    if (user) {
      res.status(201).json({
        data: {
          _id: user.id,
          username: user.username,
          phone: user.phone,
          email: user.email,
        },
      });
    } else {
      res.status(400);
      throw new Error("User data us not valid!");
    }
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to create user: ${error.message}`);
  }
});

//@desc Login user
//@route Post /api/bap-store/user
//@access private
const login = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400);
      throw new Error("All fields are username or password!");
    }
    const user = await User.findOne({
      username,
    });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (user && isPasswordValid) {
      const accessToken = jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            phone: user.phone,
            id: user.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10m" }
      );
      res.status(200).json({
        data: {
          id: user._doc._id,
          username: user._doc.username,
          email: user._doc.email,
          phone: user._doc.phone,
          accessToken,
        },
      });
    } else {
      res.status(401);
      throw new Error("Username or password in not valid!");
    }
  } catch (error) {
    throw new Error(`Failed to login user: ${error.message}`);
  }
});
const currentUser = asyncHandler(async (req, res) => {
  try {
    res.json({
      data: {
        username: req.user.username,
        email: req.user.email,
        phone: req.user.phone,
        id: req.user.id,
      },
    });
  } catch (error) {
    throw new Error(`Failed to get current user: ${error.message}`);
  }
});

//@desc Update user
//@route Put /api/bap-store/user/:id
//@access private

const updateUser = asyncHandler(async (req, res) => {
  try {
    if (req.params.id.length != 24) {
      res.status(404);
      throw new Error("User id must enough 24 character!");
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error("User not found!");
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json({
      data: {
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        phone: updatedUser.phone,
      },
    });
  } catch (error) {
    throw new Error(`Failed to update user: ${error.message}`);
  }
});

//@desc Delete user
//@route Delete /api/bap-store/user/:id
//@access private

const deleteUser = asyncHandler(async (req, res) => {
  try {
    if (req.params.id.length != 24) {
      res.status(404);
      throw new Error("User id must enough 24 character!");
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error("User not found!");
    }
    await User.deleteOne();
    res.status(200).json({ message: `Xoá thành công user ${user.username}!` });
  } catch (error) {
    throw new Error(`Failed to delete user: ${error.message}`);
  }
});

module.exports = {
  getUsers,
  createUser,
  login,
  updateUser,
  deleteUser,
  currentUser,
};
