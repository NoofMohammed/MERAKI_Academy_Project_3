import React, { useState } from "react";
import Navigation from "./Navigation";



const NewArticle = () => {

    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("")
  return (
    <>
      <Navigation loggedIn={true} />
       <h5>NewArticle</h5>
      <button>Get All articles</button>
      <input type="text" placeholder="article title here" onChange={}/>
      <textarea type="text" placeholder="article description here" onChange={}/>
      <button>Create New Article</button>

    </>
  );
};

export default NewArticle;
