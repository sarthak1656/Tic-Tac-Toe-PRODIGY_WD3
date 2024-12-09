const cells = document.querySelectorAll(".cell");
const winnerMessage = document.getElementById("winner-message");
const restartBtn = document.getElementById("restart-btn");
const multiplayerBtn = document.getElementById("multiplayer-btn");
const aiBtn = document.getElementById("ai-btn");
const resultDiv = document.querySelector(".result");
const multiplayerIndicator = document.getElementById("multiplayer-indicator");
const aiIndicator = document.getElementById("ai-indicator");


let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameMode = ""; // 'multiplayer' or 'ai'
let isGameOver = false;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Function to update mode indicator
function updateModeIndicator() {
  if (gameMode === "multiplayer") {
    multiplayerIndicator.classList.add("active");
    aiIndicator.classList.remove("active");
  } else if (gameMode === "ai") {
    aiIndicator.classList.add("active");
    multiplayerIndicator.classList.remove("active");
  }
}

// Check for a winner
function checkWinner() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      isGameOver = true;
      resultDiv.style.display = "block";
      winnerMessage.textContent = `${board[a]} Wins!`;
      return true;
    }
  }
  if (!board.includes("")) {
    isGameOver = true;
    resultDiv.style.display = "block";
    winnerMessage.textContent = `It's a Tie!`;
    return true;
  }
  return false;
}

// AI move
function aiMove() {
  let availableCells = board
    .map((val, index) => (val === "" ? index : null))
    .filter((val) => val !== null);
  let randomIndex =
    availableCells[Math.floor(Math.random() * availableCells.length)];
  board[randomIndex] = "O";
  cells[randomIndex].textContent = "O";
  cells[randomIndex].classList.add("taken");
  if (checkWinner()) return;
  currentPlayer = "X";
}

// Cell click handler
function cellClickHandler(e) {
  const index = e.target.dataset.index;
  if (board[index] || isGameOver) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add("taken");

  if (checkWinner()) return;

  if (gameMode === "ai" && currentPlayer === "X") {
    currentPlayer = "O";
    setTimeout(aiMove, 500);
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

// Restart the game
function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameOver = false;
  resultDiv.style.display = "none";
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
}

// Mode selection
multiplayerBtn.addEventListener("click", () => {
  gameMode = "multiplayer";
  updateModeIndicator();
  restartGame();
});

aiBtn.addEventListener("click", () => {
  gameMode = "ai";
  updateModeIndicator();
  restartGame();
});

// Add event listeners to cells
cells.forEach((cell) => cell.addEventListener("click", cellClickHandler));

// Restart button
restartBtn.addEventListener("click", restartGame);
