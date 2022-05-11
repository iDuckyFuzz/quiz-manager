import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  let navigate = useNavigate();

  const logout = async () => {
    //delete session cookie
    await axios.get("http://localhost:5000/logout");
    navigate("/");
  };

  return (
    <button onClick={logout} type="button">
      Logout
    </button>
  );
};

export default Logout;
