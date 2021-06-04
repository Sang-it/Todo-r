const { Sequelize } = require("sequelize");
const db = require("../config/database");

const User = db.define(
  "User",
  {
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    pass: {
      type: Sequelize.STRING,
    },
  },
  {
    tableName: "User",
  }
);

module.exports = User;
