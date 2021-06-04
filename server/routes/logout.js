const express = require("express");
const logout = express.Router();

logout.get("/logout", async (req, res) => {
  res.clearCookie("access-token");
  res.sendStatus(200);
});

module.exports = logout;
