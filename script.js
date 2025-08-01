const board = document.getElementById('board');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');
const endScreen = document.getElementById('endScreen');
const resultText = document.getElementById('resultText');
const newGameBtn = document.getElementById('newGameBtn');

let cells = [];
let currentPlayer = 'X';
let boardState = Array(9).fill(null);
let gameActive = true;

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function createBoard() {
  board.innerHTML = '';
  cells = [];
  boardState = Array(9).fill(null);
  gameActive = true;
  currentPlayer = 'X';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  endScreen.classList.add('hidden');

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleClick);
    board.appendChild(cell);
    cells.push(cell);
  }
}

function handleClick(e) {
  const index = e.target.dataset.index;

  if (boardState[index] || !gameActive) return;

  boardState[index] = currentPlayer;
  cells[index].textContent = currentPlayer;

  const winnerCombo = checkWinner();
  if (winnerCombo) {
    highlightWinningCells(winnerCombo);
    showEndScreen(`Player ${currentPlayer} wins!`);
    return;
  }

  if (boardState.every(cell => cell !== null)) {
    showEndScreen("It's a draw!");
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      return combo;
    }
  }
  return null;
}

function highlightWinningCells(combo) {
  combo.forEach(index => {
    cells[index].style.backgroundColor = '#9be7a1';
  });
  gameActive = false;
}

function showEndScreen(message) {
  gameActive = false;
  resultText.textContent = message;
  endScreen.classList.remove('hidden');
}

restartBtn.addEventListener('click', createBoard);
newGameBtn.addEventListener('click', createBoard);

// Initialize game
createBoard();