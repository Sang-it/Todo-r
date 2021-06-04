const { Sequelize } = require("sequelize");
const db = require("../config/database");

const Todo = db.define(
  "Todo",
  {
    content: {
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.NUMBER,
    },
    dateAssigned: {
      type: Sequelize.NUMBER,
    },
  },
  {
    tableName: "Todo",
  }
);

module.exports = Todo;
