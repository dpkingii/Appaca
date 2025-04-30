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
                <div className="title-image-content">
                 <img 
                    src="https://png.pngtree.com/png-vector/20220713/ourmid/pngtree-insect-ladybug-cartoon-bugs-character-png-image_5932864.png" 
                    alt="Cartoon bug graphic" 
                    className="title-image"
                  />
                </div>

                <h1>Two Truths and a Bug</h1>
                <button onClick={handleStartClick}>Start</button>
            </div>
        </div>
    );
}

export default TitlePage;