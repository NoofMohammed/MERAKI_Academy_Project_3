import React, { useState, createContext } from "react";
import { Link, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
// import Navigation from "./components/Navigation";
import NewArticle from "./components/NewArticle";

// import axios from "axios";
import "./app.css";
export const TokenContext = createContext();

// jsx
const App = () => {
  const [token, setToken] = useState("");
  const value = { token, setToken };
  return (
    <>
      <div className="main">
        <TokenContext.Provider value={value}>
          <Route path="/Register" component={Register} />
          <Route path="/Login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/newarticle" component={NewArticle} />
        </TokenContext.Provider>
      </div>
    </>
  );
};

export default App;
