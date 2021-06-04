import React, { useState } from "react";

export const Header = ({ handleClick, valid }) => {
  const [value, setValue] = useState("");
  const [width, setWidth] = useState("20%");
  const [color, setColor] = useState("invert(1)");

  const expandInput = () => {
    setWidth("30%");
    setColor("invert(0)");
  };

  const collapseInput = () => {
    setWidth("20%");
    setColor("invert(1)");
    setValue("");
  };

  const handleHover = () => {
    if (width === "20%") {
      setColor(color === "invert(1)" ? "invert(0)" : "invert(1)");
    }
  };

  const handleLogout = () => {
    fetch("http://localhost:4000/logout/", {
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    window.location.reload();
  };

  return (
    <div className="header">
      <div className="search">
        <img src="/menu.svg" alt="" onClick={handleClick} />
        <img
          className="searchIcon"
          src="/search.svg"
          alt=""
          style={{ filter: color }}
        />
        <input
          type="text"
          placeholder="Search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{ width: `${width}` }}
          onFocus={expandInput}
          onBlur={collapseInput}
          onMouseOver={handleHover}
          onMouseLeave={handleHover}
        />
      </div>
      {valid && (
        <p
          style={{ alignSelf: "center", fontWeight: "600" }}
          onClick={handleLogout}
        >
          Log Out
        </p>
      )}
    </div>
  );
};
