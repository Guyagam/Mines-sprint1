var minesCount = 2
//uppdate the bomb around field
function negsNum(board) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board.length; j++) {
      var currCell = board[i][j]
      currCell.minesAroundCount = countNeighbors(i, j, board)
    }
  }
}


function minesRandLOcation(i, j) {
  var counter = 0
  gLevel.MINES = 2
  if (gLevel.SIZE === 8) gLevel.MINES = 14
  else if (gLevel.SIZE === 12) gLevel.MINES = 32
  while (counter < gLevel.MINES) {
    var indexI = getRandomIntInclusive(0, gLevel.SIZE - 1)
    var indexJ = getRandomIntInclusive(0, gLevel.SIZE - 1)
    while (indexI === i && indexJ === j) {
      indexI = getRandomIntInclusive(0, gLevel.SIZE - 1)
      indexJ = getRandomIntInclusive(0, gLevel.SIZE - 1)
    }
    if (!gBoard[indexI][indexJ].isMine) {
      gBoard[indexI][indexJ].isMine = true
      counter++
    }
  }
}


function markMines(elTd, IdxI, IdxJ) {
  var currCell = gBoard[IdxI][IdxJ]
  event.preventDefault()
  currCell.isMarked = (!currCell.isMarked)
  currCell.isMarked ? gGame.markedCount++ : gGame.markedCount--
  console.log("markedcount", gGame.markedCount);
  if (currCell.isMarked) {
    elTd.innerText = MARK
    elTd.style.color = 'black'
  }
  else {
    if (currCell.isMine) {
      elTd.innerText = BOMB
    }
    else {
      elTd.innerText = currCell.minesAroundCount
    }

    elTd.style.color = 'transparent'
  }
  setTimeout(() => {

    win();
  }, "200")
}

function revelBomb() {
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard.length; j++) {

      if (gBoard[i][j].isMine) {
        var currTD = document.querySelector(`.cell-${i}-${j}`)
        console.log("bomb loop", gBoard[i][j])
        gBoard[i][j].isShown = true
        currTD.classList.remove('cell')
        currTD.style.color = 'red'
      }
    }
  }
}





