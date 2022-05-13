import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StyledButton from "../StyledComponents/StyledButton";

const Logout = () => {
  let navigate = useNavigate();

  const logout = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    await axios.post("http://localhost:5000/logout", config);
    navigate("/");
  };

  return <StyledButton onClick={logout} type="button" text="Logout" />;
};

export default Logout;
