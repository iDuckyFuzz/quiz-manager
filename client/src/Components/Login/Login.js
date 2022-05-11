import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const Body = styled.div`
  text-align: center;
`;

async function loginUser(credentials) {
  return fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

const Login = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let test = await loginUser({ username, password });

    if (test.response === "invalid credentials entered") {
      console.log("credentails are wrong mate");
    } else {
      navigate("/home");
    }
  };

  // This following section will display the form that takes the input from the user.
  return (
    <Body>
      <h1>WebbiSkools Ltd</h1>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="text"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input type="submit" value="Login" />
        </div>
      </form>
    </Body>
  );
};

export default Login;
