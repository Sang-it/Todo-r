import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(null);

  const validateUser = () => {
    fetch("http://localhost:4000/login/", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        email: email,
        pass: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.valid) setValid(true);
        else alert("Login failed.");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.title = "Login: Todo";
    fetch("http://localhost:4000/validateToken/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.valid) setValid(true);
      });
  }, []);

  if (valid) return <Redirect to="/today" />;

  return (
    <div className="login">
      <h3>Login</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <input
          type="text"
          name="email"
          placeholder="E-mail"
          value={email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={handleChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              validateUser();
            }
          }}
        />
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
            }}
            onClick={() => validateUser()}
          >
            Login
          </button>
          <Link to="/register">
            <button
              style={{
                border: "none",
                background: "none",
              }}
            >
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
