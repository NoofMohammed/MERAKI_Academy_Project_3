import React, { useState } from "react";
import { Link, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
// import Navigation from "./components/Navigation";
import NewArticle from "./components/NewArticle";



// import axios from "axios";
import "./app.css";

// jsx
const App = () => {
  return (
    <>
      <div className="main">
        <Route path="/Register" component={Register} />
        <Route path="/Login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/newarticle" component={NewArticle} />

      </div>
    </>
  );
};



export default App;
