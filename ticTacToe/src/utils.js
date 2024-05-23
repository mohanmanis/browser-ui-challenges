export const PLAYER_X = "X";
export const PLAYER_O = "O";

export const checkWinner = (currIndex, tiles, size) => {
  const val = tiles[currIndex];
  const [row, col] = [Math.floor(currIndex / size), currIndex % size];

  const isWinningRow = Array.from({ length: size }, (_, i) => tiles[row * size + i] === val).every(Boolean);
  const isWinningCol = Array.from({ length: size }, (_, i) => tiles[i * size + col] === val).every(Boolean);

  const isWinningLeftDiagonal = row === col && Array.from({ length: size }, (_, i) => tiles[i * size + i] === val).every(Boolean);
  const isWinningRightDiagonal = row === size - col - 1 && Array.from({ length: size }, (_, i) => tiles[i * size + (size - i - 1)] === val).every(Boolean);

  return isWinningRow || isWinningCol || isWinningLeftDiagonal || isWinningRightDiagonal;
};
