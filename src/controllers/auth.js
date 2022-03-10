// import required models
const { User } = require("../../models");
// import joi
const Joi = require("joi");
// import bcrypt
const bcrypt = require("bcrypt");
// import jwt
const jwt = require("jsonwebtoken");

// Register user
exports.register = async (req, res) => {
  try {
    // validate request body
    const schema = Joi.object().keys({
      fullName: Joi.string().min(4).required(),
      email: Joi.string().email().min(6).required(),
      password: Joi.string().min(8).required(),
      phone: Joi.string().pattern(
        /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
      ),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({
        message: error.details[0].message,
      });
      return;
    }
    // check if user already exists
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (user) {
      res.status(400).json({
        message: "User already exists",
      });
      return;
    }
    // generate salt
    const salt = await bcrypt.genSalt(10);
    // hash password
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // create new user
    const newUser = await User.create({
      fullName: req.body.fullName,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
    });
    // generate token
    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    res.status(200).json({
      data: {
        user: newUser,
        token,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    // validate request body
    const schema = Joi.object().keys({
      email: Joi.string().email().min(6).required(),
      password: Joi.string().min(8).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json(error);
      return;
    }
    // check if user exists
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      res.status(400).json({
        message: "Email or password is incorrect",
      });
      return;
    }
    // check if password is correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      res.status(400).json({
        message: "Email or password is incorrect",
      });
      return;
    }
    // generate token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    res.status(200).json({
      data: {
        fullName: user.fullName,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
