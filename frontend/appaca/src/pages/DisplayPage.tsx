import React from 'react'
import { useState } from "react";
import "./DisplayPage.css";
import { useNavigate } from 'react-router-dom'
import sad from './Images/sadAlpaca.png';
import angry from './Images/angryAlpaca.png';
import neutral from './Images/neutralAlpaca.png';
import happy from './Images/happyAlpaca.png';


function DisplayPage() {
     // TEMPORARY NEEDS DATA
     
     const[streak,setStreak] = useState(6)

     let nameList: string[] = ["name1", "name2", "name3"];
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
     let groupList = "";
     for(let i = 0;i<nameList.length;i++){
         groupList += "@"+nameList[i]+", ";
     }
     groupList = groupList.substring(0,groupList.length - 2);



    const navigate = useNavigate();
    const handleTwoTruth = ()=> {
        setStreak(streak+1)
        navigate('/twoTruths')
    };
    return (
        <>
            <div className = "all">

                <div className = "topBar">
                    <h1>🦙 Appaca! 🦙</h1>
                    <h2>@profilename</h2>
                </div>

                <div className = "content">
                    <div className = "sideBar">
                        <div className = "box">
                            <img src = {imageName} alt="Alpaca Streak Icon" />
                            <h3>Streak: {streak}</h3>
                        </div>

                        <div className = "box">
                            <h3>Mentor</h3>
                            <p>insert mentor name</p>

                            <h3>Group Members</h3>
                            <p>{groupList}</p>
                            

                        </div>

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