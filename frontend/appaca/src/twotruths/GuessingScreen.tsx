import React, { useState } from 'react';
import './GuessingScreen.css'; // Create this CSS file
import { useNavigate } from 'react-router-dom'


interface GuessingScreenProps {
  statements: string[]; // Array of the three statements
  onSubmitGuess: (guessedIndex: number) => void; // Function to handle the user's guess
}

function GuessingScreen() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  const statements = [
    "I have a pet alpaca named Kevin.",
    "The capital of France is Berlin.",
    "I enjoy coding in my pajamas."
  ];  
  const dataFromBackend = {
    statements: statements,
    bugIndex: 0, // Explicitly send the index of the bug
  };

  const handleGuess = (index: number) => {
    // onSubmitGuess(index);
    navigate('/game')
  };

  return (
    <div className="guessing-screen-container">
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
    </div>
  );
};

export default GuessingScreen;