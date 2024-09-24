import React from "react";
import Square from "./Square";

const Board = ({ squares, onClick, gridSize, winningLine }) => {
  const createBoard = () => {
    let board = [];
    for (let row = 0; row < gridSize; row++) {
      let rowSquares = [];
      for (let col = 0; col < gridSize; col++) {
        const index = row * gridSize + col;
        rowSquares.push(
          <Square
            key={index}
            value={squares[index]}
            onClick={() => onClick(index)}
            isWinningSquare={winningLine.includes(index)} // Highlight winning square
          />
        );
      }
      board.push(<div key={row} className="board-row">{rowSquares}</div>);
    }
    return board;
  };

  return <div>{createBoard()}</div>;
};

export default Board;
