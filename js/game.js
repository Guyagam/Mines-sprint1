'use strict'

const BOMB = '💣'
const MARK = '🚩'
const EMPTY = ''
var gBoard
var gClickedCount = 0
var gFlagCount = 0
var gminesAmount = 2
var gSize = 4



function initGame() {
  gBoard = buildBoard()
  minesRandLOcation()
  negsNum(gBoard)
  renderBoard(gBoard, '.container')
}

function getLevel(num) {
  gSize = num
  initGame()
}

function buildBoard() {
  var size = gSize
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
  gClickedCount++
  gBoard[IdxI][IdxJ].isShown = true
  elTd.classList.remove('cell')
  elTd.style.color = 'red'
  // expandShown(elTd, IdxI, IdxJ)
  setTimeout(() => {
    gameOver(IdxI, IdxJ);
  }, "200")
}



function gameOver(i, j) {
  if (gBoard[i][j].isMine) {
    alert('game over ')
    initGame()
  }

  if (gClickedCount === (gBoard.length * gBoard.length) - gminesAmount && gFlagCount === gminesAmount) {
    alert('congrats you win!')
  }
}