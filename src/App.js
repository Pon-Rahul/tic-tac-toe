import React, { useState } from "react";
import Game from "./components/Game";

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
    <div className="App">
      {!startGame ? (
        <div>
          <h1>Customizable Tic-Tac-Toe</h1>
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
          <br />
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
          <br />
          <button onClick={handleStartGame}>Start Game</button>
        </div>
      ) : (
        <Game gridSize={gridSize} winStreak={winStreak} />
      )}
    </div>
  );
}

export default App;
