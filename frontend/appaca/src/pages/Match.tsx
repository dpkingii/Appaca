import React, { useEffect, useState } from "react";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";

//TODO: do processing to determine the values of roleToMatch, roleText.
//SHOULD BE STORING IT SOMEWHERE SO WHEN WE GO TO THIS PAGE WE KNOW WHAT TO RENDER

function Match() {
    const { user } = useUser();
    const [roleToMatch, setRole] = useState("");
    const [roleText, setRoleText] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) return;
    
        if (user.role === 'student') {
            setRole('mentor');
            setRoleText("What do you want to learn?");
          } else {
            setRole('student');
            setRoleText("What are you able to teach?");
          }
    }, [user]);

    const handleForms = async () => {
        const selectedTopics: string[] = [];
        
        // Get all input elements that are checkboxes with name="topics"
        const checkboxes = document.querySelectorAll('input[name="topics"]:checked');
        
        checkboxes.forEach((checkbox) => {
            if (checkbox instanceof HTMLInputElement) {
            selectedTopics.push(checkbox.value);
            }
        });
        
        console.log("Selected topics:", selectedTopics);
        
        // Example fetch POST
        fetch("http://127.0.0.1:8000/forms/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: user ? user.username : '',       // Use dynamic username if needed
                role: user ? user.role: '',
                topics: selectedTopics,                     // Send selected topics
            }),
        })
        .then((res) => res.json())
        .then((data) => {
        console.log("Form submitted:", data);
        })
        .catch((err) => {
        console.error("Form submission failed:", err);
        });
        navigate('/display');
    }
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
            
            <div className="content-container">
                <p>{roleText}</p>
                <form method="POST">
                    <div style={{ display: "flexbox", margin: "20px" }}>
                        <label htmlFor="swe">SWE (Software Engineering)</label>
                        <input type="checkbox" id="swe" value="SWE" name ='topics'/> <br /><br />
                        <label htmlFor="quant">Quant</label>
                        <input type="checkbox" id="quant" value="Quant" name ='topics'/><br /><br />
                        <label htmlFor="ai">AI</label>
                        <input type="checkbox" id="ai" value="AI Research" name ='topics'/><br /><br />
                        <label htmlFor="pm">Project Management/Consulting</label>
                        <input type="checkbox" id="pm" value="PM/Consulting" name ='topics'/><br /><br />
                    </div>
                    <button className="ahhhh" role="button">
                        <span className="button-shadow"></span>
                        <span className="button-edge"></span>
                        <span className="button-side-edge"></span>
                        <span className="button-front text" onClick={handleForms}>
                            Match to a {roleToMatch}
                        </span>
                    </button>
                </form>
            </div>
        </div>

    )
}

export default Match;