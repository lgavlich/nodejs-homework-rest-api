const express = require("express");
const CreateError = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const { User, schemas } = require("../../models/users");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { error } = schemas.register.validate(req.body);
    if (error) {
      throw new CreateError(400, error.message);
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new CreateError(409, "Email in use");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const result = await User.create({
      email,
      password: hashPassword,
    });
    res.status(201).json({
      user: {
        email: "example@example.com",
        subscription: "starter",
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { error } = schemas.register.validate(req.body);
    if (error) {
      throw new CreateError(400, error.message);
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new CreateError(401, "Email or password is wrong");
    }
    const compareResult = await bcrypt.compare(password, user.password);
    if (!compareResult) {
      throw new CreateError(401, "Email or password is wrong");
    }

    const token = "234t3ee.sdfsdfsfh.aw3235134";
    res.json({
      token: "exampletoken",
      user: {
        email: "example@example.com",
        subscription: "starter",
      },
    });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
