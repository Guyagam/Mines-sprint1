'use strict'

const BOMB = '💣'
const MARK = '🚩'
const EMPTY = ''
const Happy = '😋'
const DEAD = '💀'
const WIN = '🤩'
var gBoard
var gFlagCount = 0
var gInterval

const gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0, life: 3 }
const gLevel = { SIZE: 4, MINES: 2 };

function initGame() {

  document.querySelector('.smiley').innerText = Happy
  gBoard = buildBoard()
  gGame.life = 3
  if (gLevel.SIZE === 4) {
    gGame.life = 2
  }
  document.querySelector('#life').innerText = renderLife()
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



var audio1 = document.getElementById("mysong1");
function cellClicked(elTd, IdxI, IdxJ) {
  audio1.play();

  if (gGame.shownCount === 0) {
    minesRandLOcation(IdxI, IdxJ)
    negsNum(gBoard)
    renderBoard(gBoard, '.container')
    revealCell(IdxI, IdxJ)
    gGame.shownCount--
  }
  if (elTd.classList.contains('cell')) gGame.shownCount++

  gBoard[IdxI][IdxJ].isShown = true
  elTd.classList.remove('cell')
  elTd.style.color = 'red'
  checkAndRevealNeighb(IdxI, IdxJ)
  document.querySelector('#shown').innerText = gGame.shownCount
  if (gBoard[IdxI][IdxJ].isMine) {
    gGame.life--
    document.querySelector('#life').innerText = renderLife()
    gGame.shownCount--
    gGame.markedCount++
    if (gGame.life === 0) {
      audio1.pause()
      revelBomb();
      setTimeout(() => {

        lose();
      }, "200")
    }
    // console.log("helloi");

  }
  win();
}

function lose() {
  var audio2 = document.getElementById("mysong2");
  audio2.play();
  document.querySelector('.smiley').innerText = DEAD
  gLevel.MINES = 2
  gGame.markedCount = 0
  gLevel.SIZE = 4
  gGame.shownCount = 0
}

function win() {
  if (gGame.shownCount === (gBoard.length ** 2) - gLevel.MINES && gGame.markedCount === gLevel.MINES) {
    audio1.pause()
    var audio3 = document.getElementById("mysong3");
    audio3.play();
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