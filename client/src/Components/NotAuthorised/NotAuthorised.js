import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import StyledButton from "../StyledComponents/StyledButton";

const Body = styled.div`
  text-align: center;
`;

const StyledH1 = styled.h1`
  color: rgb(72, 76, 122);
`;

const NotAuthorised = () => {
  let navigate = useNavigate();

  return (
    <Body>
      <StyledH1>You are not authorized to view this page.</StyledH1>
      <StyledButton onClick={() => navigate("/")} type="button" text="Login" />
    </Body>
  );
};

export default NotAuthorised;
