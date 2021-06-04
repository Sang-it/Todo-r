const jwt = require("jsonwebtoken");

const authenticateCookie = (req, res, next) => {
  const token = req.cookies["access-token"];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, id) => {
    if (err) return res.sendStatus(403);
    req.id = id;
    next();
  });
};

module.exports = authenticateCookie;
