import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const [fakeData, setfakeData] = useState([
    {
      title: "Geography Quiz",
      id: "1",
      questions: [
        {
          question: "What is the Capital Of England?",
          correct_answer: "London",
          incorrect_answer: ["Nottingham", "Birmingham", "Manchester"],
        },
        {
          question: "What is the Capital Of France?",
          correct_answer: "Paris",
          incorrect_answer: ["Nice", "Marseille", "Bordeaux"],
        },
        {
          question: "What is the Capital Of Germany?",
          correct_answer: "Berlin",
          incorrect_answer: ["Munich", "Cologne", "Dresden"],
        },
      ],
    },
    { title: "Maths Quiz", id: "2" },
    { title: "English Quiz", id: "3" },
    { title: "Capital Cities Quiz", id: "4" },
  ]);

  //we can use the params to display the correct quiz
  let params = useParams();
  const navigate = useNavigate();

  const viewAnswers = () => {
    console.log("viewAnswers");
  };

  const edit = () => {
    console.log("edit");
  };

  return (
    <>
      <h1>Quiz {params.id}</h1>
      <button onClick={() => viewAnswers()} type="button">
        View Answers
      </button>
      <button onClick={() => edit()} type="button">
        Edit
      </button>
      <div>
        {fakeData.map((data, i) => {
          if (data.id === params.id) {
            return (
              <>
                {data.questions.map((question, i) => {
                  return (
                    <div key={i}>
                      <h1>
                        {i + 1}) {question.question}
                      </h1>
                      <h3>a) {question.correct_answer}</h3>
                      <h3>b) {question.incorrect_answer[0]}</h3>
                      <h3>c) {question.incorrect_answer[1]}</h3>
                      <h3>d) {question.incorrect_answer[2]}</h3>
                    </div>
                  );
                })}
              </>
            );
          }
        })}
      </div>
      <button onClick={() => navigate("/quizzes")} type="button">
        Back
      </button>
      <input
        onClick={() => navigate("/")}
        type="submit"
        value="Logout"
        className="btn btn-primary"
      />
    </>
  );
};

export default Quiz;
