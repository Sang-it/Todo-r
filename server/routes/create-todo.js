const experss = require("express");
const createTodo = experss.Router();
const Todo = require("../model/todo");

const authorizeCookie = require("../middlewares/authorizeCookie");

createTodo.post("/create-todo/", authorizeCookie, async (req, res) => {
  try {
    const createObject = {
      dateAssigned: req.body.dateAssigned,
      content: req.body.content,
      userId: req.id.id,
    };
    data = await Todo.create(createObject);
    res.sendStatus(201);
  } catch {
    res.sendStatus(500);
  }
});

module.exports = createTodo;
