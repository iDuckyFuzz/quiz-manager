import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Logout from "../Logout/Logout";
import StyledButton from "../StyledComponents/StyledButton";
import StyledHeader from "../StyledComponents/StyledHeader";

const Body = styled.div`
  text-align: center;
`;

const StyledP = styled.p`
  color: rgb(72, 76, 122);
`;

const Main = () => {
  const { state } = useLocation();
  let navigate = useNavigate();

  return (
    <Body>
      <StyledHeader text="Home" />
      <StyledHeader text="WebbiSkools Ltd" />
      <StyledP>
        Welcome to WebbiSkools Ltd Quiz Manager, please select from the options
        below
      </StyledP>
      <StyledButton
        onClick={() => navigate("/quizzes", { state })}
        type="button"
        text="Quizzes"
      />
      <Logout />
    </Body>
  );
};

export default Main;
