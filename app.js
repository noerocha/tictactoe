const boxes = Array.from(document.getElementsByClassName("box"));
const playText = document.getElementById("playText");
const restartBtn = document.getElementById("restart");

const O_TEXT = "O";
const X_TEXT = "X";

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let spaces = [null, null, null, null, null, null, null, null, null];
let currentPlayer = O_TEXT;
let hasWinner = null;

const drawBoard = () => {
  boxes.forEach((box, index) => {
    let styleString = "";

    //top boxes
    if (index < 3) {
      styleString += `border-bottom: 3px solid var(--purple);`;
    }

    //left boxes
    if (index % 3 === 0) {
      styleString += `border-right: 3px solid var(--purple);`;
    }

    //right boxes
    if (index % 3 === 2) {
      styleString += `border-left: 3px solid var(--purple);`;
    }

    //bottom boxes
    if (index > 5) {
      styleString += `border-top: 3px solid var(--purple);`;
    }

    box.style = styleString;
    box.addEventListener("click", boxClicked);
  });
};

const boxClicked = (evt) => {
  const id = evt.target.id;

  //if someone has won, don't let players continue to play
  if (hasWinner) {
    return;
  }

  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    evt.target.innerText = currentPlayer;

    //check if any player has won
    const hasWon = winPatterns.find((pattern) => {
      return (
        currentPlayer === spaces[pattern[0]] &&
        currentPlayer === spaces[pattern[1]] &&
        currentPlayer === spaces[pattern[2]]
      );
    });

    if (hasWon) {
      playText.innerText = `Player ${currentPlayer} has won !`;
      hasWinner = currentPlayer;
      return;
    }

    currentPlayer = currentPlayer === O_TEXT ? X_TEXT : O_TEXT;
  }
};

const restartGame = () => {
  //reset player plays
  spaces = spaces.map((e) => null);

  //reset boxes
  boxes.forEach((box) => (box.innerText = ""));

  //reset text
  playText.innerText = `Let's Play !`;

  //reset starting player
  currentPlayer = O_TEXT;

  //reset do we have a winner
  hasWinner = null;
};

restartBtn.addEventListener("click", restartGame);

restartGame();
drawBoard();
