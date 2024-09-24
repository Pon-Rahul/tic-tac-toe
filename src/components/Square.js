import React from "react";
import "./Square.css"
const Square = ({ value, onClick, isWinningSquare }) => {
  return (
    <button
      className="square"
      onClick={onClick}
      style={{ color: isWinningSquare ? "green" : "black" }} // Apply green color to winning squares
    >
      {value}
    </button>
  );
};

export default Square;
