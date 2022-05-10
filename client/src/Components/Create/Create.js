import React, { useState } from "react";
import { useNavigate } from "react-router";

const Create = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [quiz, setQuiz] = useState({});
  const [questionCounter, setQuestionCounter] = useState(1);

  const addQuiz = async () => {
    const response = await fetch(`http://localhost:5000/quiz/add`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quiz),
    }).catch((error) => {
      window.alert(error);
      return;
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.title.value);

    let correct = [];
    let incorrect = [];

    e.target.checkbox1.checked
      ? correct.push(e.target.answer1.value)
      : incorrect.push(e.target.answer1.value);
    e.target.checkbox2.checked
      ? correct.push(e.target.answer2.value)
      : incorrect.push(e.target.answer2.value);
    e.target.checkbox3.checked
      ? correct.push(e.target.answer3.value)
      : incorrect.push(e.target.answer3.value);
    e.target.checkbox4.checked
      ? correct.push(e.target.answer4.value)
      : incorrect.push(e.target.answer4.value);
    e.target.checkbox5.checked
      ? correct.push(e.target.answer5.value)
      : incorrect.push(e.target.answer5.value);

    let question = {
      question: e.target.question.value,
      incorrect_answers: incorrect,
      correct_answers: correct,
    };

    setQuestions([...questions, question]);
    setQuiz({ title: e.target.title.value, questions });

    addQuiz();
  };

  const addQuestion = () => {
    console.log("addQuestion" + questionCounter);
    setQuestionCounter(questionCounter + 1);
  };
  return (
    <>
      <h1>Create</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Title: </label>
          <input type="text" name="title" />
        </div>
        <Question></Question>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
      <div>
        <button onClick={() => addQuestion()}>Add Question</button>
      </div>
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
};

const Question = () => {
  return (
    <>
      <div>
        <label>Question: </label>
        <input type="text" name="question" />
      </div>
      <div>
        <label>Answer: </label>
        <input type="text" name="answer1" />
        <input type="checkbox" name="checkbox1" />
      </div>
      <div>
        <label>Answer: </label>
        <input type="text" name="answer2" />
        <input type="checkbox" name="checkbox2" />
      </div>
      <div>
        <label>Answer: </label>
        <input type="text" name="answer3" />
        <input type="checkbox" name="checkbox3" />
      </div>
      <div>
        <label>Answer: </label>
        <input type="text" name="answer4" />
        <input type="checkbox" name="checkbox4" />
      </div>
      <div>
        <label>Answer: </label>
        <input type="text" name="answer5" />
        <input type="checkbox" name="checkbox5" />
      </div>
    </>
  );
};

export default Create;
