import React, { useState } from "react";
import { Route, useHistory } from "react-router-dom";
import Navigation from "./Navigation";


import axios from "axios";
import "../app.css";

const Login = () => {
  const history = useHistory();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [loggedIn,setLoggedIn] = useState(false)


  const FunReq = () => {
    axios
      .post("http://localhost:5000/login", { email, password })
      .then((res) => {
            console.log(res);
        setToken(res.data.token);
        setLoggedIn(true)
        // {result2? "/login"    : "/dashboard" }
        history.push("/dashboard");
      })
      .catch((err) => {
        console.log({err});
      });
  };

  return (
    <>
    <Navigation loggedIn={loggedIn}/>
      <div className="logged">
        <h5></h5>
        <input
          type="text"
          placeholder="email here"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password here"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button onClick={FunReq}>Login</button>
      </div>
    </>
  );
};


export default Login;
