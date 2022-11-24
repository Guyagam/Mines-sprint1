'use strict'

const BOMB = '💣'
const MARK = '🚩'
const EMPTY = ''
const Happy = '😋'
const DEAD = '💀'
const WIN = '🤩'
var gLife = ['0', '💙', '💙💙', '💙💙💙']
var gBoard
var gFlagCount = 0
var gInterval
var lifeSymbol = 2

const gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0, life: 3 }
const gLevel = { SIZE: 4, MINES: 2 };

function initGame() {
  document.querySelector('.smiley').innerText = Happy
  document.querySelector('#life').innerText = gLife[3]
  gGame.life = 3

  gBoard = buildBoard()

  renderBoard(gBoard, '.container')
}

function getLevel(num) {
  gLevel.SIZE = num
  gLevel.MINES = 2
  gGame.markedCount = 0
  gGame.shownCount = 0
  initGame()
}

function getLevelVal() {
  gLife = ['0', '💙', '💙💙', '💙💙💙']
  lifeSymbol = 2
  return gLevel.SIZE
}

function buildBoard() {
  var size = gLevel.SIZE
  const board = []

  for (var i = 0; i < size; i++) {
    board.push([])
    for (var j = 0; j < size; j++) {
      board[i][j] = {
        minesAroundCount: null,
        isShown: false,
        isMine: false,
        isMarked: false,
      }
    }
  }

  return board
}


function cellClicked(elTd, IdxI, IdxJ) {
  if (gGame.shownCount === 0) {
    minesRandLOcation(IdxI, IdxJ)
    negsNum(gBoard)
    renderBoard(gBoard, '.container')
    revealCell(IdxI, IdxJ)
    gGame.shownCount--

  }
  gGame.shownCount++
  gBoard[IdxI][IdxJ].isShown = true
  elTd.classList.remove('cell')
  elTd.style.color = 'red'
  checkAndRevealNeighb(IdxI, IdxJ)
  document.querySelector('#shown').innerText = gGame.shownCount
  if (gBoard[IdxI][IdxJ].isMine) {
    gGame.life--
    console.log(lifeSymbol)
    document.querySelector('#life').innerText = gLife[lifeSymbol]
    lifeSymbol--
    console.log(lifeSymbol)

    if (gGame.life === 0) {
      revelBomb();
      setTimeout(() => {

        lose();
      }, "200")
    }
    console.log("helloi");

  }
  win();


}

function lose() {
  console.log('lose');
  document.querySelector('.smiley').innerText = DEAD
  gLevel.MINES = 2
  gGame.markedCount = 0
  gLevel.SIZE = 4
  gGame.shownCount = 0
}

function win() {
  console.log("shown count", gGame.shownCount, "mines", gGame.markedCount)
  if (gGame.shownCount === (gBoard.length ** 2) - gLevel.MINES && gGame.markedCount === gLevel.MINES) {
    document.querySelector('.smiley').innerText = WIN
    gLevel.MINES = 2
    gGame.markedCount = 0
    gLevel.SIZE = 4
    gGame.shownCount = 0
  }
}

function checkAndRevealNeighb(i, j) {
  if (gBoard[i][j].minesAroundCount === 0 && !gBoard[i][j].isMine) {
    revealNeighbors(i, j, gBoard)
  }
}