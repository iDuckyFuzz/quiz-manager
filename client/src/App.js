import "./App.css";
import Login from "./Components/Login/Login";
import Quiz from "./Components/Quiz/Quiz";
import Quizzes from "./Components/Quizzes/Quizzes";
import Main from "./Components/Main/Main";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Main />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/quizzes" element={<Quizzes />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
