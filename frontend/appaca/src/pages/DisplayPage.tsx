import React from 'react'
import { useState } from "react";
import { useUser } from "./UserContext";
import "./DisplayPage.css";
import { useNavigate } from 'react-router-dom'
import { useEffect } from "react";
import sad from './Images/sadAlpaca.png';
import angry from './Images/angryAlpaca.png';
import neutral from './Images/neutralAlpaca.png';
import happy from './Images/happyAlpaca.png';

function DisplayPage() {
     // TEMPORARY NEEDS DATA
     const { user } = useUser();
     const [matched, setMatched] = useState(false);
    
     const [nameList, setNameList] = useState<string[]>([]);
     const [mentorName, setMentorName] = useState<string>("");

     const [topMentors, setTopMentors] = useState<{ username: string, streak: number }[]>([]);
 
     // changing the alpaca depending on the streak number
     let imageName: string | undefined;
     if(user == undefined) {
     } else if(user?.streak < 7){
         imageName = sad;
     }
     else if(user?.streak < 14){
         imageName = angry;
     }
     else if(user?.streak < 21){
         imageName = neutral;
     }
     else{
         imageName = happy;
     }
 
     // Create Name List
     const groupList = nameList.map(name => "@" + name).join(", ");

    const navigate = useNavigate();
    const handleTwoTruth = () => {
        if (user?.role === "student") {
            navigate("/guess");
        } else if (user?.role === "mentor") {
            navigate("/twoTruths");
        } 
    };

    useEffect(() => {
        if (!user?.username) return;
    
        checkMatchStatus(); // initial call
    
        // const interval = setInterval(() => {
        //     checkMatchStatus(); // keep checking every 10 seconds
        // }, 10000); // 10s
    
        // return () => clearInterval(interval); // clean up
    }, [user]);

    useEffect(() => {
        if (user?.username && user?.role !== 'director' && matched) {
            getGroups();
        }
    }, [user, matched]);

    useEffect(() => {
        getTopMentors();
    }, []);

    const checkMatchStatus = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/match-status/");
            const data = await response.json();
            setMatched(data.matched);
        } catch (err) {
            console.error("Error checking match status", err);
        }
    };
      
    const match = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/match/", { method: "POST" });
            const data = await response.json();
            console.log("Matching result:", data);
            setMatched(true);
        } catch (error) {
            console.error("Error matching:", error);
        }
    };

    const getGroups = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/groups/${user?.username}`);
            const group = await response.json();
            console.log("Group:", group);  
            setMentorName(group.mentor);
            setNameList(group.students);
        } catch (error) {
            console.error("Error fetching group:", error);
        }
    };

    const getTopMentors = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/top-mentors/");
            const data = await response.json();
            setTopMentors(data);
        } catch (error) {
            console.error("Error fetching top mentors:", error);
        }
    };

    return (
        <>

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


            <div className = "all">

                <div className = "topBar">
                    <h1>🦙 Appaca! 🦙</h1>
                    <h2>@{user?.username}</h2>
                </div>

                <div className = "content">
                    <div className = "sideBar">
                        <div className = "box">
                            <img src = {imageName} alt="Alpaca Streak Icon" />
                            <h3>Streak: {user?.streak}</h3>
                        </div>

                        {(user?.role === "student" || user?.role === "mentor") && (
                            <div className="box">
                                {!matched ? (
                                <p> <br/>The director has not matched groups yet.</p>
                                ) : (
                                <>
                                    <h3>Mentor</h3>
                                    <p>{mentorName}</p>

                                    <h3>Group Members</h3>
                                    <p>{groupList}</p>
                                </>
                                )}
                            </div>
                        )}

                        {user?.role === "director" && (
                        <div className="box">
                            {/* <button style={{ backgroundColor: "rgb(223, 223, 223)", color: "white" }} onClick={match}>Match Mentors + Mentees</button> */}
                            <div className = "match">
                                <button onClick={match}><h3>Match Mentors + Mentees</h3></button>
                            </div>
                        </div>
                        )}
                    </div>
                    
                    <div className = "leaderboard">
                        <h2>Leader Board</h2>
                        <div className = "backboard">

                            <div className = "board">
                                
                            {topMentors.map((mentor, index) => (
                                <div className="entry" key={mentor.username}>
                                    <p>{String(index + 1).padStart(2, '0')}) @{mentor.username}</p>
                                    <div className="number">🔥{mentor.streak}</div>
                                </div>
                            ))}
        
                            </div>

                            <h3>Games</h3>
                            <div className = "games">
                                <button onClick = {handleTwoTruth}id = "twoTruthBtn"><p> Two Truth, One Bug </p></button>
                                <button><p> [Code]DLE </p></button>
                                <button><p> Connections </p></button>
                            </div>

                        </div>

                        
                    </div>
                    

                </div>

            </div>
        </>
    )

}

export default DisplayPage