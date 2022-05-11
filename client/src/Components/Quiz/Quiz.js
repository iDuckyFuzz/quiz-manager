import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

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

const Quiz = (props) => {
  let params = useParams();
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

  const edit = () => {
    console.log("edit");
  };

  return (
    <Body>
      <h1>{realData.title}</h1>
      {props.permissions === "View" || props.permissions === "Edit" ? (
        <button onClick={() => viewAnswers()} type="button">
          {buttonText}
        </button>
      ) : null}

      {props.permissions === "Edit" && (
        <button onClick={() => edit()} type="button">
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
