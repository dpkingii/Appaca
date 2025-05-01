import React, { useState } from 'react';
import './GuessingScreen.css'; // Create this CSS file
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { useUser } from '../pages/UserContext';


function GuessingScreen() {
  const { user } = useUser();  // current logged-in user
  const [mentorUsername, setMentorUsername] = useState<string | null>(null);
  const [statements, setStatements] = useState<string[]>([]);
  const [bugIndex, setBugIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Step 1: Get mentor's username based on current user
  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/groups/${user?.username}`);
        const data = await response.json();
        setMentorUsername(data.mentor);
      } catch (err) {
        console.error('Error fetching mentor:', err);
        setErrorMessage("Couldn't load group information.");
        setLoading(false);
      }
    };

    if (user?.username) {
      fetchMentor();
    }
  }, [user]);

  // Step 2: Fetch mentor's game
  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/two-truths/${mentorUsername}`);
        const data = await response.json();

        const allStatements = [...data.truths, data.bug];
        const shuffled = shuffleWithBugIndex(allStatements, data.bug);

        setStatements(shuffled.statements);
        setBugIndex(shuffled.bugIndex);
      } catch (err) {
        console.error('Error fetching game:', err);
        setErrorMessage("Couldn't load game from mentor.");
      } finally {
        setLoading(false);
      }
    };

    if (mentorUsername) {
      fetchGame();
    }
  }, [mentorUsername]);

  const handleGuess = (index: number) => {
    if (index === bugIndex) {
      navigate('/display');
    } else {
      setErrorMessage('Oops! That statement is not the bug. Try again.');
    }
  };

  // Helper to shuffle while tracking bug index
  const shuffleWithBugIndex = (arr: string[], bug: string) => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return {
      statements: shuffled,
      bugIndex: shuffled.indexOf(bug),
    };
  };

  if (loading) return <div className="guessing-screen-container"><p>Loading game...</p></div>;

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