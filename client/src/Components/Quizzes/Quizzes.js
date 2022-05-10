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

const Quizzes = (props) => {
  const navigate = useNavigate();
  const [realData, setRealData] = useState([]);
  const [removeQuiz, setRemoveQuiz] = useState(false);

  const fetchQuizzes = async () => {
    const response = await fetch("http://localhost:5000/quiz", {
      method: "GET",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());

    setRealData(response);
  };

  //will run once when the page has loaded
  useEffect(() => {
    fetchQuizzes();
  }, []);

  const enableDelete = () => {
    console.log("deleteQuiz");

    if (removeQuiz) {
      setRemoveQuiz(false);
    } else {
      setRemoveQuiz(true);
    }
  };

  const deleteQuiz = async (id) => {
    console.log("this is happening");
    const response = await fetch(`http://localhost:5000/quiz/delete/${id}`, {
      method: "DELETE",
    });
    console.log(response);
  };

  return (
    <Body>
      <h1>Quizzes</h1>

      {props.permissions === "View" || props.permissions === "Edit" ? (
        <button onClick={() => navigate("/create")} type="button">
          Create
        </button>
      ) : null}

      {props.permissions === "Edit" && (
        <button onClick={() => enableDelete()} type="button">
          Delete
        </button>
      )}
      <div>
        {realData.map((quiz, i) => {
          return (
            <>
              <QuizLink
                onClick={() => navigate(`/quiz/${quiz._id}`)}
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
