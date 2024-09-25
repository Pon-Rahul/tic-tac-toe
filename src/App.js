import React, { useState } from "react";
import Game from "./components/Game";
import "../src/App.css"

function App() {
  const [gridSize, setGridSize] = useState(3);
  const [winStreak, setWinStreak] = useState(3);
  const [startGame, setStartGame] = useState(false);

  const handleStartGame = () => {
    if (winStreak <= gridSize) {
      setStartGame(true);
    } else {
      alert("Win streak must be less than or equal to grid size.");
    }
  };

  return (
    <div>
      {!startGame ? (
        <div className="content">
          <h1 >Tic-Tac-Toe</h1>
          <label>
            Grid Size (3-10):
            <input
              type="number"
              value={gridSize}
              onChange={(e) => setGridSize(Number(e.target.value))}
              min={3}
              max={10}
            />
          </label>
          <label>
            Win Streak (3 to Grid Size):
            <input
              type="number"
              value={winStreak}
              onChange={(e) => setWinStreak(Number(e.target.value))}
              min={3}
              max={gridSize}
            />
          </label>
          <button className="button-32" onClick={handleStartGame}>Start Game</button>
        </div>
      ) : (
        <Game gridSize={gridSize} winStreak={winStreak} setStartGame={setStartGame}/>
      )}
    </div>
  );
}

export default App;
