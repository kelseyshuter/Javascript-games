const computerChoiceDisplay = document.getElementById('computer-choice');
const playerChoiceDisplay = document.getElementById('player-choice');
const resultDisplay = document.getElementById('result');
const possibleChoices = document.querySelectorAll('button');
const playerBox = document.querySelector('.player');
const computerBox = document.querySelector('.computer')
let playerChoice 
let computerChoice
let result
let playerWins = false
let gameTied = false

possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
    playerChoice = e.target.id
    playerChoiceDisplay.innerHTML = playerChoice
    generateComputerChoice()
    getResult()
}))

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
        } else {
            computerBox.classList.add('winner')
        }    
    } else {
        playerBox.classList.add('winner')
        computerBox.classList.add('winner')
    }
    setTimeout(() => {playerBox.classList.remove('winner');}, 1000)
    setTimeout(() => {computerBox.classList.remove('winner');}, 1000)
}


function getResult () {
    if (computerChoice === playerChoice) {
        result = 'its a draw!'
        gameTied = true
        playerWins = false
    }
    if (computerChoice === 'rock' && playerChoice === 'paper') {
        result = 'you won!'
        gameTied = false
        playerWins = true
    }
    if (computerChoice === 'rock' && playerChoice === 'scissors') {
        result = 'you lost!'
        gameTied = false
        playerWins = false
    }
    if (computerChoice === 'paper' && playerChoice === 'rock') {
        result = 'you lost!'
        gameTied = false
        playerWins = false
    }
    if (computerChoice === 'paper' && playerChoice === 'scissors') {
        result = 'you won!'
        gameTied = false
        playerWins = true
    }
    if (computerChoice === 'scissors' && playerChoice === 'rock') {
        result = 'you won!'
        gameTied = false
        playerWins = true
    }
    if (computerChoice === 'scissors' && playerChoice === 'paper') {
        result = 'you lost!'
        gameTied = false
        playerWins = false
    }
    resultDisplay.innerHTML = result
    winnerColor()
}