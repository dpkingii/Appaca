import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
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
        </div>
    )
}

export default LandingPage;