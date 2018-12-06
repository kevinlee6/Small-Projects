const board = document.getElementById('board');
const results = document.getElementById('results');

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

    // global const, board
    board.appendChild(piece);
  }

  endGame() {
    const pieces = document.getElementsByClassName('piece');
    for (let i = 0; i < pieces.length; i++) {
      pieces[i].removeEventListener('click', this.handlers[i]);
      pieces[i].classList.remove('responsive');
    }
    const text = this.state.win ?
      `Congratulations! ${this.state.turnPlayer} won the game.` :
      'Draw. There are no more spaces on the board.'
    const template = 
      `<div>${text}</div>
      <button id='reset' class='button'>Reset</button>`
    results.innerHTML = template;
    
    const reset = document.getElementById('reset');
    reset.addEventListener('click', this.reset());
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

        // Check if there are any more moves available
        if (this.state.win || this.state.turnNum > 8) {
          this.endGame();
        }
        else {
          piece.removeEventListener('click', cb);
          piece.classList.remove('responsive');
        }

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

  reset() {
    return () => {
      this.state = {
        turnNum: 0,
        turnPlayer: this.playerOne,
        history: [],
        win: false,
      }
      results.textContent = '';
      board.textContent = '';
      this.createGame();
    }
  }

  win() {
    this.state.win = true;
  }
};

const startBtn = document.getElementById('start');
const game = new Game();

startBtn.addEventListener('click', e => {
  e.preventDefault();
  board.removeChild(startBtn);
  game.createGame(); 
});