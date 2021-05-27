import React from "react"
import Navigation from "./Navigation";



const Dashboard =() =>{
    return(
        <>
        <Navigation loggedIn={true}/>
        <h5>Dashboard</h5>
        <button>Get All articles</button>
        </>
    )
}


export default Dashboard;