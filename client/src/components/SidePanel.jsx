import React from "react";
import { NavLink } from "react-router-dom";

export const SidePanel = () => {
  const styles = {
    backgroundColor: "rgb(236, 236, 236)",
    borderRadius: "0.2rem",
  };

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <NavLink to="/today" className="links" activeStyle={styles}>
        <img src="/Today.svg" alt="" />
        <p>Today</p>
      </NavLink>
      <NavLink to="/calendar" className="links" activeStyle={styles}>
        <img src="/Calendar.svg" alt="" />
        <p>Calendar</p>
      </NavLink>
    </div>
  );
};
