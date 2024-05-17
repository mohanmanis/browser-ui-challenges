import React, { useState } from "react";
import "./grid.css";

export default function Grid({ cols, rows }) {
   const [grid, setGrid] = useState(Array(cols * rows).fill(0));


  const handleClick = (colIndex) => {
    setGrid((prev) => {
      const col = colIndex % cols;
      const newGrid = [...prev];
      const lastColIndex = newGrid.findLastIndex(
        (_, index) => index % cols === col && newGrid[index] === 0
      );
      if (lastColIndex > -1) newGrid[lastColIndex] = 1;
      return newGrid;
    });
  };

  return (
    <div
      className="wrapper"
      style={{ gridTemplateColumns: `repeat(${cols}, 100px)` }}
    >
      {grid.map((cell, index) => (
        <div className={`cell ${cell ? "green" : ""}`}
        onClick={() => handleClick(index)} />
      ))}
    </div>
  );
}
