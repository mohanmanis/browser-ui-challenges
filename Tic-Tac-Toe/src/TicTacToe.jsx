import { useEffect, useState } from "react";
import { PLAYER_O, PLAYER_X, checkWinner } from "./utils";

const TicTacToe = ({ gridSize = 3 }) => {
  const [size, setSize] = useState(gridSize);
  const [gameStart, setGameStart] = useState(false);

  const onChangeHandler = (e) => {
    setSize(+e.target.value);
    if (gameStart) {
      setGameStart(false);
    }
  };

  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>
      <div className="form">
        <input
          type="number"
          value={size}
          onChange={onChangeHandler}
          min={0}
          placeholder="Provide the grid size"
          className="input-box"
        />
        <button onClick={() => setGameStart(true)} disabled={size <= 0}>
          Start Game
        </button>
      </div>
      {gameStart && <Board size={size} />}
    </div>
  );
};

const Board = ({ size }) => {
  const [tiles, setTiles] = useState(Array(size * size).fill(""));
  const [player, setPlayer] = useState(PLAYER_X);
  const [curInd, setCurInd] = useState(-1);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");
  console.log(tiles);
  useEffect(() => {
    const result = checkWinner(curInd, size, player, tiles);
    if (result) {
      setGameOver(true);
      setWinner(`Player-${player === PLAYER_X ? PLAYER_O : PLAYER_X} wins`);
    } else {
      const allFilled = tiles.every((tile) => tile != "");
      if (allFilled) {
        setGameOver(true);
        setWinner("Draw");
      }
    }
  }, [tiles]);

  const clickHandler = (index) => {
    if (tiles[index] != "" || gameOver) return;
    setTiles((prev) => {
      const newTiles = [...prev];
      newTiles[index] = player;
      return newTiles;
    });
    setCurInd(index);
    setPlayer((prev) => (prev === PLAYER_X ? PLAYER_O : PLAYER_X));
  };

  const resetBoard = () => {
    setPlayer(PLAYER_X);
    setGameOver(false);
    setWinner("");
    setTiles(Array(size * size).fill(""));
    setCurInd(-1);
  };

  return (
    <div>
      <div
        className={["game-board", gameOver && "game-over"]
          .filter(Boolean)
          .join(" ")}
        style={{
          gridTemplateColumns: `repeat(${size}, auto)`,
          gridTemplateRows: `${size}, auto`,
        }}
      >
        {tiles.map((val, i) => (
          <div className="tile" key={i} onClick={() => clickHandler(i)}>
            {val}
          </div>
        ))}
      </div>
      {gameOver && (
        <>
          <p>Game Over- {winner}</p>
          <button onClick={resetBoard}>Reset Board</button>
        </>
      )}
    </div>
  );
};

export default TicTacToe;
