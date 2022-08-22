const computerChoiceDisplay = document.getElementById('computer-choice');
const playerChoiceDisplay = document.getElementById('player-choice');
const resultDisplay = document.getElementById('result');
const resultBox = document.querySelector('.display-result')
const possibleChoices = document.querySelectorAll('.choice-buttons');
const playerBox = document.querySelector('.player');
const computerBox = document.querySelector('.computer');
const startButton = document.getElementById('start');
const playerPicture = document.querySelector('.player-picture')
const computerPicture = document.querySelector('.computer-picture')
let playerChoice;
let computerChoice;
let result;
let playerWins = false;
let gameTied = false;

function clearImages() {
    playerPicture.classList.remove(
        'rock-picture-winner',
        'rock-picture-loser',
        'paper-picture-winner-left',
        'paper-picture-winner-right',
        'paper-picture-loser',
        'scissors-picture-winner-left',
        'scissors-picture-winner-right',
        'scissors-picture-loser-left',
        'scissors-picture-loser-right'
    )
    computerPicture.classList.remove(
        'rock-picture-winner',
        'rock-picture-loser',
        'paper-picture-winner-left',
        'paper-picture-winner-right',
        'paper-picture-loser',
        'scissors-picture-winner-left',
        'scissors-picture-winner-right',
        'scissors-picture-loser-left',
        'scissors-picture-loser-right'
    )

}

//player selects choice
possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
    playerChoice = e.target.id
    playerChoiceDisplay.innerHTML = playerChoice   
    computerChoiceDisplay.innerHTML = '???'
    startButton.removeAttribute('disabled')
    resultDisplay.innerHTML = ""
    playerBox.classList.remove('winner')
    computerBox.classList.remove('winner')
    resultBox.classList.remove('winner-result-box')
    resultBox.classList.remove('loser-result-box')
    playerChoiceDisplay.classList.remove('winner')
    computerChoiceDisplay.classList.remove('loser')
    computerBox.classList.remove('loser')
    computerChoiceDisplay.classList.remove('winner')
    playerChoiceDisplay.classList.remove('loser')
    playerBox.classList.remove('loser')
    clearImages()

}))

startButton.addEventListener('click', () => {
    setTimeout(() => {generateComputerChoice();}, 3000)
    setTimeout(() => {getResult();}, 3000)
    startButton.setAttribute('disabled', true)
    resultDisplay.innerHTML = "3"
    setTimeout(() => {resultDisplay.innerHTML = "2";}, 1000)
    setTimeout(() => {resultDisplay.innerHTML = "1";}, 2000)

})

function generateComputerChoice() {
    const randomNumber = Math.floor(Math.random() * 3) + 1 // or possibleChoices.length
    
    if (randomNumber === 1) {
        computerChoice = 'rock'
    }
    if (randomNumber === 2) {
        computerChoice = 'scissors'
    }
    if (randomNumber === 3) {
        computerChoice = 'paper'
    }
    computerChoiceDisplay.innerHTML = computerChoice
}

function winnerColor() {
    if (gameTied === false) {
        if (playerWins === true) {
            playerBox.classList.add('winner')
            resultBox.classList.add('winner-result-box')
            playerChoiceDisplay.classList.add('winner')
            computerChoiceDisplay.classList.add('loser')
            computerBox.classList.add('loser')
                if (playerChoice === 'rock') {
                    playerPicture.classList.add('rock-picture-winner')
                    computerPicture.classList.add('scissors-picture-loser-right')
                } else if (playerChoice === 'paper') {
                    playerPicture.classList.add('paper-picture-winner-left')
                    computerPicture.classList.add('rock-picture-loser')
                } else if (playerChoice === 'scissors') {
                    playerPicture.classList.add('scissors-picture-winner-left')
                    computerPicture.classList.add('paper-picture-loser')
                }

        } else {
            computerBox.classList.add('winner')
            resultBox.classList.add('loser-result-box')
            computerChoiceDisplay.classList.add('winner')
            playerChoiceDisplay.classList.add('loser')
            playerBox.classList.add('loser')
            if (playerChoice === 'rock') {
                playerPicture.classList.add('rock-picture-loser')
                computerPicture.classList.add('paper-picture-winner-right')
            } else if (playerChoice === 'paper') {
                playerPicture.classList.add('paper-picture-loser')
                computerPicture.classList.add('scissors-picture-winner')
            } else if (playerChoice === 'scissors') {
                playerPicture.classList.add('scissors-picture-loser-left')
                computerPicture.classList.add('rock-picture-winner-right')
            }

        }    
    } else {
        playerBox.classList.add('loser')
        computerBox.classList.add('loser')
        computerChoiceDisplay.classList.add('loser')
        playerChoiceDisplay.classList.add('loser')
        resultBox.classList.add('loser-result-box')
        if (playerChoice === 'rock') {
            playerPicture.classList.add('rock-picture-loser')
            computerPicture.classList.add('rock-picture-loser')
        } else if (playerChoice === 'paper') {
            playerPicture.classList.add('paper-picture-loser')
            computerPicture.classList.add('paper-picture-loser')
        } else if (playerChoice === 'scissors') {
            playerPicture.classList.add('scissors-picture-loser-left')
            computerPicture.classList.add('scissors-picture-loser-right')
        }
    }
    
}


function getResult () {
    if (computerChoice === playerChoice) {
        result = "Draw!"
        gameTied = true
        playerWins = false
    }
    if (computerChoice === 'rock' && playerChoice === 'paper') {
        result = 'You Win!'
        gameTied = false
        playerWins = true
    }
    if (computerChoice === 'rock' && playerChoice === 'scissors') {
        result = 'Computer Wins'
        gameTied = false
        playerWins = false
    }
    if (computerChoice === 'paper' && playerChoice === 'rock') {
        result = 'Computer Wins'
        gameTied = false
        playerWins = false
    }
    if (computerChoice === 'paper' && playerChoice === 'scissors') {
        result = 'You Win!'
        gameTied = false
        playerWins = true
    }
    if (computerChoice === 'scissors' && playerChoice === 'rock') {
        result = 'You Win!'
        gameTied = false
        playerWins = true
    }
    if (computerChoice === 'scissors' && playerChoice === 'paper') {
        result = 'Computer Wins'
        gameTied = false
        playerWins = false
    }
    resultDisplay.innerHTML = result
    winnerColor()
}