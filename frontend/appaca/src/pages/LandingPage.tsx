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
            <p className="fade-in">Get ready to meet your mentor! 🦙</p>
            <Link to="/login">
                <button>Login or Register</button>
            </Link>
            <Link to="/notFound">
                <button>Go to Not Found (placeholder and test)</button>
            </Link>
            <button onClick={fetchHello}>Fetch from API</button>
            {message && <p>{message}</p>}
        </div>
    )
}

export default LandingPage;