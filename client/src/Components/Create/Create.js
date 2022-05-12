import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import axios from "axios";

async function submitQuiz(quiz) {
  const body = {
    quiz,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(
    "http://localhost:5000/quiz/add",
    body,
    config
  );
}

const Create = () => {
  const { state } = useLocation();

  const navigate = useNavigate();
  const [questions, setQuestions] = useState([
    {
      question: "",
      incorrect_answers: ["", "", "", "", ""],
      correct_answers: ["", "", "", "", ""],
    },
  ]);
  const [quiz, setQuiz] = useState({});

  const [questionCounter, setQuestionCounter] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);

  const [firstSubmission, setFirstSubmission] = useState(true);

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

      if (correct.length + incorrect.length < 3) {
        window.alert("3 is the minimum amount of answers");
      }

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

      //submitQuiz(quiz);
      e.target.reset();
    } else {
      window.alert("you have not selected a correct answer");
    }
  };

  const submitQuiz = () => {
    console.log("addQuestion" + questionCounter);
    setQuestionCounter(questionCounter + 1);
  };

  const addQuestion = (e) => {
    e.preventDefault();
    if (firstSubmission) {
    }
    console.log("addQuestion" + questionCounter);
    setQuestionCounter(questionCounter + 1);
    setQuestionNumber(questionNumber + 1);
    console.log(checkbox1, checkbox2, checkbox3, checkbox4, checkbox5);

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

      if (correct.length + incorrect.length < 3) {
        window.alert("3 is the minimum amount of answers");
      }

      //set all states back to false for next question
      setCheckbox1(false);
      setCheckbox2(false);
      setCheckbox3(false);
      setCheckbox4(false);
      setCheckbox5(false);

      setQuestions([...questions, questionObj]);
    }

    e.target.reset();
  };

  const previousQuestion = () => {
    console.log("questionNumber" + questionNumber);
    if (questionNumber > 1) {
      setQuestionNumber(questionNumber - 1);
      console.log(questions);
    }
  };

  const nextQuestion = () => {
    console.log("next question", questionCounter, questionNumber);
    if (questionCounter >= questionNumber) {
      console.log("questionNumber" + questionNumber);
      setQuestionNumber(questionNumber + 1);
      console.log(questions);
    }
  };

  return (
    <>
      <h1>Create</h1>
      {questionNumber === 1 && (
        <div>
          <label>Title: </label>
          <input
            type="text"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      )}
      <h3>Question Number {questionNumber}</h3>
      <form onSubmit={addQuestion}>
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
          <input type="submit" value="Add Question" />
        </div>
      </form>
      {questionNumber !== 1 && (
        <div>
          <button onClick={() => previousQuestion()}>Previous Question</button>
        </div>
      )}
      {questionCounter !== 0 && (
        <div>
          <button onClick={() => nextQuestion()}>Next Question</button>
        </div>
      )}
      <button onClick={() => navigate("/quizzes", { state })} type="button">
        Back to Quizzes
      </button>
      <div>
        <button onClick={() => submitQuiz()}>Submit</button>
      </div>
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
