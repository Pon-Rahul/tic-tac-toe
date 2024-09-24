import React, { useState } from "react";
import Board from "./Board";

const Game = ({ gridSize, winStreak }) => {
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
      setWinningLine(result.line); // Set the winning line to highlight
    } else if (newSquares.every((sq) => sq !== null)) {
      setWinner("Draw");
    }
  };

  const resetGame = () => {
    setSquares(Array(gridSize * gridSize).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine([]);
  };

  return (
    <div>
      <h2>Tic-Tac-Toe: {gridSize} x {gridSize}, Win Streak: {winStreak}</h2>
      <Board
        squares={squares}
        onClick={handleClick}
        gridSize={gridSize}
        winningLine={winningLine} // Pass winning line to Board
      />
      {winner ? (
        <div>
          <h3>{winner === "Draw" ? "It's a draw!" : `Winner: ${winner}`}</h3>
          <button onClick={resetGame}>Restart Game</button>
        </div>
      ) : (
        <h3>Next Player: {isXNext ? "X" : "O"}</h3>
      )}
    </div>
  );
};

// Updated function to return both the winner and the winning line
const calculateWinner = (squares, gridSize, winStreak) => {
  const lines = [];

  // Horizontal lines
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j <= gridSize - winStreak; j++) {
      let row = [];
      for (let k = 0; k < winStreak; k++) {
        row.push(i * gridSize + (j + k));
      }
      lines.push(row);
    }
  }

  // Vertical lines
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j <= gridSize - winStreak; j++) {
      let col = [];
      for (let k = 0; k < winStreak; k++) {
        col.push((j + k) * gridSize + i);
      }
      lines.push(col);
    }
  }

  // Diagonal (top-left to bottom-right)
  for (let i = 0; i <= gridSize - winStreak; i++) {
    for (let j = 0; j <= gridSize - winStreak; j++) {
      let diag = [];
      for (let k = 0; k < winStreak; k++) {
        diag.push((i + k) * gridSize + (j + k));
      }
      lines.push(diag);
    }
  }

  // Diagonal (top-right to bottom-left)
  for (let i = 0; i <= gridSize - winStreak; i++) {
    for (let j = winStreak - 1; j < gridSize; j++) {
      let diag = [];
      for (let k = 0; k < winStreak; k++) {
        diag.push((i + k) * gridSize + (j - k));
      }
      lines.push(diag);
    }
  }

  // Check for winner
  for (let line of lines) {
    const [a, ...rest] = line;
    if (squares[a] && rest.every((i) => squares[i] === squares[a])) {
      return { winner: squares[a], line };
    }
  }

  return { winner: null, line: [] };
};

export default Game;
