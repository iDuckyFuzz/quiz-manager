import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Logout from "../Logout/Logout";

const Body = styled.div`
  text-align: center;
`;

const Main = (props, options) => {
  const { state } = useLocation();
  let navigate = useNavigate();

  return (
    <Body>
      <h1>Home</h1>

      <h1>WebbiSkools Ltd</h1>
      <p>
        Welcome to WebbiSkools Ltd Quiz Manager, please select from the options
        below
      </p>
      <button onClick={() => navigate("/quizzes", { state })} type="button">
        Quizzes
      </button>
      <Logout />
    </Body>
  );
};

export default Main;
