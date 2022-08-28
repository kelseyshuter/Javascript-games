const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score-display')
const startButton = document.querySelector('#start-button')
const leftButton = document.querySelector('#left-arrow')
const rightButton = document.querySelector('#right-arrow')

let pageWidth = window.innerWidth
let pageHeight = window.innerHeight
let timerId
let xDirection = -2
let yDirection = 2
let score = 0
let pause = true
let mobile = false
let gameOver = false

let blockWidth = 100
let blockHeight = 20
let boardWidth = 560
let boardHeight = 300
let ballDiameter = 20

const userStart = [230, 10]
let currentPosition = userStart
const ballStart = [270, 40]
let ballCurrentPosition = ballStart

const userStartMobile = [115, 5]
const ballStartMobile = [135, 20]

function checkMobile() {
    console.log('mobile checked')
   if (pageWidth < 600 || pageHeight < 700) {
        mobile = true
        currentPosition[0] = 115
        ballCurrentPosition[0] = 135
        ballCurrentPosition[1] = 20
        blockWidth = 50
        blockHeight = 10
        boardWidth = 280
        boardHeight = 150
        ballDiameter = 10
        xDirection = -2
        yDirection = 2
    } else {
        ballCurrentPosition = ballStart
        currentPosition[0] = 230
        ballCurrentPosition[0] = 270
        ballCurrentPosition[1] = 40
    }
}

checkMobile()


//create block
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

//all my blocks
const blocks = [
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210)
]

//smaller blocks
const blocksMobile = [
    new Block(5,135),
    new Block(60,135),
    new Block(115,135),
    new Block(170,135),
    new Block(225,135),
    new Block(5,120),
    new Block(60,120),
    new Block(115,120),
    new Block(170,120),
    new Block(225,120),
    new Block(5,105),
    new Block(60,105),
    new Block(115,105),
    new Block(170,105),
    new Block(225,105)
]



//draw all my blocks
function addBlocks() { 
    if (pageWidth > 600 && pageHeight > 700) {
        for (let i = 0; i < blocks.length; i++) {
            const block = document.createElement('div')
            block.classList.add('block','grid-div')
            block.style.left = blocks[i].bottomLeft[0] + 'px'
            block.style.bottom = blocks[i].bottomLeft[1] + 'px'
            grid.appendChild(block)
        }
    } else {
        for (let i = 0; i < blocksMobile.length; i++) {
            const blockM = document.createElement('div')
            blockM.classList.add('block','grid-div')
            blockM.style.left = blocksMobile[i].bottomLeft[0] + 'px'
            blockM.style.bottom = blocksMobile[i].bottomLeft[1] + 'px'
            grid.appendChild(blockM)
        }
    }
    
}
addBlocks()

//add user
const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

//draw user
function drawUser() {
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}

//draw ball
function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}

//move user
function moveUser(e) {
    switch(e.key) {
        case 'ArrowLeft':
        case 'a':
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 10
                drawUser()                
            }
                break;
        case 'ArrowRight':
        case 'd':
            if (currentPosition[0] < boardWidth - blockWidth) {
                currentPosition[0] += 10
                drawUser()                
            }
                break;
    }
}

function moveUserLeftButton() {
    if (currentPosition[0] > 0) {
        currentPosition[0] -= 10
        drawUser()                
    }
}
function moveUserRightButton() {
    if (currentPosition[0] < boardWidth - blockWidth) {
        currentPosition[0] += 10
        drawUser()                
    }
}


// add ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

//move ball
function moveBall() {
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkForCollisions()
}

//clear blocks
function clearBlocks() {
    const allBlocks = Array.from(document.querySelectorAll('.grid-div'))
    for (let i = 0; i < 15; i++) {        
        allBlocks[i].classList.remove('block')
        allBlocks[i].classList.add('block')        
    }
    console.log('x', currentPosition[0])      
    console.log('y', currentPosition[1])
         
    checkMobile()
    drawBall()
    drawUser()
    console.log('user start',userStart)          
    }
    

//start button
function startGame() {
    if (gameOver === false && pause === true) {
        document.addEventListener('keydown', moveUser)
        leftButton.addEventListener('mousedown', moveUserLeftButton)
        rightButton.addEventListener('mousedown', moveUserRightButton)
        timerId = setInterval(moveBall, 30)
        pause = false
        startButton.textContent = 'Pause'
    } else if (gameOver === false && pause === false) {
        document.removeEventListener('keydown', moveUser)
        leftButton.removeEventListener('mousedown', moveUserLeftButton)
        rightButton.removeEventListener('mousedown', moveUserRightButton)
        clearInterval(timerId)
        pause = true
        startButton.textContent = 'Continue'
    } else if (gameOver === true) {
        gameOver = false
        score = 0
        scoreDisplay.innerHTML = score
        pause = true
        clearBlocks()
    }   
}
startButton.addEventListener('click', startGame)


// check for collisions
function checkForCollisions() {
    //check for  blocks
    for (let i = 0; i < blocks.length; i++) {
        if (
            mobile === false &&
            ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
            ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
            ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] &&
            ballCurrentPosition[1] < blocks[i].topLeft[1])
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            changeDirection()
            score++
            scoreDisplay.innerHTML = score
        } else if (
            mobile === true &&
            ballCurrentPosition[0] > blocksMobile[i].bottomLeft[0] &&
            ballCurrentPosition[0] < blocksMobile[i].bottomRight[0] &&
            ((ballCurrentPosition[1] + ballDiameter) > blocksMobile[i].bottomLeft[1] &&
            ballCurrentPosition[1] < blocksMobile[i].topLeft[1])
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocksMobile.splice(i, 1)
            changeDirection()
            score++
            scoreDisplay.innerHTML = score
        }
    }

    //check for win
    if (blocks.length === 0 || blocksMobile.length === 0) {
        scoreDisplay.innerHTML = 'YOU WIN!'
        clearInterval(timerId)
        document.removeEventListener('keydown', moveUser)
        document.removeEventListener('mousedown', moveUserLeftButton)
        document.removeEventListener('mousedown', moveUserRightButton)
        pause = true
        startButton.textContent = 'Insert Coin'
    }      
    
    //check for walls
    if (
        ballCurrentPosition[0] >= (boardWidth - ballDiameter) || 
        ballCurrentPosition[1] >= (boardHeight - ballDiameter) ||
        ballCurrentPosition[0] <= 0
        ) {
            changeDirection()
    }

    //check for user hit
    if (
        (ballCurrentPosition[0] > currentPosition[0] &&
        ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
        (ballCurrentPosition[1] > currentPosition[1] &&
        ballCurrentPosition [1] < currentPosition[1] + blockHeight)
        )
        {
            changeDirection()
        }

    //check for game over
    if (ballCurrentPosition[1] <= 0 ) {
        clearInterval(timerId)
        scoreDisplay.innerHTML = 'You lose'
        document.removeEventListener('keydown', moveUser)
        document.removeEventListener('mousedown', moveUserLeftButton)
        document.removeEventListener('mousedown', moveUserRightButton)
        pause = true
        startButton.textContent = 'Insert Coin'
        gameOver = true
    }
}


function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2
        return
    }
    if (xDirection == 2 && yDirection == -2) {
        xDirection = -2
        return
    }
    if (xDirection == -2 && yDirection == -2) {
        yDirection = 2
        return
    }
    if (xDirection == -2 && yDirection == 2) {
        xDirection = 2
        return
    }

}