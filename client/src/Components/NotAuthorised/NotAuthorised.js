import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Body = styled.div`
  text-align: center;
`;

const NotAuthorised = () => {
  let navigate = useNavigate();

  return (
    <Body>
      <h1>You are not authorized to view this page.</h1>
      <button onClick={() => navigate("/")} type="button">
        Login
      </button>
    </Body>
  );
};

export default NotAuthorised;
