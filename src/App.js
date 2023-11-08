import React, { useState } from 'react';
import './App.css';

function App() {
  const [phrases] = useState([
    'Change the world from here',
    'Be the change you wish to see',
    'Turn your wounds into wisdom',
  ]);
  const [phrase, setPhrase] = useState('');
  const [hiddenPhrase, setHiddenPhrase] = useState('');
  const [previousGuesses, setPreviousGuesses] = useState('');
  const [maxGuesses] = useState(7);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [solved, setSolved] = useState(false);

  // Function to generate a hidden version of the phrase
  const generateHiddenPhrase = (currentPhrase) => {
    const updatedHiddenPhrase = currentPhrase
      .split('')
      .map(char => (char.match(/[a-zA-Z]/) ? '*' : char))
      .join('');
    setHiddenPhrase(updatedHiddenPhrase);
  };

  // Function to process a player's guess
  const processGuess = (guess) => {
    if (previousGuesses.includes(guess.toLowerCase())) {
      // Check if the guess has already been used
      alert('You have already tried this.');
      return;
    }

    if (phrase.toLowerCase().includes(guess.toLowerCase())) {
      const updatedHiddenPhrase = hiddenPhrase
        .split('')
        .map((char, index) => {
          if (phrase[index].toLowerCase() === guess.toLowerCase()) {
            return phrase[index];
          }
          return char;
        })
        .join('');
      setHiddenPhrase(updatedHiddenPhrase);

      if (updatedHiddenPhrase.toLowerCase() === phrase.toLowerCase()) {
        setGameOver(true); // The game is won
        setSolved(true);
      }
    } else {
      setWrongGuesses(wrongGuesses + 1);

      if (wrongGuesses >= maxGuesses - 1) {
        setGameOver(true); // The game is over
      }
    }

    setPreviousGuesses(previousGuesses + guess.toLowerCase());
  };

  // Function to start a new game
  const newGame = () => {
    // Reset all game state variables and select a new phrase
    setHiddenPhrase('');
    setPreviousGuesses('');
    setWrongGuesses(0);
    setGameOver(false);
    setSolved(false);

    // Select a random phrase from the provided phrases
    const randomIndex = Math.floor(Math.random() * phrases.length);
    setPhrase(phrases[randomIndex]);
    generateHiddenPhrase(phrases[randomIndex]);
  };

  // Component did mount
  React.useEffect(() => {
    newGame(); // Initialize the game with a random phrase
  }, [phrases]);

  return (
    <div className="App">
      <h1>Wheel of Fortune</h1>
      {!gameOver ? (
        <>
          <div className="phrase">{hiddenPhrase}</div>
          <div className="previous-guesses">Previous Guesses: {previousGuesses}</div>
          <input
            type="text"
            maxLength="1"
            onChange={(e) => {
              const guess = e.target.value;
              if (guess.match(/[a-zA-Z]/) && guess.length === 1) {
                processGuess(guess);
                e.target.value = '';
              }
            }}
          />
          <div className="wrong-guesses">Wrong Guesses: {wrongGuesses}</div>
        </>
      ) : (
        <div className="end-game-message">
          {solved ? (
            <div className="win-message">YOU WON!!</div>
          ) : (
            <div className="lose-message">Game Over!</div>
          )}
          <button onClick={newGame}>New Game</button>
        </div>
      )}
    </div>
  );
}

export default App;
