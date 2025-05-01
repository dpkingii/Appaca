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

     const[streak,setStreak] = useState(6);
     const [matched, setMatched] = useState(false);
    
     const [nameList, setNameList] = useState<string[]>([]);
     const [mentorName, setMentorName] = useState<string>("");

     let leaderboardList: string[] = ["name1", "name2", "name3","name4","name5"];
     let leaderboardNum: number[] = [55, 40, 34,22,8];
 
     // changing the alpaca depending on the streak number
     let imageName: string | undefined;
     if(streak < 7){
         imageName = sad;
     }
     else if(streak < 14){
         imageName = angry;
     }
     else if(streak < 21){
         imageName = neutral;
     }
     else{
         imageName = happy;
     }
 
     // Create Name List
     const groupList = nameList.map(name => "@" + name).join(", ");

    const navigate = useNavigate();
    const handleTwoTruth = ()=> {
        setStreak(streak+1)
        navigate('/twoTruths')
    };

    useEffect(() => {
        if (user?.username) {
            checkMatchStatus();
        }
    }, [user]);

    useEffect(() => {
        if (user?.username && user?.role !== 'director' && matched) {
            getGroups();
        }
    }, [user, matched]);

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

    return (
        <>
            <div className = "all">

                <div className = "topBar">
                    <h1>🦙 Appaca! 🦙</h1>
                    <h2>@{user?.username}</h2>
                </div>

                <div className = "content">
                    <div className = "sideBar">
                        <div className = "box">
                            <img src = {imageName} alt="Alpaca Streak Icon" />
                            <h3>Streak: {streak}</h3>
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
                            <button style={{ backgroundColor: "rgb(223, 223, 223)", color: "white" }} onClick={match}>Match Mentors + Mentees</button>
                        </div>
                        )}
                    </div>
                    
                    <div className = "leaderboard">
                        <h2>Leader Board</h2>
                        <div className = "backboard">

                            <div className = "board">
                                
                                <div className = "entry"> <p>01) @{leaderboardList[0]}</p> <div className = "number">{leaderboardNum[0]}</div> </div>
                                <div className = "entry"> <p>02) @{leaderboardList[1]}</p> <div className = "number">{leaderboardNum[1]}</div> </div>
                                <div className = "entry"> <p>03) @{leaderboardList[2]}</p> <div className = "number">{leaderboardNum[2]}</div> </div>
                                <div className = "entry"> <p>04) @{leaderboardList[3]}</p> <div className = "number">{leaderboardNum[3]}</div> </div>
                                <div className = "entry"> <p>05) @{leaderboardList[4]}</p> <div className = "number">{leaderboardNum[4]}</div> </div>
        
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