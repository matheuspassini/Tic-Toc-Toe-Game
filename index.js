// 0 1 2
// 3 4 5
// 6 7 8

const btn = document.getElementById('start')
const boardRegions = document.querySelectorAll('#gameBoard span')


let turnPlayer = ''
let board = ['', '', '', '', '', '', '', '', '']


const updateTitle = () => {
    const playerNameElement = document.getElementById('turnPlayer')
    console.log(playerNameElement)
    document.getElementById('turnPlayer').innerText = playerNameElement.value
}

const disableRegion = (element) => {
    element.classList.remove('cursor-pointer')
    element.removeEventListener('click', inputPlayers)
}


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

const paintBoard = (regions) => {
    regions.forEach((region) => {
        document.querySelector(`[data-region="${region}"]`).classList.add('win')
    })
    // const playerNameElement = document.getElementById('turnPlayer')
    // console.log(playerNameElement) // Verifique se o elemento está sendo encontrado corretamente
    const playerName = document.getElementById('turnPlayer').innerText
    document.querySelector('h2').innerHTML = playerName + ' won!'
}

const inputPlayers = (ev) => {
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

    turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1'

    const winRegions = checkWinner(board[region])

    console.log(winRegions)

    if (winRegions.length > 0) {
        paintBoard(winRegions)
    } else if (board.every((value) => value === '')) {
        // turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1'
        updateTitle()
    } else {
        document.querySelector('h2').innerHTML = 'Tie'
    }

}


const startGame = () => {
    const player1Name = document.getElementById('player1Name').value

    if (turnPlayer === 'player2') {
        document.getElementById('turnPlayer').innerText = player1Name
    }

    document.querySelector('h2').innerHTML = 'Round: <span id="turnPlayer">Player 1</span>'

    document.getElementById('turnPlayer').innerText = player1Name

    updateTitle()

    boardRegions.forEach(function (element) {
        element.classList.remove('win')
        element.innerText = ''
        element.classList.add('cursor-pointer')
        element.addEventListener('click', inputPlayers)
    })
}

btn.addEventListener('click', startGame)
