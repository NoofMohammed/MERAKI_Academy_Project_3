import React, { useState } from "react";
import { Link, Route } from "react-router-dom";
import Register from "./components/Register";
// import login from "./components/Login"


// import axios from "axios";
import "./app.css";

// jsx
const App = () => {
  return (
    <>
      <Navigation />
      <div class="main">
        <Route path="/Register" component={Register} />
        {/* <Route path="/login" component={login} /> */}
      </div>
    </>
  );
};

const Navigation = () => {
  return (
    <div style={{ display: "flex", gap: "16px" }}>
      <Link to="/Register">Register</Link>
      {/* <Link to="login">login</Link> */}
    </div>
  );
};


export default App;
