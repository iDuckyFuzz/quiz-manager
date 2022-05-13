import React from "react";
import styled from "styled-components";

const Header = styled.h1`
  color: rgb(72, 76, 122);
`;

const StyledHeader = (props) => {
  return <Header>{props.text}</Header>;
};

export default StyledHeader;
