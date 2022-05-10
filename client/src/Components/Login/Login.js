import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const Body = styled.div`
  text-align: center;
`;

const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  const updateForm = (value) => {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  };

  // This function will handle the submission.
  const onSubmit = async (e) => {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const user = { ...form };

    const response = await fetch("http://localhost:5000/user", {
      method: "GET",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());

    setForm({ username: "", password: "" });
    console.log(response);
    //navigate("/home");
  };

  // This following section will display the form that takes the input from the user.
  return (
    <Body>
      <h1>WebbiSkools Ltd</h1>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={form.username}
            onChange={(e) => updateForm({ username: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input
            type="text"
            className="form-control"
            id="password"
            value={form.password}
            onChange={(e) => updateForm({ password: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Login" className="btn btn-primary" />
        </div>
      </form>
    </Body>
  );
};

export default Login;
