import React, { useState } from "react";
import Board from "./Board";
import "./Game.css";

const Game = ({ gridSize, winStreak, setStartGame }) => {
  const [squares, setSquares] = useState(Array(gridSize * gridSize).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);

  const handleClick = (index) => {
    if (squares[index] || winner) return;

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);

    const result = calculateWinner(newSquares, gridSize, winStreak);
    if (result.winner) {
      setWinner(result.winner);
      setWinningLine(result.line);
    } else if (newSquares.every((sq) => sq !== null)) {
      setWinner("Draw");
    }
  };
console.log(gridSize)
  const resetGame = () => {
    setSquares(Array(gridSize * gridSize).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine([]);
  };

  return (
    <div className="game_js">
    <h2 style={{ marginTop: gridSize > 7 ? "200px" : "0px" }}>
        Tic-Tac-Toe: {gridSize} x {gridSize}, Win Streak: {winStreak}
      </h2>
      <Board
        squares={squares}
        onClick={handleClick}
        gridSize={gridSize}
        winningLine={winningLine}
      />

      {winner ? (
        <div>
          <div className="black">
            <div className="its_match">
              {winner === "Draw" ? "It's a draw!" : `Winner: "${winner}"`}
            </div>
            <button onClick={resetGame} className="button-32">
              Restart Game
            </button>
            <button onClick={() => setStartGame(false)} className="button-32">
              Home
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3>Next Player: {isXNext ? "X" : "O"}</h3>
        </div>
      )}
      <button onClick={() => setStartGame(false)} className="button-32">
            Back
          </button>
    </div>
  );
};

const calculateWinner = (squares, gridSize, winStreak) => {
  const lines = [];


  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j <= gridSize - winStreak; j++) {
      let row = [];
      for (let k = 0; k < winStreak; k++) {
        row.push(i * gridSize + (j + k));
      }
      lines.push(row);
    }
  }


  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j <= gridSize - winStreak; j++) {
      let col = [];
      for (let k = 0; k < winStreak; k++) {
        col.push((j + k) * gridSize + i);
      }
      lines.push(col);
    }
  }


  for (let i = 0; i <= gridSize - winStreak; i++) {
    for (let j = 0; j <= gridSize - winStreak; j++) {
      let diag = [];
      for (let k = 0; k < winStreak; k++) {
        diag.push((i + k) * gridSize + (j + k));
      }
      lines.push(diag);
    }
  }

  for (let i = 0; i <= gridSize - winStreak; i++) {
    for (let j = winStreak - 1; j < gridSize; j++) {
      let diag = [];
      for (let k = 0; k < winStreak; k++) {
        diag.push((i + k) * gridSize + (j - k));
      }
      lines.push(diag);
    }
  }

  for (let line of lines) {
    const [a, ...rest] = line;
    if (squares[a] && rest.every((i) => squares[i] === squares[a])) {
      return { winner: squares[a], line };
    }
  }

  return { winner: null, line: [] };
};

export default Game;
