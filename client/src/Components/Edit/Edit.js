import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Logout from "../Logout/Logout";
import axios from "axios";

const Body = styled.div`
  text-align: center;
`;

const StyledInput = styled.input`
  width: 40%;
`;

const Edit = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({});

  const [updatedQuiz, setUpdatedQuiz] = useState({});
  const [quizUpdate, setQuizUpdated] = useState(false);

  const [newQ, setNewQ] = useState();
  const [newA, setNewA] = useState();
  const [correctAnswer, setCorrectAnswer] = useState();

  const [error, setError] = useState(false);

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

  const postQuizData = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = {
      title: quiz.title,
      questions: quiz.questions,
    };

    const response = await axios.post(
      `http://localhost:5000/quiz/update/${state.id}`,
      body,
      config
    );
  };

  const updateQuiz = () => {
    let array = quiz;

    array.questions.map((question) => {
      if (
        question.incorrect_answers.length + question.correct_answers.length <
        3
      ) {
        console.log(
          "cannot update, 1 or more question do not meet minimum requirements"
        );
        setError(true);
      } else {
        // setQuizUpdated(true);
        // setError(false);
        console.log("posting data");
        //postQuizData();
      }
    });
  };

  const addAnswer = (i) => {
    let array = quiz;
    if (
      array.questions[i].incorrect_answers.length +
        array.questions[i].correct_answers.length !==
      5
    ) {
      array.questions[i].incorrect_answers.push("");
      setQuiz({ ...array });
    } else {
      console.log("maximum of answers reached");
    }
  };

  const addQuestion = (e) => {
    console.log(e);
    let array = quiz;

    console.log(
      array.questions.push({
        question: "",
        incorrect_answers: [""],
        correct_answers: [],
      })
    );
    setQuiz({ ...array });
  };

  const deleteQuestion = (e) => {
    let array = quiz;
    console.log(e);
    array.questions.splice(e, 1);
    setQuiz({ ...array });
    setQuizUpdated(false);
  };

  const newAnswer = (e, i) => {
    console.log(e.target.value, i);
  };

  const newQuestion = (e, i) => {
    setNewQ(e.target.value);
  };

  const deleteAnswer = (i, answer) => {
    let array = quiz;
    if (array.questions[i].correct_answers.includes(answer)) {
      let index = array.questions[i].correct_answers.indexOf(answer);
      array.questions[i].correct_answers.splice(index, 1);
    } else if (array.questions[i].incorrect_answers.includes(answer)) {
      let index = array.questions[i].incorrect_answers.indexOf(answer);
      array.questions[i].incorrect_answers.splice(index, 1);
    }

    setQuiz({ ...array });
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
          <StyledInput defaultValue={quiz.title}></StyledInput>
        </div>
        {quiz.questions.map((questions, index) => {
          return (
            <>
              <div>
                <StyledInput
                  defaultValue={questions.question}
                  key={questions.question}
                  onChange={(e) => newQuestion(e)}
                ></StyledInput>
                <button onClick={() => deleteQuestion(index)}>x</button>
                {questions.correct_answers
                  .concat(questions.incorrect_answers)
                  .map((answer, i) => {
                    return (
                      <div>
                        <input
                          defaultValue={answer}
                          key={answer}
                          onChange={(e) => newAnswer(e, i)}
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
                <button onClick={() => addAnswer(index)}>+</button>
              </div>
            </>
          );
        })}
        <div>
          <button onClick={() => addQuestion()}>Add Question</button>
        </div>
        {error && <h3>Unable to update</h3>}
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
