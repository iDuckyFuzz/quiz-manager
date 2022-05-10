import React from "react";
import { useNavigate } from "react-router";

function Create() {
  const navigate = useNavigate();
  return (
    <>
      <h1>Create</h1>
      <button onClick={() => navigate("/quizzes")} type="button">
        Back
      </button>
      <input
        onClick={() => navigate("/")}
        type="submit"
        value="Logout"
        className="btn btn-primary"
      />
    </>
  );
}

export default Create;
