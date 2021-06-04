const experss = require("express");
const getTodo = experss.Router();
const Todo = require("../model/todo");
const authorizeCookie = require("../middlewares/authorizeCookie");
const { Op } = require("sequelize");
const year = new Date().getFullYear();
const month = new Date().getMonth();
const day = new Date().getDate();
const date = `${year}-${month + 1}-${day}`;

getTodo.get("/get-todo/", authorizeCookie, async (req, res) => {
  try {
    data = await Todo.findAll({
      where: { userId: req.id.id, dateAssigned: date },
    });
    res.status(200).send(data);
  } catch {
    res.sendStatus(500);
  }
});

getTodo.get("/get-missedTodo", authorizeCookie, async (req, res) => {
  try {
    data = await Todo.findAll({
      where: {
        userId: req.id.id,
        dateAssigned: {
          [Op.lt]: date,
        },
      },
    });
    res.status(200).send(data);
  } catch {
    res.sendStatus(500);
  }
});

getTodo.get("/get-upcomingTodo", authorizeCookie, async (req, res) => {
  try {
    data = await Todo.findAll({
      where: {
        userId: req.id.id,
        dateAssigned: {
          [Op.gt]: date,
        },
      },
    });
    res.status(200).send(data);
  } catch {
    res.sendStatus(500);
  }
});

module.exports = getTodo;
