import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./LoginPage.css"

function LoginPage() {
    
    const [userId,setUserId] = useState("");
    const navigate = useNavigate();


    const handleLogin = async () => {
        navigate(`/display/`)
    };

    return (
        <div className="login-container">
            <h1>🦙 Appaca 🦙</h1>
            <input
            onChange={(event) => {
                setUserId(event.target.value.toLowerCase());
            }}
            type="text"
            className="search"
            placeholder="User ID"
            ></input>
    
            <button onClick={handleLogin} id="searchBtn">
            Login
            </button>
        </div>
    )
}

export default LoginPage;