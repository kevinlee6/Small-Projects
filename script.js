const startBtn = document.getElementById('start');
const container = document.getElementById('container');

class Game {
  constructor() {
    this.playerOne = 'X';
    this.playerTwo = 'O';
    this.winCombos = {
      horizontal: [[0, 1, 2], [3, 4, 5], [6, 7, 8]],
      vertical: [[0, 3, 6], [1, 4, 7], [2, 5, 8]],
      diagonal: [[0, 4, 8], [2, 4, 6]],
    };
    this.state = {
      turnNum: 0,
      turnPlayer: this.playerOne,
      history: [],
      win: false,
    };
  }

  checkIfWin = () => {

  }

  createGame = () => {
    for (let i = 0; i < 9; i++) {
      this.createPiece(container);
    }
  }

  createPiece = i => {
    const piece = document.createElement('div');
    piece.classList.add(`piece piece-${i}`);

    piece.onclick(e => {
      const player = this.state.turnPlayer;

      // Set X or O
      piece.textContent =
        player === this.playerOne ?
          this.playerOne : this.playerTwo;

      // Check win
      this.checkIfWin() ? this.win() : this.noWin();

      // Push into history (moves array)
      this.state.history.push(i);
    });

    // global const, container
    container.appendChild(piece);
  }
  
  noWin = () => {
    this.state.turnNum += 1;

    this.state.turnPlayer =
      this.state.turnPlayer === this.playerOne ?
        this.playerTwo : this.playerOne;
  }

  win = () => {
    this.state.win = true;
  }
};