import React, { useState } from "react";
import { Link, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Navigation from "./components/Navigation";

// import axios from "axios";
import "./app.css";

// jsx
const App = () => {
  return (
    <>
      <Navigation />
      <div className="main">
        <Route path="/Register" component={Register} />
        <Route path="/Login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
      </div>
    </>
  );
};

export default App;
