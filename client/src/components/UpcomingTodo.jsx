import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { Task } from "./Task";
import { AddTask } from "./AddTask";

export const UpcomingTodo = () => {
  const [todo, setTodo] = useState([]);

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const fetchData = () => {
    fetch("http://localhost:4000/get-upcomingTodo/", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setTodo(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h4 style={{ marginBottom: "1rem" }}>Upcoming Todo</h4>
      <div>
        {todo.map((item) => (
          <Task
            key={nanoid()}
            id={item.id}
            content={item.content}
            dateAssigned={item.dateAssigned}
            fetchData={fetchData}
          />
        ))}
        {todo.length === 0 && (
          <p style={{ marginBottom: "1rem" }}>No Scheduled todos</p>
        )}
        <p className="addTask" onClick={handleClick}>
          {!isClicked && "+ Add Task for later"}
        </p>
        {isClicked && (
          <AddTask
            handleClick={handleClick}
            fetchData={fetchData}
            calendar={true}
          />
        )}
      </div>
    </div>
  );
};
