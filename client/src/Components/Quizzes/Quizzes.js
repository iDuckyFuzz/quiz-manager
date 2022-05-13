import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router";
import axios from "axios";
import Logout from "../Logout/Logout";

const QuizLink = styled.h3`
  font-size: 1.5em;
  text-align: center;
  border-radius: 3px;
  border: 1px solid;
  width: 60%;
  &:hover {
    background-color: grey;
  }
  margin-left: auto;
  margin-right: auto;
`;

const Body = styled.div`
  text-align: center;
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
        <h1>Quizzes</h1>

        {state.canEdit && (
          <div>
            <button onClick={() => createQuiz()} type="button">
              Create
            </button>
            <button onClick={() => enableDelete()} type="button">
              Delete
            </button>
          </div>
        )}
        <div>
          {realData.map((quiz, i) => {
            return (
              <>
                <QuizLink
                  onClick={() => navigate(`/quiz/${quiz._id}`, { state })}
                  className="quiz"
                  key={i}
                >
                  {quiz.title}
                </QuizLink>
                {removeQuiz && (
                  <button onClick={() => deleteQuiz(quiz._id)}>X</button>
                )}
              </>
            );
          })}
        </div>
        <input
          onClick={() => navigate("/home", { state })}
          type="submit"
          value="Back"
          className="btn btn-primary"
        />
        <Logout />
      </Body>
    );
  }
};

export default Quizzes;
