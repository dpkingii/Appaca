import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./LoginPage.css"

function LoginPage() {

    const navigate = useNavigate();
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {

        try {
            const response = await fetch(`http://127.0.0.1:8000/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,   // Use the state value for the username
                    password: password    // Use the state value for the password
                })
            })

            if(!response.ok){
                const errorData = await response.json();
                console.error("Error response:", errorData);
                throw new Error(errorData.detail || "Login failed. Please try again.");
            }

            const data = await response.json();
            setUsername(data.username);
            console.log("Login successful:", data);
            navigate('/display', { state: { username }});
        } catch (e){
            console.error("Error fetching user:", e);
            setError(e.message || "Failed to fetch user. Please try again.");
        }
        
    };

    return (
        <div>
            <svg className="bokeh" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10%" cy="85%" r="10%"/>
                <circle cx="45%" cy="50%" r="10%"/>
                <circle cx="85%" cy="35%" r="15%"/>
                <circle cx="60%" cy="85%" r="15%"/>
                <circle cx="45%" cy="50%" r="10%"/>
                <circle cx="35%" cy="25%" r="10%"/>
                <circle cx="90%" cy="-25%" r="15%"/>
                <circle cx="-15%" cy="30%" r="15%"/>
                <circle cx="65%" cy="85%" r="10%"/>
                <circle cx="45%" cy="50%" r="10%"/>
            </svg>

            <div className = "title">
                <h1>🦙 Appaca! 🦙</h1>
            </div>

        <div className="content-container">

            <div className="main-content">
                <p>Login with your information!</p>
            </div>

            <input
                onChange={(event) => setUsername(event.target.value)}
                type="text"
                className="search"
                placeholder="Username"
            />

            <input
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                className="search"
                placeholder="Password"
            />

            <button className="ahhhh" onClick={handleLogin} role="button">
                <span className="button-shadow"></span>
                <span className="button-edge"></span>
                <span className="button-side-edge"></span>
                <span className="button-front text">
                    Login
                </span>
            </button>

            {error && <p style={{color: "red"}}>{error}</p>}

        </div>

        </div>
    );
}

export default LoginPage;