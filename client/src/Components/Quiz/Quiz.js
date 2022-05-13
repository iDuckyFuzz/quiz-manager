import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Logout from "../Logout/Logout";
import StyledButton from "../StyledComponents/StyledButton";
import StyledHeader from "../StyledComponents/StyledHeader";

const Body = styled.div`
  text-align: center;
`;

const StyledH2 = styled.h2`
  color: rgb(72, 76, 122);
`;

const StyledH3 = styled.h3`
  color: rgb(72, 76, 122);
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
  const [buttonText, setbuttonText] = useState("View Answers");
  const [showAnswers, setShowAnswers] = useState(false);

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
      <StyledHeader text={realData.title} />
      {(state.canEdit || state.viewAnswers) && (
        <StyledButton
          onClick={() => viewAnswers()}
          type="button"
          text={buttonText}
        />
      )}

      {state.canEdit && (
        <StyledButton
          onClick={() => navigate("/edit", { state })}
          type="button"
          text="Edit"
        />
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
                  <StyledH2>
                    {index + 1}. {question.question}
                  </StyledH2>
                  {shuffledAnswers.map((answer, i) => {
                    const answerOrder = ["a", "b", "c", "d", "e"];
                    return (
                      <StyledH3>
                        {answerOrder[i]}) {answer}
                      </StyledH3>
                    );
                  })}
                </>
              )}
              {showAnswers && (
                <>
                  <StyledH2>
                    {index + 1}. {question.question}
                  </StyledH2>
                  {shuffledAnswers.map((answer) => {
                    if ([question.correct_answers].includes(answer)) {
                      return <StyledH3>{answer}</StyledH3>;
                    }
                  })}
                </>
              )}
            </div>
          );
        })}
      <StyledButton
        onClick={() => navigate("/quizzes", { state })}
        type="button"
        text="Back"
      />
      <Logout />
    </Body>
  );
};

export default Quiz;
