import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router";
import axios from "axios";
import Logout from "../Logout/Logout";
import StyledButton from "../StyledComponents/StyledButton";
import StyledHeader from "../StyledComponents/StyledHeader";

const QuizLink = styled.h3`
  font-size: 1.5em;
  text-align: center;
  border-radius: 3px;
  border: 1px solid;
  width: 80%;
  color: rgb(72, 76, 122);
  border-radius: 50px;
  background-image: linear-gradient(180deg, #fff, #f5f5fa);
  box-shadow: 0 4px 11px 0 rgb(37 44 97 / 15%),
    0 1px 3px 0 rgb(93 100 148 / 20%);
  transition: all 0.2s ease-out;
  :hover {
    box-shadow: 0 8px 22px 0 rgb(37 44 97 / 15%),
      0 4px 6px 0 rgb(93 100 148 / 20%);
  }
  margin-left: auto;
  margin-right: auto;
`;

const Body = styled.div`
  text-align: center;
`;

const StyledDiv = styled.div`
  display: flex;
  width: 30%;
  text-align: center;
  margin: auto;
`;

const Quizzes = () => {
  let { state } = useLocation();
  const navigate = useNavigate();
  const [realData, setRealData] = useState([]);
  const [removeQuiz, setRemoveQuiz] = useState(false);

  const fetchQuizzes = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.get(`http://localhost:5000/quiz/`, config);

    setRealData(response.data);
  };

  //will run once when the page has loaded
  useEffect(() => {
    fetchQuizzes();
  }, []);

  const enableDelete = () => {
    if (removeQuiz) {
      setRemoveQuiz(false);
    } else {
      setRemoveQuiz(true);
    }
  };

  const createQuiz = async () => {
    let quiz = {
      title: "New Quiz Title",
      questions: [
        {
          question: "New Question",
          correct_answers: ["Correct Answer"],
          incorrect_answers: ["Incorrect Answer", "Another Incorrect Answer"],
        },
      ],
    };

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

    state = { ...state, id: response.data._id };

    navigate("/edit", { state });
  };

  const deleteQuiz = async (id) => {
    console.log(id);
    await fetch(`http://localhost:5000/quiz/delete/${id}`, {
      method: "DELETE",
    });
    fetchQuizzes();
  };
  if (realData) {
    return (
      <Body>
        <StyledHeader text="Quizzes" />

        {state.canEdit && (
          <div>
            <StyledButton
              onClick={() => createQuiz()}
              type="button"
              text="Create"
            />
            <StyledButton
              onClick={() => enableDelete()}
              type="button"
              text="Delete"
            />
          </div>
        )}
        <div>
          {realData.map((quiz, i) => {
            return (
              <StyledDiv>
                <QuizLink
                  onClick={() => navigate(`/quiz/${quiz._id}`, { state })}
                  className="quiz"
                  key={i}
                >
                  {quiz.title}
                </QuizLink>
                {removeQuiz && (
                  <StyledButton
                    onClick={() => deleteQuiz(quiz._id)}
                    text="X"
                    type="button"
                  />
                )}
              </StyledDiv>
            );
          })}
        </div>
        <StyledButton
          onClick={() => navigate("/home", { state })}
          type="submit"
          text="Back"
          className="btn btn-primary"
        />
        <Logout />
      </Body>
    );
  }
};

export default Quizzes;
