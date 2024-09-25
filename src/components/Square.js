import React from "react";
import "./Square.css"
const Square = ({ value, onClick, isWinningSquare }) => {
  return (
    <button
      className="square"
      onClick={onClick}
      style={{ color: isWinningSquare ? "#1b4f79" : "#fc0" ,
               background : isWinningSquare ? "#fc0" : "#1b4f79",
               border : isWinningSquare ? "1px solid #1b4f79" : "1px solid #fc0",
               boxShadow : isWinningSquare ? "0 0 10px #fc0" : ""
      }}
    >
      {value}
    </button>
  );
};

export default Square;
