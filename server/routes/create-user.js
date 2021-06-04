const experss = require("express");
const createUser = experss.Router();
const User = require("../model/user");
const bcrypt = require("bcryptjs");

createUser.post("/create-user/", async (req, res) => {
  try {
    const { pass, ...body } = req.body;
    const hash = await bcrypt.hash(pass, 10);
    data = await User.create({ pass: hash, ...body });
    res.status(201).json({ created: true });
  } catch {
    res.sendStatus(403);
  }
});

module.exports = createUser;
