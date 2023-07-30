const containerChoice = document.querySelector(".container-choice");
const containerGame = document.querySelector(".container-game");

const symbolX = document.querySelector(".cross");
const symbolO = document.querySelector(".circle");

// Store the choice of the player in a variable

let player1Choice = "";
let player2Choice = "";

symbolX.addEventListener("click", (e) => {
	player1Choice = "X";
	player2Choice = "O";
	console.log(player1Choice);
	console.log(player2Choice);
	changePage();
});

symbolO.addEventListener("click", (e) => {
	player1Choice = "O";
	player2Choice = "X";
	console.log(player1Choice);
	console.log(player2Choice);
});

// Change the page to the game page

function changePage() {
	if (player1Choice !== "" && player2Choice !== "") {
		containerChoice.style.display = "none";
		containerGame.style.display = "flex";
	}
}
