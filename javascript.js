const boardElement = document.getElementById('board');
  const restartButton = document.getElementById('restartButton');
  let currentPlayer = 'X';
  let gameState = ['', '', '', '', '', '', '', '', ''];
  let winner = null;

  const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  const checkForWin = () => {
    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
        winner = gameState[a];
        return true;
      }
    }
    return false;
  };

  const checkForDraw = () => {
    return gameState.every(cell => cell !== '');
  };

  const cellClicked = (e) => {
    const cellIndex = parseInt(e.target.getAttribute('data-cell-index'));
    if (gameState[cellIndex] !== '' || winner) {
      return;
    }
    gameState[cellIndex] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkForWin()) {
      setTimeout(() => alert(`Player ${winner} Wins!`), 10);
      restartButton.classList.remove('hidden');
    } else if (checkForDraw()) {
      setTimeout(() => alert("It's a draw! Better luck next time."), 10);
      restartButton.classList.remove('hidden');
    } else {
      changePlayer();
    }
  };

  const changePlayer = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  };

  const restartGame = () => {
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    winner = null;
    restartButton.classList.add('hidden');
    boardElement.innerHTML = '';
    createBoard();
  };

  const createBoard = () => {
    for (let i = 0; i < 9; i++) {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      cellElement.setAttribute('data-cell-index', i);
      cellElement.addEventListener('click', cellClicked);
      boardElement.appendChild(cellElement);
    }
  };

  createBoard();

  restartButton.addEventListener('click', restartGame);