import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

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
  const [quizzes, setQuizzes] = useState([
    { title: "Geography Quiz", id: "1" },
    { title: "Maths Quiz", id: "2" },
    { title: "English Quiz", id: "3" },
    { title: "Capital Cities Quiz", id: "4" },
  ]);

  const navigate = useNavigate();

  return (
    <Body>
      <h1>Quizzes</h1>
      <div>
        {quizzes.map((quiz, i) => {
          return (
            <QuizLink
              onClick={() => navigate(`/quiz/${quiz.id}`)}
              className="quiz"
              key={i}
            >
              {quiz.title}
            </QuizLink>
          );
        })}
      </div>
      <input
        onClick={() => navigate("/home")}
        type="submit"
        value="Back"
        className="btn btn-primary"
      />
      <input
        onClick={() => navigate("/")}
        type="submit"
        value="Logout"
        className="btn btn-primary"
      />
    </Body>
  );
};

export default Quizzes;
