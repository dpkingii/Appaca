import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./LoginPage.css"

function LoginPage() {

    const navigate = useNavigate();
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        navigate(`/display/`)
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
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                className="search"
                placeholder="Email"
            />
            <input
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                className="search"
                placeholder="Password"
            />
            <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="search"
            >
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="mentor">Mentor</option>
                <option value="director">Director</option>
            </select>

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