import React, { useState } from 'react';
import './GuessingScreen.css'; // Create this CSS file
import { useNavigate } from 'react-router-dom'


function GuessingScreen() {

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  const navigate = useNavigate();

  const statements = [
    "I have a pet alpaca named Kevin.",
    "The capital of France is Berlin.",
    "I enjoy coding in my pajamas."
  ];  

  const dataFromBackend = {
    statements: statements,
    bugIndex: 1, // Explicitly send the index of the bug
  };


  const handleGuess = (index: number) => {
    if (index === dataFromBackend.bugIndex) {
      // Correct guess, navigate to the display page
      navigate('/display');
    } else {
      // Incorrect guess, show the error message
      setErrorMessage('Oops! That statement is not the bug. Try again.');
    }
  };

  return (
    <div className="guessing-screen-container">
      <div className="guess-image-content">
        <img 
          src="https://png.pngtree.com/png-vector/20220713/ourmid/pngtree-insect-ladybug-cartoon-bugs-character-png-image_5932864.png" 
          alt="Cartoon bug graphic" 
          className="guess-image"
        />
      </div>

      <h1>Which Statement is the Bug?</h1>

      <ul className="statement-list">
        {statements.map((statement, index) => (
          <li
            key={index}
            className={`statement-option ${hoveredIndex === index ? 'hovered' : ''}`}
            onClick={() => handleGuess(index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {statement}
          </li>
        ))}
      </ul>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default GuessingScreen;