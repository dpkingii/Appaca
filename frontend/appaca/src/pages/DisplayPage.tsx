import React, { useEffect, useState } from "react";
import "./DisplayPage.css";
import { useLocation } from 'react-router-dom';
import tempStreakIcon from './Images/tempStreakIcon.jpg';

function DisplayPage() {

    const location = useLocation();
    const username = location.state?.username;

    const [userData, setUserData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/users/${username}`);
                if (!response.ok) {
                    const err = await response.json();
                    throw new Error(err.detail || "Failed to fetch user");
                }

                const data = await response.json();
                setUserData(data);
            } catch (e) {
                console.error("Error fetching user:", e);
                setError(e.message);
            }
        };

        if (username) {
            fetchUser();
        }
    }, [username]);

    return (
        <>
            <div className = "all">

                <div className = "topBar">
                    <h1>🦙 Appaca! 🦙</h1>
                    <h2>@{userData?.username || "Loading..."}</h2>
                </div>

                <div className = "content">
                    <div className = "sideBar">
                        <div className = "box">
                            <img src = {tempStreakIcon} alt="Alpaca Streak Icon" />
                            <h3>Streak: 5</h3>
                        </div>

                        <div className = "box">
                            <h3>Mentor</h3>
                            <p>insert mentor name</p>

                            <h3>Group Members</h3>
                            <p>- @name 1</p>
                            <p>- @name 2</p>
                            <p>- @yourname</p>
                        </div>

                    </div>
                    
                    <div className = "leaderboard">
                        <h2>Leader Board</h2>
                        <div className = "backboard">

                            <div className = "board">
                                
                                <div className = "entry"> <p>01) @name</p> <div className = "number">88</div> </div>
                                <div className = "entry"> <p>02) @name</p> <div className = "number">79</div> </div>
                                <div className = "entry"> <p>03) @name</p> <div className = "number">60</div> </div>
                                <div className = "entry"> <p>04) @name</p> <div className = "number">43</div> </div>
                                <div className = "entry"> <p>05) @name</p> <div className = "number">08</div> </div>
        
                            </div>

                        </div>
                        <p>Your Place: XX</p>
                    </div>

                </div>

            </div>
        </>
    )
}

export default DisplayPage;