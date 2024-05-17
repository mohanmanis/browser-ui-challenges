import React, { useState } from "react";
import "./grid.css";

export default function Grid({ cols, rows }) {
  const [grid, setGrid] = useState(
    Array(rows)
      .fill()
      .map((_) => Array(cols).fill(0))
  );

  const handleClick = (colIndex) => {
    setGrid((prev) => {
      const rowIndex = prev.findLastIndex((row) => row[colIndex] === 0);
      if (rowIndex !== -1) {
        const newGrid = [...prev];
        newGrid[rowIndex] = [...newGrid[rowIndex]];
        newGrid[rowIndex][colIndex] = 1;
        return newGrid;
      }
      return prev;
    });
  };

  return (
    <div className="flex-wrapper">
      {grid?.map((row) => (
        <div className="row">
          {row?.map((cell, colIndex) => (
            <div
              className={`flex-cell ${cell ? "green" : ""}`}
              onClick={() => handleClick(colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
