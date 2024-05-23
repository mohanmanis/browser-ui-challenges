import { useEffect, useState } from "react";
import { PLAYER_X, PLAYER_O, checkWinner } from "./utils";

const Board = ({ size }) => {
  const [tiles, setTiles] = useState(Array(size * size).fill(""));
  const [player, setPlayer] = useState(PLAYER_X);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");

  useEffect(() => reset(), [size]);

  const checkWinnerLogic = (i, newTiles) => {
    const isDraw = newTiles.every((tile) => tile !== "");
    const isWinner = checkWinner(i, newTiles, size);
    setGameOver(isDraw || isWinner);
    setWinner(isDraw ? "Draw" : isWinner ? `Player-${player} wins` : "");
    setPlayer(player === PLAYER_X ? PLAYER_O : PLAYER_X);
  };

  const reset = () => {
    setTiles(Array(size * size).fill(""));
    setPlayer(PLAYER_X);
    setGameOver(false);
  };

  const handleClick = (i) => {
    if (tiles[i] || gameOver) return;
    const newTiles = [...tiles];
    newTiles[i] = player;
    setTiles(newTiles);
    checkWinnerLogic(i, newTiles);
  };

  return (
    <div >
      <div
        className={`game-board ${gameOver ? "game-over" : ""}`}
        style={{ gridTemplateColumns: `repeat(${size}, auto)` }}
      >
        {tiles.map((val, i) => (
          <div className="tile" key={i} onClick={() => handleClick(i)}>
            {val}
          </div>
        ))}
      </div>
      {gameOver && <p>{winner}</p>}
      {gameOver && <button onClick={reset}>reset</button>}
    </div>
  );
};

const TicTacToe = () => {
  const [size, setSize] = useState(3);

  return (
    <div className="container">
      <h1>Tic Tac Toe Game</h1>
      <input
        type="number"
        min={0}
        placeholder="Provide the grid size"
        className="input-box"
        onChange={e => setSize(+e.target.value)}
      />
      <Board size={size} />
    </div>
  );
};

export default TicTacToe;
