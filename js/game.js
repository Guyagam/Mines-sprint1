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
// 


const gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0, life: 3, hint: 3, isHint: false, safeClick: 3 }
const gLevel = { SIZE: 4, MINES: 2 };

function initGame() {
  gBoard = buildBoard()
  document.querySelector('.smiley').innerText = Happy
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
  clearInterval(gInterval)
  document.querySelector('.min').innerText = '00'
  document.querySelector('.sec').innerText = '00'
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
        i: i,
        j: j,
        isVisited: false
      }
    }
  }

  return board
}



var audio1 = document.getElementById("mysong1");
function cellClicked(elTd, IdxI, IdxJ) {
  audio1.play();
  if (gGame.shownCount === 0) {
    gInterval = setInterval(timer, '1000')
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
    gGame.shownCount--
    gGame.markedCount++
    gGame.life--
    document.querySelector('#life').innerText = renderLife()
    if (gGame.life === 0) {
      audio1.pause()
      revelBomb();
      setTimeout(() => {

        lose();
      }, "200")
    }
  }
  win();
}

function lose() {
  clearInterval(gInterval)
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
    clearInterval(gInterval)
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


function safeClick() {
  if (gGame.safeClick === 0) {
    alert('no help for you!')
    return
  }
  var CellsNotBomb = getCellsNotMines()
  var randomcell = CellsNotBomb[getRandomIntInclusive(0, CellsNotBomb.length - 1)]
  console.log(randomcell)
  while (randomcell.isShown) {
    var randomcell = CellsNotBomb[getRandomIntInclusive(0, CellsNotBomb.length - 1)]
  }
  var currTD = document.querySelector(`.cell-${randomcell.i}-${randomcell.j}`)
  changeToSafe(currTD)
  gGame.safeClick--
  setTimeout(() => {
    changeToBase(currTD);
  }, "2000")


}


function changeToBase(elTd) {
  elTd.classList.remove('safeTd')
  elTd.classList.add('cell')

}

function changeToSafe(elTd) {
  elTd.classList.remove('cell')
  elTd.classList.add('safeTd')
}


  // var indexI = getRandomIntInclusive(0, gLevel.SIZE - 1)
  // var indexJ = getRandomIntInclusive(0, gLevel.SIZE - 1)
  // if (!gBoard[indexI][indexJ].isMine) {
  //   var currTD = document.querySelector(`.cell-${i}-${j}`)
  //   currTD.backgroundcolor = 'yellow'
  // }


  // var randCell = getRandomCell()
  // if (!gBoard[randCell.i][randCell.j].isMine) {
  //   var currTD = document.querySelector(`.cell-${randCell.i}-${randCell.j}`)
  //   console.log(currTD)
  //   currTD.backgroundcolor = 'yellow'
  // }