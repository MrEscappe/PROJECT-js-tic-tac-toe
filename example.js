class TicTacToe {
	constructor() {
		this.players = new Players();
	}

	start() {
		this.count = 1;
		this.win = false;
		this.render = new Board();
		while (this.count < 10) {
			if (this.count % 2 === 1) {
				this.turn(this.players.p1, "X");
			} else {
				this.turn(this.players.p2, "O");
			}
		}
	}

	turn(player, symbol) {
		console.log(`${player}(${symbol}) choose one available space`);
		this.move = parseInt(prompt("Choose one available space")) - 1;
		if (this.move >= 0 && this.move <= 8 && this.render.board[this.move] === " " && !this.win) {
			this.count++;
			this.render.update(this.move, symbol);
			this.winCheck();
			this.tieCheck();
		} else {
			console.log("Put an available position!");
		}
	}

	winCheck() {
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
		for (let i = 0; i < WIN_COMBINATIONS.length; i++) {
			const winCheck = WIN_COMBINATIONS[i];
			if (
				this.render.board[winCheck[0]] === this.render.board[winCheck[1]] &&
				this.render.board[winCheck[1]] === this.render.board[winCheck[2]] &&
				this.render.board[winCheck[0]] !== " "
			) {
				switch (this.render.board[winCheck[0]]) {
					case "X":
						console.log(`${this.players.p1} Wins!`);
						this.win = true;
						this.count = 10;
						break;
					case "O":
						console.log(`${this.players.p2} Wins!`);
						this.win = true;
						this.count = 10;
						break;
				}
			}
		}
	}

	tieCheck() {
		if (this.count === 10 && !this.win) {
			console.log("It's a draw");
		}
	}
}

class Players {
	constructor() {
		this.p1 = prompt("What is your name?");
		console.log(`Great ${this.p1}, your symbol is 'X'`);
		this.p2 = prompt("What is your name player 2?");
		console.log(`Great ${this.p2}, your symbol is 'O'`);
	}
}

class Board {
	constructor() {
		console.log("Choose one of the available places(1-9):");
		console.log(" 1 | 2 | 3 ");
		console.log("---+---+---");
		console.log(" 4 | 5 | 6 ");
		console.log("---+---+---");
		console.log(" 7 | 8 | 9 ");
		this.board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
	}

	update(position, symbol) {
		this.board[position] = symbol;
		this.renderBoard(this.board);
	}

	renderBoard(board) {
		console.log(` ${board[0]} | ${board[1]} | ${board[2]}`);
		console.log("---+---+---");
		console.log(` ${board[3]} | ${board[4]} | ${board[5]}`);
		console.log("---+---+---");
		console.log(` ${board[6]} | ${board[7]} | ${board[8]}`);
	}
}
