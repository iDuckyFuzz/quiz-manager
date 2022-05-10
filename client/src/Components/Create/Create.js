import React from "react";
import { useNavigate } from "react-router";

function Create() {
  const navigate = useNavigate();

  const addQuestion = () => {
    console.log("addQuestion");
  };
  return (
    <>
      <div>
        <label>Title: </label>
        <input type="text" />
      </div>
      <div>
        <label>Question: </label>
        <input type="text" />
      </div>
      <div class="form-group" id="deadline">
        <label>Answer: </label>
        <input type="text" />
        <input type="checkbox" />
      </div>
      <div class="form-group" id="deadline">
        <label>Answer: </label>
        <input type="text" />
        <input type="checkbox" />
      </div>
      <div class="form-group" id="deadline">
        <label>Answer: </label>
        <input type="text" />
        <input type="checkbox" />
      </div>
      <div class="form-group" id="deadline">
        <label>Answer: </label>
        <input type="text" />
        <input type="checkbox" />
      </div>
      <div class="form-group" id="deadline">
        <label>Answer: </label>
        <input type="text" />
        <input type="checkbox" />
      </div>
      <div class="form-group" id="deadline">
        <label>Answer: </label>
        <input type="text" />
        <input type="checkbox" />
      </div>
      <div>
        <button onClick={() => addQuestion()}>Add Question</button>
      </div>
      <input type="submit" value="Submit" />
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
