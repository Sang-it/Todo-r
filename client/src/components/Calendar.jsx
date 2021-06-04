import React, { useEffect, useState } from "react";
import { MissedTodo } from "./MissedTodo";
import { UpcomingTodo } from "./UpcomingTodo";

export const Calendar = () => {
  const [valid, setValid] = useState(null);

  useEffect(() => {
    document.title = "Calender: Todo";
    fetch("http://localhost:4000/validateToken/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => setValid(data.valid));
  }, []);

  if (valid === null) return <h3>Loading</h3>;

  if (valid)
    return (
      <div>
        <h3>Calendar</h3>
        <MissedTodo />
        <UpcomingTodo />
      </div>
    );

  return (
    <h3>
      <a href="/login">Login</a> required.
    </h3>
  );
};
