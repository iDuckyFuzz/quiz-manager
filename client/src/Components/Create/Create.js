import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

async function submitQuiz(quiz) {
  return fetch("http://localhost:5000/quiz/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quiz),
  }).then((data) => data.json());
}

const Create = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [quiz, setQuiz] = useState({});
  const [questionCounter, setQuestionCounter] = useState(1);

  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [answer4, setAnswer4] = useState("");
  const [answer5, setAnswer5] = useState("");

  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox3, setCheckbox3] = useState(false);
  const [checkbox4, setCheckbox4] = useState(false);
  const [checkbox5, setCheckbox5] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      [checkbox1, checkbox2, checkbox3, checkbox4, checkbox5].includes(true)
    ) {
      let correct = [];
      let incorrect = [];

      checkbox1 ? correct.push(answer1) : incorrect.push(answer1);
      checkbox1 ? correct.push(answer1) : incorrect.push(answer1);
      checkbox2 ? correct.push(answer2) : incorrect.push(answer2);
      checkbox3 ? correct.push(answer3) : incorrect.push(answer3);
      checkbox4 ? correct.push(answer4) : incorrect.push(answer4);
      checkbox5 ? correct.push(answer5) : incorrect.push(answer5);

      let questionObj = {
        question: question,
        incorrect_answers: incorrect,
        correct_answers: correct,
      };

      setQuestions([...questions, questionObj]);
      setQuiz({ title, questions });

      console.log(questionObj);
      console.log(questions);
      console.log(quiz);

      //set all states back to false for next question
      setCheckbox1(false);
      setCheckbox2(false);
      setCheckbox3(false);
      setCheckbox4(false);
      setCheckbox5(false);

      submitQuiz(quiz);
    } else {
      window.alert("you have not selected a correct answer");
    }
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
          <input
            type="text"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Question: </label>
          <input
            type="text"
            name="question"
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div>
          <label>Answer: </label>
          <input
            type="text"
            name="answer1"
            onChange={(e) => setAnswer1(e.target.value)}
          />
          <input
            type="checkbox"
            name="checkbox1"
            defaultChecked={false}
            onChange={(e) => setCheckbox1(e.target.checked)}
          />
        </div>
        <div>
          <label>Answer: </label>
          <input
            type="text"
            name="answer2"
            onChange={(e) => setAnswer2(e.target.value)}
          />
          <input
            type="checkbox"
            name="checkbox2"
            defaultChecked={false}
            onChange={(e) => setCheckbox2(e.target.checked)}
          />
        </div>
        <div>
          <label>Answer: </label>
          <input
            type="text"
            name="answer3"
            onChange={(e) => setAnswer3(e.target.value)}
          />
          <input
            type="checkbox"
            name="checkbox3"
            defaultChecked={false}
            onChange={(e) => setCheckbox3(e.target.checked)}
          />
        </div>
        <div>
          <label>Answer: </label>
          <input
            type="text"
            name="answer4"
            onChange={(e) => setAnswer4(e.target.value)}
          />
          <input
            type="checkbox"
            name="checkbox4"
            defaultChecked={false}
            onChange={(e) => setCheckbox4(e.target.checked)}
          />
        </div>
        <div>
          <label>Answer: </label>
          <input
            type="text"
            name="answer5"
            onChange={(e) => setAnswer5(e.target.value)}
          />
          <input
            type="checkbox"
            name="checkbox5"
            defaultChecked={false}
            onChange={(e) => setCheckbox5(e.target.checked)}
          />
        </div>
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

export default Create;
