// 0 1 2
// 3 4 5
// 6 7 8

const btn = document.getElementById('start')
const h2 = document.querySelector('h2')
const inputPlayer1 = document.getElementById('player1')
const inputPlayer2 = document.getElementById('player2')
const boardRegions = document.querySelectorAll('#gameBoard span')

let turnPlayer = ''

let board = ['', '', '', '', '', '', '', '', '']

const updateTitle = () => {
    const playerInput = document.getElementById(turnPlayer)
    if (playerInput) {
        document.getElementById('turnPlayer').innerText = playerInput.value
    }
}

const disableRegion = (element) => {
    element.style.cursor = 'default'
    element.removeEventListener('click', inputPlayers)
}


const checkWinner = (player) => {
    let winRegions = []

    if (board[0] === player && board[4] === player && board[8] === player) {
        winRegions.push('0','4','8')
    }
    if (board[2] === player && board[4] === player && board[6] === player) {
        winRegions.push('2','4','6')
    }
    if (board[0] === player && board[1] === player && board[2] === player) {
       winRegions.push('0','1','2')
    }
     if (board[3] === player && board[4] === player && board[5] === player) {
       winRegions.push('3','4','5')
     }
     if (board[6] === player && board[7] === player && board[8] === player) {
       winRegions.push('6','7','8')
     }
     if (board[0] === player && board[3] === player && board[6] === player) {
        winRegions.push('0','3','6')
     }
     if (board[1] === player && board[4] === player && board[7] === player) {
        winRegions.push('1','4','7')
     }
     if (board[2] === player && board[5] === player && board[8] === player) {
        winRegions.push('2','5','8')
     }

     return winRegions
}

const inputPlayers = (ev) => {
    const region = ev.currentTarget.dataset.region
    if (turnPlayer === 'player1') {
        ev.currentTarget.style.color = 'black'
        ev.currentTarget.innerHTML = 'X'
        board[region] = 'X'
        turnPlayer = inputPlayer2.value
    } else {
        ev.currentTarget.style.color = 'black'
        ev.currentTarget.innerHTML = 'O'
        board[region] = 'O'
        turnPlayer = inputPlayer1.value
    }

    console.clear()
    disableRegion(ev.currentTarget)

    const winRegions = checkWinner(turnPlayer)
    console.log(winRegions)

    if (winRegions.length > 0) {
        alert('You won!')
    } else if (board.includes('')) {
        turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1'
        updateTitle()
    } else {
        h2.innerHTML = 'Tie'
    }
}


const startGame = () => {
    turnPlayer = inputPlayer1.value
    document.querySelector('h2').innerHTML = 'Round: <span id="turnPlayer"></span>'
    updateTitle()

    boardRegions.forEach(function (element) {
        element.classList.remove('win')
        element.innerText = ''
        element.addEventListener('click', inputPlayers)
    })


}


btn.addEventListener('click', startGame)