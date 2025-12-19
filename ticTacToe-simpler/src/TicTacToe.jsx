import { useEffect, useState, useCallback } from "react";
import { PLAYER_X, PLAYER_O, checkWinner } from "./utils";

// eslint-disable-next-line react/prop-types
const Board = ({ size }) => {
  const [tiles, setTiles] = useState(Array(size * size).fill(""));
  const [player, setPlayer] = useState(PLAYER_X);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");

  const reset = useCallback(() => {
    setTiles(Array(size * size).fill(""));
    setPlayer(PLAYER_X);
    setGameOver(false);
    setWinner("");
  }, [size]);

  useEffect(() => {
    reset();
  }, [reset]);

  const checkWinnerLogic = (i, newTiles) => {
    const isDraw = newTiles.every(tile => !!tile);
    const isWinner = checkWinner(i, newTiles, size);
    setGameOver(isDraw || isWinner);
    setWinner(isDraw ? "Draw" : isWinner ? `Player-${player} wins` : "");
    setPlayer(player === PLAYER_X ? PLAYER_O : PLAYER_X);
  };

  const handleClick = i => {
    if (tiles[i] || gameOver) return;
    const newTiles = [...tiles];
    newTiles[i] = player;
    setTiles(newTiles);
    checkWinnerLogic(i, newTiles);
  };

  return (
    <div>
      <div className="game-info">
        {gameOver ? (
          <div className="winner">{winner}</div>
        ) : (
          <div>Current Player: <strong>{player}</strong></div>
        )}
      </div>
      <div
        className={`game-board ${gameOver ? "game-over" : ""}`}
        style={{ gridTemplateColumns: `repeat(${size}, auto)` }}
      >
        {tiles.map((val, i) => (
          <div className={`tile ${val}`} key={i} onClick={() => handleClick(i)}>
            {val}
          </div>
        ))}
      </div>
      {gameOver && <button onClick={reset}>Play Again</button>}
    </div>
  );
};

const TicTacToe = () => {
  const [size, setSize] = useState(3);

  return (
    <div className="container">
      <h1>🎮 Tic Tac Toe</h1>
      <p>Interview-Ready Solution</p>
      <div>
        <label htmlFor="grid-size" style={{ fontSize: '1rem', color: '#666', marginRight: '10px' }}>
          Grid Size:
        </label>
        <input
          id="grid-size"
          type="number"
          min={3}
          max={10}
          value={size}
          className="input-box"
          onChange={e => setSize(Math.max(3, Math.min(10, +e.target.value || 3)))}
        />
      </div>
      <Board size={size} />
    </div>
  );
};

export default TicTacToe;
