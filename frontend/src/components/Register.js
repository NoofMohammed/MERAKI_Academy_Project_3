import React, { useState } from "react";
import Navigation from "./Navigation";

 

import axios from "axios";
import "../app.css";


const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");

  const newData = () => {
    axios
      .post("http://localhost:5000/users", {
        firstName,
        lastName,
        age,
        country,
        email,
        password,
      })
      .then((res) => {
        console.log("The user has been created successfully");
        setResult("The user has been created successfully");
      })
      .catch((err) => {
        console.log("Error happened while register, please try again");
        setResult("Error happened while register, please try again");
      });
  };
  return (
    <>
    <Navigation/>
      <div className="data">
        <h5>Register:</h5>
        <input
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          type="text"
          placeholder="firstName here"
        />
        <input
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          type="text"
          placeholder="lastName here"
        />
        <input
          onChange={(e) => {
            setAge(e.target.value);
          }}
          type="number"
          placeholder="age here"
        />
        <input
          onChange={(e) => {
            setCountry(e.target.value);
          }}
          type="text"
          placeholder="country here"
        />
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="text"
          placeholder="email here"
        />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="password here"
        />
        <button onClick={newData}>Register</button>

        <div>
          <p>{result}</p>
        </div>
      </div>
    </>
  );
};

export default Register;
