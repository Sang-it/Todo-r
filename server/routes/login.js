require("dotenv").config();

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const login = express.Router();
const User = require("../model/user");

login.post("/login", async (req, res) => {
  try {
    const { email, pass } = req.body;
    const user = await User.findOne({ where: { email: email } });
    const valid = await bcrypt.compare(pass, user.pass);
    if (valid) {
      const accessToken = jwt.sign(
        { id: user.id },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.cookie("access-token", accessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30 * 1000,
      });
      res.json({ valid: true });
    } else {
      res.json({ valid: false });
    }
  } catch {
    res.sendStatus(500);
  }
});

module.exports = login;
