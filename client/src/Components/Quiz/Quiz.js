import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Logout from "../Logout/Logout";

const Body = styled.div`
  text-align: center;
`;

const mixAnswers = (answersArray) => {
  let currentIndex = answersArray.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
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
  let { state } = useLocation();
  let params = useParams();
  state = { ...state, id: params.id };
  const [realData, setRealData] = useState([]);
  const [shuffledAnswers, setshuffledAnswers] = useState([]);
  const [buttonText, setbuttonText] = useState("View Answers");
  const [showAnswers, setShowAnswers] = useState(false);
  const [editable, setEditable] = useState(false);

  //we can use the params to display the correct quiz
  const navigate = useNavigate();

  const fetchQuiz = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.get(
      `http://localhost:5000/quiz/${params.id}`,
      config
    );

    setRealData(response.data);
  };

  //will run once when the page has loaded
  useEffect(() => {
    fetchQuiz();
  }, []);

  const viewAnswers = () => {
    if (showAnswers) {
      setbuttonText("Show Answers");
      setShowAnswers(false);
    } else {
      setbuttonText("Hide Answers");
      setShowAnswers(true);
    }
  };

  return (
    <Body>
      <h1>{realData.title}</h1>
      {(state.canEdit || state.viewAnswers) && (
        <button onClick={() => viewAnswers()} type="button">
          {buttonText}
        </button>
      )}

      {state.canEdit && (
        <button onClick={() => navigate("/edit", { state })} type="button">
          Edit
        </button>
      )}

      {realData.questions &&
        realData.questions.map((question, index) => {
          const shuffledAnswers = mixAnswers([
            question.correct_answers,
            ...question.incorrect_answers,
          ]);
          return (
            <div>
              {!showAnswers && (
                <>
                  <h2>
                    {index + 1}. {question.question}
                  </h2>
                  {shuffledAnswers.map((answer, i) => {
                    const answerOrder = ["a", "b", "c", "d", "e"];
                    return (
                      <h3>
                        {answerOrder[i]}) {answer}
                      </h3>
                    );
                  })}
                </>
              )}
              {showAnswers && (
                <>
                  <h2>
                    {index + 1}. {question.question}
                  </h2>
                  {shuffledAnswers.map((answer) => {
                    if ([question.correct_answers].includes(answer)) {
                      return <h3>{answer}</h3>;
                    }
                  })}
                </>
              )}
            </div>
          );
        })}
      <button onClick={() => navigate("/quizzes", { state })} type="button">
        Back
      </button>
      <Logout />
    </Body>
  );
};

export default Quiz;
