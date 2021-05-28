import axios from "axios";
import React, { useState, useContext } from "react";
import Navigation from "./Navigation";
import { TokenContext } from "../App";
import { useHistory } from "react-router-dom";


const NewArticle = () => {
  const history = useHistory();

  const { token } = useContext(TokenContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState("");


  const addArticle = () => {

    axios
      .post(
        "http://localhost:5000/articles",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setResult("The article has been created successfully");
        history.push("/dashboard");

      })
      .catch((err) => {
        setResult("Error happened while creating a new article, please try again")
      });
  };
  return (
    <>
      <Navigation loggedIn={true} />
      <div className="article">
      <h5>NewArticle</h5>
      <input
        type="text"
        placeholder="article title here"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <textarea
        type="text"
        placeholder="article description here"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <button onClick={addArticle}>Create New Article</button>
      </div>
    </>
  );
};

export default NewArticle;
