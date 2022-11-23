//uppdate the bomb around field
function negsNum(board) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board.length; j++) {
      var currCell = board[i][j]
      currCell.minesAroundCount = countNeighbors(i, j, board)
    }
  }
}


function minesRandLOcation() {
  var minesCount = 2
  var i = 0
  if (gSize === 8) minesCount = 14
  else if (gSize === 12) minesCount = 32
  while (i < minesCount) {
    var indexI = getRandomIntInclusive(0, gSize - 1)
    var indexJ = getRandomIntInclusive(0, gSize - 1)
    if (!gBoard[indexI][indexJ].isMine) {
      gBoard[indexI][indexJ].isMine = true
      i++
    }

  }
}


function markMines(elTd, IdxI, IdxJ) {
  var currCell = gBoard[IdxI][IdxJ]
  event.preventDefault()
  currCell.isMarked = (!currCell.isMarked)
  currCell.isMarked ? gFlagCount++ : gFlagCount--
  if (currCell.isMarked) elTd.innerText = MARK
  else elTd.innerText = currCell.minesAroundCount
  elTd.style.color = 'black'

}

// function isCellZero(i, j) {

//   var currCell = gBoard[i][j]
//   if (currCell.minesAroundCount === 0) {
//     return true
//   } else return false

// }





// function expandShown(elTd, cellI, cellJ) {
//   // var currCell = gBoard[i][j]
//   if (isCellZero(cellI, cellJ)) {
//     elTd.innerText = EMPTY
//     for (var i = cellI - 1; i <= cellI + 1; i++) {
//       if (i < 0 || i >= gSize) continue;
//       for (var j = cellJ - 1; j <= cellJ + 1; j++) {
//         if (j < 0 || j >= gSize) continue;
//         if (i === cellI && j === cellJ) continue;
//         else {
//           gBoard[i][j].isShown = true
//           renderCell({ i: i, j: j }, gBoard[i][j].minesAroundCount)
//         }
//       }
//     }

//   }

// }


// function openAutoCell(cellI, cellJ, board) {
//   var neighborsCount = 0;
//   for (var i = cellI - 1; i <= cellI + 1; i++) {
// if (i < 0 || i >= board.length) continue;
// for (var j = cellJ - 1; j <= cellJ + 1; j++) {
//   if (j < 0 || j >= board[i].length) continue;
//   if (i === cellI && j === cellJ) continue;
//   if (board[i][j].isMine) neighborsCount++;
//     }
//   }
//   return neighborsCount;
// }