import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";

export const Register = () => {
  const emailRegex =
    /(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

  const passRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegisterd, setisRegisterd] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
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
    document.title = "Register: Todo";
  }, []);

  const addUser = (e) => {
    e.preventDefault();
    if (emailRegex.test(`${email}`) && passRegex.test(`${password}`))
      fetch("http://localhost:4000/create-user/", {
        method: "POST",
        body: JSON.stringify({
          firstName: `${firstName}`,
          lastName: `${lastName}`,
          email: `${email}`,
          pass: `${password}`,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.created) {
            setisRegisterd(true);
          }
        });
    else {
      alert(
        "Please enter the proper details.\nPassword must follow the standard guidelines."
      );
    }
  };

  if (isRegisterd) return <Redirect to="/login" />;

  return (
    <div className="login">
      <h3>Register</h3>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
        onSubmit={addUser}
      >
        <input
          type="text"
          name="firstName"
          value={firstName}
          placeholder="First Name"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          value={lastName}
          placeholder="Last Name"
          required
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={email}
          required
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          required
          onChange={handleChange}
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
            type="submit"
          >
            Register
          </button>
          <Link to="/login">
            <button
              style={{
                border: "none",
                background: "none",
              }}
            >
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};
