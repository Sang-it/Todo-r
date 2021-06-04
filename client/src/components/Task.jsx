import React from "react";

export const Task = ({ content, id, fetchData, dateAssigned }) => {
  const handleClick = async () => {
    await fetch(`http://localhost:4000/delete-todo/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    fetchData();
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "0.5rem",
        }}
      >
        <input
          type="checkbox"
          name=""
          id=""
          onClick={handleClick}
          style={{ marginRight: "0.3rem" }}
        />
        <p id="content" style={{ color: " rgb(118, 117, 117)" }}>
          {content}
        </p>
        {dateAssigned && <p style={{ marginLeft: "0.5rem" }}>{dateAssigned}</p>}
      </div>
      <hr
        style={{
          width: "50vw",
          opacity: "0.5",
        }}
      />
    </div>
  );
};
