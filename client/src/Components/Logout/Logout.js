import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  return (
    <button onClick={logout} type="button">
      Logout
    </button>
  );
};

export default Logout;
