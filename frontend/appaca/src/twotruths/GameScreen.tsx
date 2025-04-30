import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import './GameScreen.css'; 

function GameScreen() {
    const [statements, setStatements] = useState(['', '', '']);
    const [bugIndex, setBugIndex] = useState<number | null>(null);
    const navigate = useNavigate(); // If you want to navigate after submission

    const handleStatementChange = (index: number, event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newStatements = [...statements];
    newStatements[index] = event.target.value;
    setStatements(newStatements);
  };

  const handleBugSelection = (index: number) => {
    setBugIndex(index);
  };

    const handleSubmit = async () => {
        if (statements.some(statement => statement.trim() === '')) {
          alert('Please enter all three statements.');
          return;
        }
        if (bugIndex === null) {
          alert('Please select which statement is the bug.');
          return;
        }
    
        const gameData = {
          truths: statements.filter((_, index) => index !== bugIndex),
          bug: statements[bugIndex],
        };
    
        
        console.log('Game Data to Backend:', gameData);
        navigate('/display')
      };


  return (
    <div className="game-screen-container">
      <h1>Tell Us Two Truths and a Bug!</h1>
      <div className="game-screen-image">
                  <img 
                    src="https://png.pngtree.com/png-vector/20220713/ourmid/pngtree-insect-ladybug-cartoon-bugs-character-png-image_5932864.png" 
                    alt="Cartoon bug graphic" 
                    className="game-screen-image"
                  />
    </div>
      <div className="statements-container">
        {statements.map((statement, index) => (
          <div key={index} className={`statement-input-group ${bugIndex === index ? 'bug-selected' : ''}`}>
            <textarea
              value={statement}
              onChange={(event) => handleStatementChange(index, event)}
              placeholder={`Statement ${index + 1}`}
            />
            <button className="bug-button" onClick={() => handleBugSelection(index)}>
              Mark as Bug
            </button>
          </div>
        ))}
      </div>
      <button className="submit-button" onClick={handleSubmit} disabled={bugIndex === null || statements.some(s => s.trim() === '')}>
        Submit Your Two Truths and a Bug
      </button>
    </div>
  );
}

export default GameScreen;