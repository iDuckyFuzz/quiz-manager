import React from "react";
import { useParams } from "react-router-dom";

const Quiz = () => {
  //we can use the params to display the correct quiz
  let params = useParams();

  return <h1>Quiz {params.id}</h1>;
};

export default Quiz;
