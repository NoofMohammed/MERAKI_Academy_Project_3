import React from "react";
import { Link } from "react-router-dom";


const Navigation = () => {
    return (
      <div style={{ display: "flex", gap: "16px" }}>
        <Link to="/Register">Register</Link>
        <Link to="/Login">Login</Link>
      </div>
    );
  };
  export default Navigation;