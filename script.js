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
    this.handlers = [];
  }

  checkIfWin() {
    const pieces = document.getElementsByClassName('piece'); 

    for (let k in this.winCombos) {
      const combos = this.winCombos[k];

      // Only one of the combos need to be met to win
      const res = combos.some(combo => {
        const compare = pieces.item(combo[0]).textContent;
        if (compare === '') return false;
        return combo.every(i => pieces.item(i).textContent === compare);
      });

      if (res) return true;
    }

    // If all cases are checked and there's no match, then
    return false;
  }

  createGame() {
    for (let i = 0; i < 9; i++) {
      this.createPiece(i);
    }
  }

  createPiece(i) {
    const piece = document.createElement('div');
    piece.classList.add('piece', 'responsive');


    piece.addEventListener('click', this.handleClickPiece(piece, i));

    // global const, container
    container.appendChild(piece);
  }

  handleClickPiece(piece, i) {
    const cb = () => {
        // Set X or O
        piece.textContent =
          this.state.turnPlayer === this.playerOne ?
            this.playerOne : this.playerTwo;

        // Push into history (moves array); i from closure
        this.state.history.push(i);

        // Check win
        this.checkIfWin() ? this.win() : this.noWin();

        piece.removeEventListener('click', cb);
        piece.classList.remove('responsive');
    }
    this.handlers.push(cb);
    return cb;
  }
  
  noWin() {
    this.state.turnNum += 1;

    this.state.turnPlayer =
      this.state.turnPlayer === this.playerOne ?
        this.playerTwo : this.playerOne;
  }

  win() {
    this.state.win = true;
    const pieces = document.getElementsByClassName('piece');
    for (let i = 0; i < pieces.length; i++) {
      pieces[i].removeEventListener('click', this.handlers[i]);
      pieces[i].classList.remove('responsive');
    }
  }
};

const startBtn = document.getElementById('start');
const game = new Game();

startBtn.addEventListener('click', e => {
  e.preventDefault();
  container.removeChild(startBtn);
  game.createGame(); 
});