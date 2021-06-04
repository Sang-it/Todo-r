import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { Task } from "./Task";

export const MissedTodo = () => {
  const [todo, setTodo] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:4000/get-missedTodo/", {
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
      <h4 style={{ marginBottom: "1rem" }}>Missed Todo</h4>
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
          <p style={{ marginBottom: "1rem" }}>No missing todos. Good work.</p>
        )}
      </div>
    </div>
  );
};
