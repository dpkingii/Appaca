import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./LoginPage.css"

function LoginPage() {
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/users/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    username: username,     // Replace with the username
                    email: email,           // Replace with the email
                    password: password,     // Replace with the password
                    role: role              // Replace with the role
                })
            });
            if (!response.ok) {
                throw new Error("Failed to create user.")
            }
            const data = await response.json();
            console.log(`success: ${JSON.stringify(data)}`)
        } catch (e) {
            setError("Failed to register new user with given ID")
            console.error(e)
        }
    };

    return (
        <div className="login-container">
            <h1>🦙 Appaca 🦙</h1>

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
            <label htmlFor="role">Role:</label>
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

            <button onClick={handleLogin} id="searchBtn">
                Login
            </button>

            {error && <p style={{color: "red"}}>{error}</p>}
        </div>
    );
}

export default LoginPage;