import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
    const [message, setMessage] = useState("")

    async function fetchHello() {
        try {
            const response = await fetch("http://localhost:8000/");
            const data = await response.json();
            setMessage(data.message);
        } catch (err) {
            console.log("Failed to fetch message from backend")
        }
    }


    return (
        <div>
            <h1>🦙 Appaca! 🦙</h1>
            <p style={{textAlign:'right'}} className="fade-in">Get ready to meet your mentor! 🦙</p>
            <Link to="/login">
                <button className = "center"><p>Login or Register</p></button>
            </Link>
            <Link to="/notFound">
                <button className = "center"><p>Go to Not Found (placeholder and test)</p></button>
            </Link>
            <button className = "center" onClick={fetchHello}><p>Fetch from API</p></button>
            {message && <p>{message}</p>}
        </div>
    )
}

export default LandingPage;