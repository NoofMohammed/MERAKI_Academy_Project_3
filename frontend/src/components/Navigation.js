import React from "react";
import { Link } from "react-router-dom";
 

const Navigation = ({loggedIn}) => {

    return (

      <div style={{ display: "flex", gap: "16px" }}>
          {loggedIn ? 
          <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/newarticle">NewArticle</Link>
          </>:
          <>
          <Link to="/Register">Register</Link>
          <Link to="/Login">Login</Link>
          </>
          }
          
        


      </div>
    );
  };

  export default Navigation;