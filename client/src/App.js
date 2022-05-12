import "./App.css";
import Login from "./Components/Login/Login";
import Quiz from "./Components/Quiz/Quiz";
import Quizzes from "./Components/Quizzes/Quizzes";
import Main from "./Components/Main/Main";
import Create from "./Components/Create/Create";
import Edit from "./Components/Edit/Edit";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Main />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
