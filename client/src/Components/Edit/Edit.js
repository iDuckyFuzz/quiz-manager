import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Logout from "../Logout/Logout";
import axios from "axios";
import StyledButton from "../StyledComponents/StyledButton";
import StyledHeader from "../StyledComponents/StyledHeader";

const Body = styled.div`
  text-align: center;
  width: 60%;
  margin: auto;
`;

const StyledInput = styled.input`
  width: 40%;
`;

const StyledContainer = styled.div`
  margin-top: 10px;
`;

const Edit = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({});

  const [quizUpdate, setQuizUpdated] = useState(false);

  const [newQ, setNewQ] = useState();

  const [newA1, setNewA1] = useState("");
  const [newA2, setNewA2] = useState("");
  const [newA3, setNewA3] = useState("");
  const [newA4, setNewA4] = useState("");
  const [newA5, setNewA5] = useState("");

  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [check5, setCheck5] = useState(false);

  const [newestQuestion, setNewestQuestion] = useState();
  const [isFirstNewQuestion, setIsFirstNewQuesiton] = useState(true);
  const [lastQuestionAdded, setLastQuestionAdded] = useState(false);

  const [quizLength, setQuizLength] = useState();
  const [previousQuizLength, setPreviousQuizLength] = useState();

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [quizTitle, setQuizTitle] = useState("");

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
    setQuizLength(response.data.questions.length);
    setPreviousQuizLength(response.data.questions.length);
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

    quiz.title = quizTitle ? quizTitle : quiz.title;

    setQuizLength(quiz.questions.length);

    if (!lastQuestionAdded && quizLength > previousQuizLength) {
      array.questions.pop();

      array.questions.push(newestQuestion);
      setLastQuestionAdded(true);
      setPreviousQuizLength(quiz.questions.length);
    } else {
      //edit existing quiz questions
    }

    if (!isFirstNewQuestion) {
      let array = quiz;
      array.questions.pop();
      console.log(newestQuestion);

      array.questions.push(newestQuestion);

      setQuiz({ ...array });
    }

    array.questions.map((question) => {
      if (
        question.incorrect_answers.length + question.correct_answers.length <
        3
      ) {
        setError(true);
        setErrorMessage(
          "cannot update, 1 or more question do not meet minimum requirements"
        );
      }
    });

    if (!error) {
      postQuizData();
    }
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
    setLastQuestionAdded(false);
    if (!isFirstNewQuestion) {
      let array = quiz;
      array.questions.pop();
      console.log(newestQuestion);

      array.questions.push(newestQuestion);
      setQuiz({ ...array });
    }
    setIsFirstNewQuesiton(false);

    let array = quiz;
    array.questions.push({
      question: "",
      incorrect_answers: [""],
      correct_answers: [],
    });
    setQuiz({ ...array });
  };

  const deleteQuestion = (e) => {
    let array = quiz;
    array.questions.splice(e, 1);
    setQuiz({ ...array });
    setQuizUpdated(false);
  };

  const setAnswer = (e, i) => {
    let correct = [];
    let incorrect = [];
    console.log("changes: ", e.target.value);

    if (e.target.type === "text") {
      switch (i) {
        case 0:
          setNewA1(e.target.value);
          break;
        case 1:
          setNewA2(e.target.value);
          break;
        case 2:
          setNewA3(e.target.value);
          break;
        case 3:
          setNewA4(e.target.value);
          break;
        case 4:
          setNewA5(e.target.value);
          break;
      }
    } else if (e.target.type === "checkbox") {
      switch (i) {
        case 0:
          setCheck1(e.target.checked);
          break;
        case 1:
          setCheck2(e.target.checked);
          break;
        case 2:
          setCheck3(e.target.checked);
          break;
        case 3:
          setCheck4(e.target.checked);
          break;
        case 4:
          setCheck5(e.target.checked);
          break;
      }
    }

    let answers = [newA1, newA2, newA3, newA4, newA5];

    answers.forEach((answer, i) => {
      if (answer) {
        if (i === 0) {
          check1 ? correct.push(answer) : incorrect.push(answer);
        } else if (i === 1) {
          check2 ? correct.push(answer) : incorrect.push(answer);
        } else if (i === 2) {
          check3 ? correct.push(answer) : incorrect.push(answer);
        } else if (i === 3) {
          check4 ? correct.push(answer) : incorrect.push(answer);
        } else if (i === 4) {
          check5 ? correct.push(answer) : incorrect.push(answer);
        }
      }
    });

    let question = {
      question: newQ,
      correct_answers: correct,
      incorrect_answers: incorrect,
    };

    setNewestQuestion({ ...question });
  };

  const newQuestion = (e, i) => {
    let array = quiz;
    array.questions[i].question = e.target.value;
    setQuiz(array);
  };

  const updateTitle = (e) => {
    setQuizTitle(e.target.value);
  };

  const deleteAnswer = (index, answer, i) => {
    let array = quiz;
    if (array.questions[index].correct_answers.includes(answer)) {
      let indexOf = array.questions[index].correct_answers.indexOf(answer);
      array.questions[index].correct_answers.splice(indexOf, 1);
    } else if (array.questions[index].incorrect_answers.includes(answer)) {
      let indexOf = array.questions[index].incorrect_answers.indexOf(answer);
      array.questions[index].incorrect_answers.splice(indexOf, 1);
    }
    switch (i) {
      case 0:
        setNewA1("");
        setCheck1(false);
        break;
      case 1:
        setNewA2("");
        setCheck2(false);
        break;
      case 2:
        setNewA3("");
        setCheck3(false);
        break;
      case 3:
        setNewA4("");
        setCheck4(false);
        break;
      case 4:
        setNewA5("");
        setCheck5(false);
        break;
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
        <StyledHeader text="Edit" />
        <div>
          <label>Title: </label>
          <StyledInput
            defaultValue={quiz.title}
            onChange={(e) => updateTitle(e)}
          ></StyledInput>
        </div>
        {quiz.questions.map((questions, index) => {
          return (
            <>
              <div>
                <label>Question {index + 1}: </label>
                <StyledInput
                  defaultValue={questions.question}
                  key={questions.question}
                  onChange={(e, i) => newQuestion(e, index)}
                ></StyledInput>
                <StyledButton
                  onClick={() => deleteQuestion(index)}
                  type="button"
                  text="X"
                />
                {questions.correct_answers
                  .concat(questions.incorrect_answers)
                  .map((answer, i) => {
                    return (
                      <StyledContainer>
                        <label>Answer {i + 1}: </label>
                        <StyledInput
                          defaultValue={answer}
                          key={answer}
                          onChange={(e) => setAnswer(e, i)}
                        ></StyledInput>
                        <StyledInput
                          defaultChecked={questions.correct_answers.includes(
                            answer
                          )}
                          onChange={(e) => setAnswer(e, i)}
                          type="checkbox"
                        ></StyledInput>
                        <StyledButton
                          onClick={() => deleteAnswer(index, answer, i)}
                          text="X"
                          type="button"
                        />
                      </StyledContainer>
                    );
                  })}
                <StyledButton
                  onClick={() => addAnswer(index)}
                  text="Add Answer"
                  type="button"
                />
              </div>
            </>
          );
        })}
        <StyledContainer>
          <StyledButton
            onClick={() => addQuestion()}
            text="Add Question"
            type="button"
          />
        </StyledContainer>
        {error && <h3>{errorMessage}</h3>}
        <StyledContainer>
          <StyledButton
            onClick={() => updateQuiz()}
            text="Update Quiz"
            type="button"
          />
        </StyledContainer>
        <StyledContainer>
          <StyledButton
            onClick={() => navigate(`/quiz/${state.id}`, { state })}
            type="button"
            text="Back to View Quiz"
          />
          <Logout />
        </StyledContainer>
      </Body>
    );
  }
};

export default Edit;
