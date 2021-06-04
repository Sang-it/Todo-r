const experss = require("express");
const deleteTodo = experss.Router();
const Todo = require("../model/todo");

const authorizeCookie = require("../middlewares/authorizeCookie");

deleteTodo.delete("/delete-todo/:id", authorizeCookie, async (req, res) => {
  try {
    data = await Todo.destroy({ where: { id: req.params.id } });
    res.status(204).json("Successful");
  } catch {
    res.status(500).json(err.name);
  }
});

module.exports = deleteTodo;
