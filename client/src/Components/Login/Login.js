import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import axios from "axios";
import StyledButton from "../StyledComponents/StyledButton";

const Body = styled.div`
  text-align: center;
`;

const StyledH2 = styled.h2`
  color: rgb(72, 76, 122);
`;

const StyledH1 = styled.h1`
  color: rgb(72, 76, 122);
`;

const StyledLabel = styled.label`
  color: rgb(72, 76, 122);
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
      withCredentials: true,
    };

    const response = await axios.post(
      "http://localhost:5000/login",
      body,
      config
    );

    if (response.data.response !== "Details match!") {
      setCredentialsError(response.data.response);
    } else {
      navigate("/home", { state: response.data.permissions });
    }
  };

  // This following section will display the form that takes the input from the user.
  return (
    <Body>
      <StyledH1 data-testid="heading">WebbiSkools Ltd</StyledH1>
      <StyledH2 data-testid="login">Login</StyledH2>
      <form onSubmit={handleSubmit}>
        <div>
          <StyledLabel data-testid="username" htmlFor="username">
            Username:{" "}
          </StyledLabel>
          <input
            type="text"
            id="username"
            onChange={(e) => setUserName(e.target.value)}
            data-testid="username-input"
          />
        </div>
        <div>
          <StyledLabel data-testid="password" htmlFor="password">
            Password:{" "}
          </StyledLabel>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            data-testid="password-input"
          />
        </div>
        <div>{credentialsError}</div>
        <div>
          <StyledButton datatestid="submit" type="submit" text="Login" />
        </div>
      </form>
    </Body>
  );
};

export default Login;
