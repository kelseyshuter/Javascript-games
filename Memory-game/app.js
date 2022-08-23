const cardArray = [
    {
        name: 'fries',
        img: 'images/fries.png',        
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png',        
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png',        
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png',        
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png',        
    },
    {
        name: 'pizza',
        img: 'images/pizza.png',        
    },
    {
        name: 'fries',
        img: 'images/fries.png',        
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png',        
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png',        
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png',        
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png',        
    },
    {
        name: 'pizza',
        img: 'images/pizza.png',        
    }
]

cardArray.sort(() => 0.5 - Math.random()) 

const gridDisplay = document.querySelector('#grid')
const attemptDisplay = document.querySelector('#attempt')
const resultDisplay = document.querySelector('#result')
const messageBox = document.querySelector('.message-box')
const restartButton = document.getElementById('restart-button')
let cardsChosen = []
let cardsChosenIds = []
let cardsWon = []
let attempt = 0



function createBoard () {
    for (let i =0; i < cardArray.length; i++) {              
        const card = document.createElement('img') 
        card.setAttribute('src', 'images/blank.png')
        card.setAttribute('data-id', i)
        card.setAttribute('class', 'card')
        card.addEventListener('click', flipCard)
        gridDisplay.appendChild(card)
    }
}
createBoard()

function restartGame() {
    cardsChosen = []
    cardsChosenIds = []
    cardsWon = []
    attempt = 0
    attemptDisplay.innerHTML = attempt
    resultDisplay.textContent = cardsWon.length
    restartButton.textContent = 'RESTART'
    messageBox.innerHTML = 'Find the matching pairs!'
    for (let i = 0; i < cardArray.length; i++) {
        let element = document.querySelector("[data-id='" + i + "']")
        gridDisplay.removeChild(element)        
    }
    cardArray.sort(() => 0.5 - Math.random()) 
    createBoard()
}

restartButton.addEventListener('click', restartGame)

function checkMatch() {
    const cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenIds[0]
    const optionTwoId = cardsChosenIds[1]
    attempt += 1
    attemptDisplay.innerHTML = attempt

    if (optionOneId === optionTwoId) {
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
        messageBox.innerHTML = 'You clicked the same card!'
    } else if (cardsChosen[0] === cardsChosen[1]) {
        messageBox.innerHTML = 'You found a match!'
        cards[optionOneId].setAttribute('src', 'images/white.png')
        cards[optionTwoId].setAttribute('src', 'images/white.png')
        cards[optionOneId].setAttribute('class', 'move-back')
        cards[optionTwoId].setAttribute('class', 'move-back')
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].removeEventListener('click', flipCard)
        cardsWon.push(cardsChosen)
    } else {
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
        messageBox.innerHTML = 'Try Again!'
    }
    resultDisplay.textContent = cardsWon.length
    cardsChosen = []
    cardsChosenIds = []

    if (cardsWon.length === cardArray.length/2) {
        messageBox.textContent = 'Congratulations! You found them all'
        restartButton.textContent = 'PLAY AGAIN'
    }

}

function flipCard() {
    const cardId = this.getAttribute('data-id')
    cardArray[cardId]
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenIds.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length === 2) {
        setTimeout(checkMatch, 500)
    }
}





