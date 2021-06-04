require("dotenv").config();

const express = require("express");
const validateToken = express.Router();
const jwt = require("jsonwebtoken");

validateToken.post("/validateToken", (req, res) => {
  const token = req.cookies["access-token"];

  if (token == null) return res.send({ valid: false });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, id) => {
    if (err) return res.send({ valid: false });
    else {
      res.send({ valid: true });
    }
  });
});

module.exports = validateToken;
