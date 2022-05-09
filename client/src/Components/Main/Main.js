import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Body = styled.div`
  text-align: center;
`;

const Main = () => {
  let navigate = useNavigate();

  const logout = () => {
    //delete session cookie
    navigate("/");
  };

  return (
    <Body>
      <h1>Home</h1>

      <h1>WebbiSkools Ltd</h1>
      <p>
        Welcome to WebbiSkools Ltd Quiz Manager, please select from the options
        below
      </p>
      <button onClick={() => navigate("/quizzes")} type="button">
        Quizzes
      </button>
      <button onClick={logout} type="button">
        Logout
      </button>
    </Body>
  );
};

export default Main;
