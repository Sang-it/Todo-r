require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const getTodo = require("./routes/get-todo");
const createUser = require("./routes/create-user");
const createTodo = require("./routes/create-todo");
const deleteTodo = require("./routes/delete-todo");
const login = require("./routes/login");
const validate = require("./routes/validateToken");
const cookieParser = require("cookie-parser");
const logout = require("./routes/logout");

const main = () => {
  const app = express();
  app.use(cookieParser());
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(morgan("short"));
  app.use(express.json());
  app.use(getTodo);
  app.use(createUser);
  app.use(createTodo);
  app.use(deleteTodo);
  app.use(login);
  app.use(validate);
  app.use(logout);

  app.get("/", (req, res) => {
    res.send("Hey bitch why are you here?");
  });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log("Sever started ....");
  });
};
main();
