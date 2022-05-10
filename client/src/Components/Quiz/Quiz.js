import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Body = styled.div`
  text-align: center;
`;

const mixAnswers = (answersArray) => {
  let currentIndex = answersArray.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [answersArray[currentIndex], answersArray[randomIndex]] = [
      answersArray[randomIndex],
      answersArray[currentIndex],
    ];
  }

  return answersArray;
};

const Quiz = () => {
  let params = useParams();
  const [realData, setRealData] = useState({});

  async function fetchQuiz() {
    const response = await fetch(`http://localhost:5000/quiz/${params.id}`, {
      method: "GET",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());

    setRealData(response);
  }

  //will run once when the page has loaded
  useEffect(() => {
    fetchQuiz();
  }, []);

  const [buttonText, setbuttonText] = useState("View Answers");
  const [showAnswers, setShowAnswers] = useState(false);
  const [editable, setEditable] = useState(false);

  //we can use the params to display the correct quiz
  const navigate = useNavigate();

  const viewAnswers = () => {
    if (showAnswers) {
      setbuttonText("Show Answers");
      setShowAnswers(false);
    } else {
      setbuttonText("Hide Answers");
      setShowAnswers(true);
    }
    console.log("viewAnswers");
  };

  const edit = () => {
    console.log("edit");
  };

  return (
    <Body>
      <h1>{realData.title}</h1>
      <button onClick={() => viewAnswers()} type="button">
        {buttonText}
      </button>
      <button onClick={() => edit()} type="button">
        Edit
      </button>
      {realData.questions &&
        realData.questions.map((question, index) => {
          const shuffledAnswers = mixAnswers([
            question.correct_answer,
            ...question.incorrect_answers,
          ]);
          return (
            <>
              <h2>{question.question}</h2>
              <h3>a) {shuffledAnswers[0]}</h3>
              <h3>b) {shuffledAnswers[1]}</h3>
              <h3>c) {shuffledAnswers[2]}</h3>
              <h3>d) {shuffledAnswers[3]}</h3>
            </>
          );
        })}
      <button onClick={() => navigate("/quizzes")} type="button">
        Back
      </button>
      <input
        onClick={() => navigate("/")}
        type="submit"
        value="Logout"
        className="btn btn-primary"
      />
    </Body>
  );
};

export default Quiz;
