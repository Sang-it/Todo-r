import React, { useState } from "react";

export const AddTask = ({ handleClick, fetchData, calendar }) => {
  const [todoValue, setTodoValue] = useState("");
  const [dateValue, setDateValue] = useState("");

  const [borderColor, setBorderColor] = useState("1px solid #ddd");
  const [opacity, setOpacity] = useState("0.4");

  const dateRegex =
    /^20(((([248][048])|([13579][26]))-(((0[13578]|1[02])-([0-2][0-9]|3[01]))|((0[469]|11)-([0-2][0-9]|30))|(02-([0-2][0-9]))))|((([248][1-35-79])|([13579][013-57-9]))-(((0[13578]|1[02])-([0-2][0-9]|3[01]))|((0[469]|11)-([0-2][0-9]|30))|(02-(((0|1)[0-9])|(2[0-8]))))))$/;

  const handleFocus = () => {
    setBorderColor(
      borderColor === "1px solid #ddd"
        ? "1px solid rgba(0,0,0,.4)"
        : "1px solid #ddd"
    );
  };

  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const day = new Date().getDate();

  const addTodo = async (e) => {
    e.preventDefault();
    if (!calendar) {
      await fetch("http://localhost:4000/create-todo/", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          content: `${todoValue}`,
          dateAssigned: `${year}-${month + 1}-${day}`,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    } else if (dateRegex.test(`${dateValue}`)) {
      const inputDate = Date.parse(`${dateValue}`);
      if (inputDate > new Date()) {
        await fetch("http://localhost:4000/create-todo/", {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            content: `${todoValue}`,
            dateAssigned: `${dateValue}`,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
      } else alert("Date is in the past, I guess you are a time traveller");
    }
    setTodoValue("");
    setDateValue("");
    fetchData();
  };

  return (
    <div className="taskDiv" style={{ border: `${borderColor}` }}>
      <form onSubmit={addTodo}>
        <input
          type="text"
          placeholder="eg., Shit I need to call my girl today"
          onFocus={handleFocus}
          onBlur={handleFocus}
          value={todoValue}
          onChange={(e) => {
            setTodoValue(e.target.value);
          }}
          required
        />
        {calendar && (
          <input
            type="text"
            placeholder="eg., 2021-06-10  [Format: Year-Month-Day]"
            onFocus={handleFocus}
            onBlur={handleFocus}
            value={dateValue}
            onChange={(e) => {
              setDateValue(e.target.value);
              setOpacity(e.target.value !== "" ? "1" : "0.4");
            }}
            required
          />
        )}
        <div>
          <button
            style={{
              marginRight: "0.5rem",
              padding: "0.6rem",
              border: "none",
              backgroundColor: "#db4c3f",
              color: "white",
              borderRadius: "0.2rem",
              fontWeight: "600",
              textDecoration: "none",
              opacity: `${opacity}`,
            }}
            type="submit"
          >
            Add task
          </button>
          <button
            style={{
              border: "none",
              background: "none",
            }}
            onClick={handleClick}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
