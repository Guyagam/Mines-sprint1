'use strict'

function renderBoard(mat, selector) {

    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {
            var cell = mat[i][j]
            if (!cell.isMine) {
                cell = cell.minesAroundCount
            }
            else cell = BOMB
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}"oncontextmenu=markMines(this,${i},${j}) onclick="cellClicked(this,${i},${j})">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}///max includ



function getRandomColor() {
    const letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function shuffle(items) {
    var randIdx, keep, i;
    for (i = items.length - 1; i > 0; i--) {
        randIdx = getRandomInt(0, items.length - 1);

        keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}
function drawNum() {
    return nums.pop()
}

function createMat(ROWS, COLS) {
    const mat = []
    for (var i = 0; i < ROWS; i++) {
        const row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}



function getCellsNotMines() {
    var cells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            var currCell = gBoard[i][j]
            if (!currCell.isMine) {
                cells.push(currCell)
            }
        }
    }
    return cells
}

function getEmptyCells() {
    const emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            emptyCells.push({ i, j })

        }
    }
    return emptyCells
}

function countNeighbors(cellI, cellJ, board) {
    var neighborsCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= board[i].length) continue;
            if (i === cellI && j === cellJ) continue;
            if (board[i][j].isMine) neighborsCount++;
        }
    }
    return neighborsCount;
}

function revealNeighbors(cellI, cellJ, board) {
    gBoard[cellI][cellJ].isVisited = true
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= board[i].length) continue;
            if (i === cellI && j === cellJ) continue;
            if (!gBoard[i][j].isShown) {
                revealCell(i, j)
            }
            if (gBoard[i][j].minesAroundCount === 0 && !gBoard[i][j].isMine && !gBoard[i][j].isVisited) {
                console.log('i', i, 'j', j)
                revealNeighbors(i, j, board)
            }

        }
    }
}

function revealCell(i, j) {
    var currTD = document.querySelector(`.cell-${i}-${j}`)
    gBoard[i][j].isShown = true
    gGame.shownCount++
    currTD.classList.remove('cell')
    currTD.style.color = 'red'
    if (currTD.classList.contains('cell')) {
        gGame.shownCount++
    }
}



function timer() {
    //sec
    var elSec = document.querySelector('.sec')
    var currSec = elSec.innerText
    currSec++
    elSec.innerText = currSec
    //min
    var elMin = document.querySelector('.min')
    var currMin = elMin.innerText
    if (currSec > 60) {
        currMin++
        elMin.innerText = currMin
        //need to reset the sec
        currSec = 0
        elSec.innerText = currSec
    }

}


function renderLife() {
    var str = ''
    for (var i = 0; i < gGame.life; i++) {
        str += '💙'
    }
    return str
}





// function hideNeighbors(cellI, cellJ, board) {
//     for (var i = cellI - 1; i <= cellI + 1; i++) {
//         if (i < 0 || i >= board.length) continue;
//         for (var j = cellJ - 1; j <= cellJ + 1; j++) {
//             if (j < 0 || j >= board[i].length) continue;
//             if (i === cellI && j === cellJ) continue;
//             if (!gBoard[i][j].isShown) {
//                 revealCell(i, j)

//             }
//         }
//     }

//     function hideCell(i, j) {
//         var currTD = document.querySelector(`.cell-${i}-${j}`)
//         gBoard[i][j].isShown = false
//         gGame.shownCount--
//         currTD.classList.add('cell')
//         currTD.style.color = 'transparent'
//         if (currTD.classList.contains('cell')) {
//             gGame.shownCount--
//         }
//     }