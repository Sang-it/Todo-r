import React, { useState, useEffect } from "react";
import { AddTask } from "./AddTask";
import { Task } from "./Task";
import { nanoid } from "nanoid";

export const Today = ({ forConditional }) => {
  const [todo, setTodo] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [valid, setValid] = useState(null);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const fetchData = () => {
    fetch("http://localhost:4000/get-todo/", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setTodo(data));
  };

  useEffect(() => {
    document.title = "Today: Todo";
    fetch("http://localhost:4000/validateToken/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setValid(data.valid);
        forConditional();
      });
    fetchData();
  }, [forConditional]);

  if (valid === null) return <h3>Loading</h3>;

  if (valid)
    return (
      <div>
        <h3>Today</h3>
        <div>
          {todo.map((item) => (
            <Task
              key={nanoid()}
              id={item.id}
              content={item.content}
              createdAt={item.createdAt}
              fetchData={fetchData}
            />
          ))}
        </div>
        <p className="addTask" onClick={handleClick}>
          {!isClicked && "+ Add Task"}
        </p>
        {isClicked && (
          <AddTask handleClick={handleClick} fetchData={fetchData} />
        )}
      </div>
    );
  return (
    <h3>
      <a href="/login">Login</a> required.
    </h3>
  );
};
