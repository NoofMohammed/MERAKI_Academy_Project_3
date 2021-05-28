import axios from "axios";
import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");

  // const showing = () =>{
  //     setArticles([...articles,{title,description}])
  // }

  const showArtic = articles.map((elem, i) => {
    return (
      <div key={elem._id} className="article-show">
        <p>{elem.title}</p>
        <p>{elem.description}</p>
      </div>
    );
  });
  useEffect(() => {
    axios.get("http://localhost:5000/articles").then((res) => {
      setArticles(res.data);
    });
  }, []);

  return (
    <>
      <Navigation loggedIn={true} />
      <h5>Dashboard</h5>
      {showArtic}
      {/* <button onClick={showing}>Get All articles</button> */}
    </>
  );
};

export default Dashboard;
