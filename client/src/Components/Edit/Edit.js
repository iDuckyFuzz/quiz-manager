import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Logout from "../Logout/Logout";
import axios from "axios";

const Body = styled.div`
  text-align: center;
`;

const Edit = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({});

  const [updatedQuiz, setUpdatedQuiz] = useState({});
  const [quizUpdate, setQuizUpdated] = useState(false);

  const fetchQuizzes = async (state) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.get(
      `http://localhost:5000/quiz/${state.id}`,
      config
    );

    setQuiz(response.data);
  };

  const updateQuiz = () => {
    console.log(quiz);
    setQuizUpdated(true);
  };

  const deleteQuestion = (e) => {
    console.log("deleteQuestion ", quiz.questions[e]);
    console.log(e);

    let array = quiz;
    console.log(e);
    if (array.questions.includes(quiz.questions[e])) {
      array.questions.splice(e, 1);
    }
    setQuiz(array);
    setQuizUpdated(false);
  };

  const deleteAnswer = (i, answer) => {
    console.log("deleteAnswer", i, answer);

    let array = quiz;

    console.log(i, answer);

    if (array.questions[i].correct_answers.includes(answer)) {
      let index = array.questions[i].correct_answers.indexOf(answer);
      array.questions[i].correct_answers.splice(index, 1);
    } else if (array.questions[i].incorrect_answers.includes(answer)) {
      let index = array.questions[i].incorrect_answers.indexOf(answer);
      array.questions[i].incorrect_answers.splice(index, 1);
    }

    setQuiz(array);
    setQuizUpdated(false);
  };

  //will run once when the page has loaded
  useEffect(() => {
    fetchQuizzes(state);
  }, []);

  if (quiz.questions) {
    return (
      <Body>
        <h1>Edit</h1>
        <div>
          <input defaultValue={quiz.title}></input>
        </div>
        {quiz.questions.map((questions, index) => {
          return (
            <div>
              <input
                defaultValue={questions.question}
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              ></input>
              <button onClick={() => deleteQuestion(index)}>x</button>
              {questions.correct_answers
                .concat(questions.incorrect_answers)
                .map((answer) => {
                  return (
                    <div>
                      <input
                        defaultValue={answer}
                        onChange={(e) => {
                          console.log(e.target.value);
                        }}
                      ></input>
                      <input
                        defaultChecked={questions.correct_answers.includes(
                          answer
                        )}
                        onChange={(e) => {
                          console.log(e.target.checked);
                        }}
                        type="checkbox"
                      ></input>
                      <button onClick={() => deleteAnswer(index, answer)}>
                        x
                      </button>
                    </div>
                  );
                })}
            </div>
          );
        })}
        <div>
          <button onClick={() => updateQuiz()}>Update Quiz</button>
        </div>
        <div>
          <button
            onClick={() => navigate(`/quiz/${state.id}`, { state })}
            type="button"
          >
            Back to View Quiz
          </button>
        </div>
      </Body>
    );
  }
};

export default Edit;
