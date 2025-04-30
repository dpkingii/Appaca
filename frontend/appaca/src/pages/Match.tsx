import React, { useEffect, useState } from "react";





//TODO: do processing to determine the values of roleToMatch, roleText.
//SHOULD BE STORING IT SOMEWHERE SO WHEN WE GO TO THIS PAGE WE KNOW WHAT TO RENDER

function Match() {
    const [roleToMatch, setRole] = useState("");
    const [roleText, setRoleText] = useState('');
    useEffect(() => {
        setRole('student');
        setRoleText('able to teach?');
    }, [])

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
                <p>What are you {roleText}</p>
                <form method="POST">
                    <div style={{ display: "flexbox", margin: "20px" }}>
                        <label htmlFor="swe">SWE (Software Engineering)</label>
                        <input type="checkbox" id="swe" value="SWE" /> <br /><br />
                        <label htmlFor="quant">Quant</label>
                        <input type="checkbox" id="quant" value="Quant" /><br /><br />
                        <label htmlFor="ai">AI</label>
                        <input type="checkbox" id="ai" value="AI Research" /><br /><br />
                        <label htmlFor="pm">Project Management/Consulting</label>
                        <input type="checkbox" id="pm" value="PM/Consulting" /><br /><br />
                    </div>
                    <button className="ahhhh" role="button">
                        <span className="button-shadow"></span>
                        <span className="button-edge"></span>
                        <span className="button-side-edge"></span>
                        <span className="button-front text">
                            Match to a {roleToMatch}
                        </span>
                    </button>
                </form>
            </div>
        </div>

    )
}

export default Match;