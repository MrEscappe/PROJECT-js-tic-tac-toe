// Selecting elements from the DOM
const containerChoice = document.querySelector(".container-choice");
const containerGame = document.querySelector(".container-game");
const turnText = document.querySelector(".turn");
const playerxScore = document.querySelector(".playerX_score");
const playeroScore = document.querySelector(".playerO_score");
const drawScoreText = document.querySelector(".draw_score");
const playAgainContainer = document.querySelector(".container-play_again");
const resetButton = document.querySelector(".reset__button");
const turnPlayer = document.getElementById("turn-player");

const symbolX = document.querySelector(".cross");
const symbolO = document.querySelector(".circle");

const cells = document.querySelectorAll(".game_cell");

// Store the choice of the player in a variable
let player1Choice = "X";
let player2Choice = "O";
let player1Turn = true;
let player1Score = 0;
let player2Score = 0;
let drawScore = 0;
let turnCount = 0;
let win = false;

/**
 * Handles the click event on the symbol buttons.
 * @param {string} symbol - The symbol chosen by the player.
 */
function handleSymbolClick(symbol) {
	if (symbol === "X") {
		player1Choice = "X";
		player2Choice = "O";
	} else if (symbol === "O") {
		player1Choice = "X";
		player2Choice = "O";
	}
	changePage();
}

// Add event listeners to the symbol buttons
symbolX.addEventListener("click", () => {
	handleSymbolClick("X");
});

symbolO.addEventListener("click", () => {
	handleSymbolClick("O");
});

/**
 * Changes the page from the choice screen to the game screen.
 */
function changePage() {
	if (player1Choice !== "" && player2Choice !== "") {
		containerChoice.style.display = "none";
		containerGame.style.display = "flex";
	}
}

// Game

// Array of all possible win combinations
const WIN_COMBINATIONS = [
	// Rows
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	// Columns
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	// Diagonal
	[0, 4, 8],
	[2, 4, 6],
];

// Array representing the game board
let board = ["", "", "", "", "", "", "", "", ""];

// Add click event listeners to all cells
cells.forEach((cell, index) => {
	cell.addEventListener("click", () => {
		const cellContent = cell.querySelector(".game_cell--symbol").textContent;
		if (cellContent === "" && turnCount < 9 && !win) {
			if (player1Turn) {
				cell.querySelector(".game_cell--symbol").textContent = player1Choice;
				board[index] = player1Choice;
				updateTurn();
				player1Turn = false;
			} else {
				cell.querySelector(".game_cell--symbol").textContent = player2Choice;
				board[index] = player2Choice;
				updateTurn();
				player1Turn = true;
			}
			turnCount++;
			winCheck();
		}
	});
});

/**
 * Updates the turn text to show the current player's symbol.
 */
function updateTurn() {
	if (player1Turn) {
		turnPlayer.textContent = player1Choice;
	} else {
		turnPlayer.textContent = player2Choice;
	}
}

/**
 * Checks if a player has won the game.
 */
function winCheck() {
	for (let i = 0; i < WIN_COMBINATIONS.length; i++) {
		const winCheck = WIN_COMBINATIONS[i];
		if (board[winCheck[0]] === board[winCheck[1]] && board[winCheck[1]] === board[winCheck[2]] && board[winCheck[0]] !== "") {
			switch (board[winCheck[0]]) {
				case "X":
					turnText.innerHTML = `
                    <p>${player1Choice} Wins!</p>
                    `;
					win = true;
					player1Score++;
					playerxScore.textContent = player1Score;
					playAgainContainer.style.display = "flex";
					break;
				case "O":
					turnText.innerHTML = `
                    <p>${player2Choice} Wins!</p>
                    `;
					win = true;
					player2Score++;
					playeroScore.textContent = player2Score;
					playAgainContainer.style.display = "flex";
					break;
			}
		}
	}
	if (turnCount === 9 && !win) {
		drawScore++;
		turnText.innerHTML = `
        <p>Draw!</p>
        `;
		drawScoreText.textContent = drawScore;
		playAgainContainer.style.display = "flex";
	}
}

// Add click event listener to the play again button
playAgainContainer.addEventListener("click", () => {
	turnCount = 0;
	win = false;
	board = ["", "", "", "", "", "", "", "", ""];
	cells.forEach((cell) => {
		cell.querySelector(".game_cell--symbol").textContent = "";
	});
	playAgainContainer.style.display = "none";
	player1Turn = true;

	updateTurn(); // Update the turn__player element with the initial value

	turnText.innerHTML = `
                    <p>
                        Turn:
                        <span id="turn-player" class="turn__player">X</span>
                    </p>
                `;
});

// Add click event listener to the reset button
resetButton.addEventListener("click", () => {
	turnCount = 0;
	win = false;
	board = ["", "", "", "", "", "", "", "", ""];
	cells.forEach((cell) => {
		cell.querySelector(".game_cell--symbol").textContent = "";
	});
	playAgainContainer.style.display = "none";
	player1Turn = true;

	updateTurn();

	turnText.innerHTML = `
                    <p>
                        Turn:
                        <span id="turn-player" class="turn__player">X</span>
                    </p>
                `;

	player1Score = 0;
	player2Score = 0;
	drawScore = 0;
	playerxScore.textContent = player1Score;
	playeroScore.textContent = player2Score;
	drawScoreText.textContent = drawScore;
});
