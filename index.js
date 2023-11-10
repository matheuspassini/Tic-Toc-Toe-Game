// 0 1 2
// 3 4 5
// 6 7 8

// Select button 'Start' and board regions
const btn = document.getElementById('start')
const boardRegions = document.querySelectorAll('#gameBoard span')

// Declare variables for the round, board state and if the game is over or not
let turnPlayer = ''
let board = ['', '', '', '', '', '', '', '', '']
let gameOver = ''

// Start the game
const startGame = () => {
    turnPlayer = 'player1'
    document.querySelector('h2').innerHTML = 'Round: <span id="turnPlayer"></span>'
    updateTitle()

    boardRegions.forEach(function (element) {
        element.classList.remove('win')
        element.innerText = ''
        element.classList.add('cursor-pointer')
        element.addEventListener('click', inputPlayers)
    })
}

// Update the title for each player movement, as the round
const updateTitle = () => {
    const playerNameElement = document.getElementById(turnPlayer)
    console.log(playerNameElement)
    if (playerNameElement) {
        document.getElementById('turnPlayer').innerText = playerNameElement.value
    }
}

// Disable a board region already clicked and its event
const disableRegion = (element) => {
    element.classList.remove('cursor-pointer')
    element.removeEventListener('click', inputPlayers)
}

// Define the logic of a tic toc toe game, according to columns, diagonals and rows
const checkWinner = (symbol) => {
    let winRegions = []

    if (board[0] === symbol && board[4] === symbol && board[8] === symbol) {
        winRegions.push(0,4,8)
    }
    if (board[2] === symbol && board[4] === symbol && board[6] === symbol) {
        winRegions.push(2,4,6)
    }
    if (board[0] === symbol && board[1] === symbol && board[2] === symbol) {
       winRegions.push(0,1,2)
    }
     if (board[3] === symbol && board[4] === symbol && board[5] === symbol) {
       winRegions.push(3,4,5)
     }
     if (board[6] === symbol && board[7] === symbol && board[8] === symbol) {
       winRegions.push(6,7,8)
     }
     if (board[0] === symbol && board[3] === symbol && board[6] === symbol) {
        winRegions.push(0,3,6)
     }
     if (board[1] === symbol && board[4] === symbol && board[7] === symbol) {
        winRegions.push(1,4,7)
     }
     if (board[2] === symbol && board[5] === symbol && board[8] === symbol) {
        winRegions.push(2,5,8)
     }

     return winRegions
}

// Paint the board for each region that the player won
const paintBoard = (regions) => {
    regions.forEach((region) => {
        document.querySelector(`[data-region="${region}"]`).classList.add('win')
    })
    const playerName = document.getElementById(turnPlayer).value
    document.querySelector('h2').innerHTML = playerName + ' won!'
}

// Receive the players movements unless its not gameover
const inputPlayers = (ev) => {
    if (gameOver) {
        return
    }

    const region = ev.currentTarget.dataset.region

    if (turnPlayer === 'player1') {
        ev.currentTarget.style.color = 'black'
        ev.currentTarget.innerHTML = 'X'
        board[region] = 'X'
    } else {
        ev.currentTarget.style.color = 'black'
        ev.currentTarget.innerHTML = 'O'
        board[region] = 'O'
    }

    console.clear()
    disableRegion(ev.currentTarget)

    const winRegions = checkWinner(board[region])

    console.log(winRegions)

    if (winRegions.length > 0) {
        paintBoard(winRegions)
        gameOver = true
    } else if (board.includes('')) {
        turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1'
        updateTitle()
    } else {
        document.querySelector('h2').innerHTML = 'Tie'
    }
}

// Define the event for the button 'Start'
btn.addEventListener('click', startGame)
