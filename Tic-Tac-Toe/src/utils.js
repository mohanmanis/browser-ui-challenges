export const PLAYER_X = 'X';
export const PLAYER_O = 'O';


const getRowCol = (index, size) => {
  return { row: Math.floor(index / size), col: Math.floor(index % size) }
}

const getIndex = (row, col, size) => row * size + col;

export const checkWinner = (index, size, player, tiles) => {
  const { row, col } = getRowCol(index, size);
  const val = player === PLAYER_X ? PLAYER_O : PLAYER_X;

  // row-wise
  let isSame = true;
  for (let i = 0; i < size; i++) {
    const idx = getIndex(row, i, size);
    if (tiles[idx] !== val) {
      isSame = false;
      break;
    }
  }
  if (isSame) return true;

  // col-wise
  isSame = true;
  for (let i = 0; i < size; i++) {
    const idx = getIndex(i, col, size);
    if (tiles[idx] !== val) {
      isSame = false;
      break;
    }
  }
  if (isSame) return true;

  // diagonal-wise: left
  if (row === col) {
    isSame = true;
    for (let i = 0; i < size; i++) {
      const idx = getIndex(i, i, size);
      if (tiles[idx] != val) {
        isSame = false;
        break;
      }
    }
    if (isSame) return true;
  }

  // diagonal-wise: right
  isSame = true;
  for (let i = 0, j = size - 1; i < size; i++, j--) {
    const idx = getIndex(i, j, size);
    if (tiles[idx] != val) {
      isSame = false;
      break;
    }
  }
  if (isSame) return true;
}
