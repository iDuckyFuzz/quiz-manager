import React, { useState, useEffect } from "react";
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
  const navigate = useNavigate();
  const [realData, setRealData] = useState([]);

  async function fetchQuizzes() {
    const response = await fetch("http://localhost:5000/quiz", {
      method: "GET",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());

    setRealData(response);
  }

  //will run once when the page has loaded
  useEffect(() => {
    fetchQuizzes();
  }, []);

  console.log(realData);
  realData.map((data) => {
    console.log(data);
  });

  const [quizzes, setQuizzes] = useState([
    { title: "Geography Quiz", id: "1" },
    { title: "Maths Quiz", id: "2" },
    { title: "English Quiz", id: "3" },
    { title: "Capital Cities Quiz", id: "4" },
  ]);

  return (
    <Body>
      <h1>Quizzes</h1>
      <div>
        {realData.map((quiz, i) => {
          return (
            <QuizLink
              onClick={() => navigate(`/quiz/${quiz._id}`)}
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
