import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import axios from "axios";

const Body = styled.div`
  text-align: center;
`;

const Login = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [credentialsError, setCredentialsError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      username,
      password,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      "http://localhost:5000/login",
      body,
      config
    );

    if (response.data.response !== "Details match!") {
      setCredentialsError(response.data.response);
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
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>{credentialsError}</div>
        <div>
          <input type="submit" value="Login" />
        </div>
      </form>
    </Body>
  );
};

export default Login;
