import React, { useEffect, useState } from "react";
import axios from "axios";
import "./app.css";

// jsx
const App = () => {
  const [users, setUsers] = useState([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      .then((res) => {});
  };

  return (
    <>
      <h4>login Register</h4>
      <div class="data">
        <input
          onChange={(e) => {
            setUsers(e.target.value);
          }}
          type="text"
          placeholder={firstName}
        />
        <input
          onChange={(e) => {
            setUsers(e.target.value);
          }}
          type="text"
          placeholder={lastName}
        />
        <input
          onChange={(e) => {
            setUsers(e.target.value);
          }}
          type="number"
          placeholder={age}
        />
        <input
          onChange={(e) => {
            setUsers(e.target.value);
          }}
          type="text"
          placeholder={country}
        />
        <input
          onChange={(e) => {
            setUsers(e.target.value);
          }}
          type="text"
          placeholder={email}
        />
        <input
          onChange={(e) => {
            setUsers(e.target.value);
          }}
          type="password"
          placeholder={password}
        />
        <button onClick={newData}>Register</button>
      </div>
    </>
  );
};

export default App;
