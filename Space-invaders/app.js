const grid = document.querySelector('.grid')
const resultsDisplay = document.querySelector('.results')
const gameOverDisplay = document.querySelector('.game-over')
let currentShooterIndex = 202
let width = 15
let direction = 1
let invadersId
let goingRight = true
let aliensRemoved = []
let results = 0
let pause = true
let alienInvaders = []
let currentLaserIndex = currentShooterIndex

//build grid
for (i = 0; i< 225; i++) {
    const square = document.createElement('div')
    grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))

const alienInvadersInit = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]

for (let i = 0; i < alienInvadersInit.length; i++) {
    alienInvaders[i] = alienInvadersInit[i]
}


//draw invaders
function draw() {
    for (let i = 0; i < alienInvadersInit.length; i++) {
        if (!aliensRemoved.includes(i)) {
            squares[alienInvaders[i]].classList.add('invader')
        }
        
    }
}

draw()

//remove invaders when defeated
function remove() {
    for (let i = 0; i < alienInvadersInit.length; i++) {
        squares[alienInvaders[i]].classList.remove('invader')
    }
}


//add and move player
squares[currentShooterIndex].classList.add('shooter')

function moveShooter(e) {
    squares[currentShooterIndex].classList.remove('shooter')
    switch(e.key) {
        case 'ArrowLeft' :
            if (currentShooterIndex % width !== 0) currentShooterIndex -=1
            break;
        case 'ArrowRight' :
            if (currentShooterIndex % width < width -1) currentShooterIndex +=1
            break;
    }
    squares[currentShooterIndex].classList.add('shooter')
}

//move invaders
function moveInvaders() {
    if (pause === false) {
        const leftEdge = alienInvaders[0] % width === 0
        const rightEdge = alienInvaders[alienInvadersInit.length - 1] % width === width - 1
        remove()

        if (rightEdge && goingRight) {
            for (let i = 0; i < alienInvadersInit.length; i++) {
                alienInvaders[i] += width + 1
                direction = -1
                goingRight = false
            }
        }

        if (leftEdge &&! goingRight) {
            for (let i = 0; i < alienInvadersInit.length; i++) {
                alienInvaders[i] += width - 1
                direction = 1
                goingRight = true
            }
        }

        for (let i = 0; i < alienInvadersInit.length; i++) {
            alienInvaders[i] += direction
        }
        draw()
    }
}
    

//player shoot and move laser
function shoot(e) {
    let laserId
    currentLaserIndex = currentShooterIndex     
    function moveLaser() {
        if (pause === false) {
            squares[currentLaserIndex].classList.remove('laser')
            currentLaserIndex -= width
            squares[currentLaserIndex].classList.add('laser')
        }
                
        if (squares[currentLaserIndex].classList.contains('invader')) {
            squares[currentLaserIndex].classList.remove('laser')
            squares[currentLaserIndex].classList.remove('invader')
            squares[currentLaserIndex].classList.add('boom')
            setTimeout(() => squares[currentLaserIndex].classList.remove('boom', 100))            
            clearInterval(laserId)
            const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
            aliensRemoved.push(alienRemoved)
            results++
        }        
        resultsDisplay.innerHTML = results
    }
    switch(e.key) {
        case 'ArrowUp':
            laserId = setInterval(moveLaser, 100)
        }
}

function stopListening() {
    clearInterval(invadersId)
    document.removeEventListener('keydown', moveShooter)
    document.removeEventListener('keydown', shoot)
    pause = true        
}

//start-pause button
function start() {
    if (pause === true) {
        invadersId = setInterval(moveInvaders, 200)
        document.addEventListener('keydown', moveShooter)
        document.addEventListener('keydown', shoot)
        pause = false
    } else {
        stopListening()        
    }   
}

function checkOutcome() {
    if (pause === false) {
    //check for lose
        if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
            gameOverDisplay.innerHTML = 'GAME OVER'            
            stopListening()
        }
        for (let i = 0; i < alienInvadersInit.length; i++) {
            if (alienInvaders[i] > (squares.length)) {
                gameOverDisplay.innerHTML = 'GAME OVER'                 
                stopListening()
            }
        }
    //check for win
        if (aliensRemoved.length === alienInvadersInit.length) {
            gameOverDisplay.innerHTML = 'YOU WIN!'          
            stopListening()
        }
    }
    
}
setInterval(checkOutcome, 100) 

function resetGrid() {
    //alert('are you sure?')
    stopListening()
    for (let i = 0; i < 225; i++) {
        squares[i].classList.remove('invader')
        squares[i].classList.remove('laser') 
        squares[i].classList.remove('boom')      

    }
    for (let i = 0; i < alienInvadersInit.length; i++) {
        alienInvaders[i] = alienInvadersInit[i]        
    }
    for (let i = 0; i < aliensRemoved.length; i++) {
        aliensRemoved[i] = null
    }
    draw()
    results = 0
    resultsDisplay.innerHTML = results
    gameOverDisplay.innerHTML = 'Restarted' 
    currentLaserIndex = currentShooterIndex      
}









