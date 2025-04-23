import React from 'react';
import './TitlePage.css'; 
import { useNavigate } from 'react-router-dom'


function TitlePage() {

    const navigate = useNavigate();

    const handleStartClick = () => {
        navigate('/game'); // Navigate to the /game path
    };


    return (
        <div className="title-page-container"> 
            <div className="title-page-content"> 
                <h1>Two Truths and a Bug</h1>
                <button onClick={handleStartClick}>Start</button>
            </div>
        </div>
    );
}

export default TitlePage;