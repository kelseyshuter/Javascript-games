const selectLevelDisplay = document.getElementById('select-level-display');
const leftArrowButton = document.getElementById('left-button');
const rightArrowButton = document.getElementById('right-button');
const greenStartButton = document.getElementById('green-select-button');
const redRestartButton = document.getElementById('red-restart-button');
const messageDiv = document.querySelector('.message-div');
const messageBox = document.getElementById('message-box');
const instructionsBox = document.getElementById('instructions-box');
const levelSelectBox = document.querySelector('.level-select-box');
const levelDisplay = document.querySelector('.level-display');
const grid = document.querySelector('.grid');
const scoreValue = document.querySelector('.score-value');
const user = document.createElement('div');
const ball = document.createElement('div');
const obstacle1 = document.createElement('div');
const obstacle2 = document.createElement('div');
const heartLeft = document.querySelector('.health-value-1');
const heartRight = document.querySelector('.health-value-2');


let gameStart = false; //pause = true
let gameOver = false;
let userSelectedLevel = false;
let pageWidth = window.innerWidth;
let pageHeight = window.innerHeight;

let timerId;
let xDirection = -2;
let yDirection = -2;
let ballDiameter = 15;
let boardHeight = 180;
let boardWidth = 270;
let obstacleHeight = 10;
let obstacleWidth = 40;
let blockHeight = 10;
let blockWidth = 48;

let health = 2;
let score = 0;

let pageSizeSmall = true;

let obstacle1Position = [35, 95];
let obstacle2Position = [200, 95];

const ballStart = [125, 120];
const ballStartLargeView = [235, 250];
let ballCurrentPosition = ballStart;

const userStart = [115, 155];
const userStartLargeView = [210, 300];
let currentPosition = userStart;

// adjust grid size based on page size, mobile is default
function checkPageSize() {
    if (pageWidth > 750 && pageHeight > 600) {
        pageSizeSmall = false;
        boardHeight = 340;
        boardWidth = 500;
        ballDiameter = 25;
        obstacleHeight = 15;
        obstacleWidth = 70;
        ballCurrentPosition = ballStartLargeView;
        obstacle1Position = [70, 180];
        obstacle2Position = [350, 180];
        currentPosition = userStartLargeView;
        blockHeight = 10;
        blockWidth = 88;
    }
}
// check on page load
checkPageSize();

//create blocks
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis + blockHeight];
        this.bottomRight = [xAxis + blockWidth, yAxis + blockHeight];
        this.topLeft = [xAxis, yAxis];
        this.topRight = [xAxis + blockWidth, yAxis];
    }
}

//all my blocks
const blocks = [
    new Block(5,5),
    new Block(58,5),
    new Block(111,5),
    new Block(164,5),
    new Block(217,5),
    new Block(5,20),
    new Block(58,20),
    new Block(111,20),
    new Block(164,20),
    new Block(217,20),
    new Block(5,35),
    new Block(58,35),
    new Block(111,35),
    new Block(164,35),
    new Block(217,35)
]

//larger page view blocks
const blocksLarge = [
    new Block(10,10),
    new Block(108,10),
    new Block(206,10),
    new Block(304,10),
    new Block(402,10),
    new Block(10,35),
    new Block(108,35),
    new Block(206,35),
    new Block(304,35),
    new Block(402,35),
    new Block(10,60),
    new Block(108,60),
    new Block(206,60),
    new Block(304,60),
    new Block(402,60)
]


// allows user to select a level at page load, 
// called by buttons if user has not selected a level yet
function selectLevelRight() {
    const level = selectLevelDisplay.textContent;
    if (level === 'Lvl.1') {
        selectLevelDisplay.textContent = 'Lvl.2';
    } else if (level === 'Lvl.2') {
        selectLevelDisplay.textContent = 'Lvl.3';
    } else if (level === 'Lvl.3') {
        selectLevelDisplay.textContent = 'Lvl.1';
    }
}
function selectLevelLeft() {
    const level = selectLevelDisplay.textContent;
    if (level === 'Lvl.1') {
        selectLevelDisplay.textContent = 'Lvl.3';
    } else if (level === 'Lvl.2') {
        selectLevelDisplay.textContent = 'Lvl.1';
    } else if (level === 'Lvl.3') {
        selectLevelDisplay.textContent = 'Lvl.2';
    }
}

// send message div pieces to back, do not send entire div back
function sendBack() {
    levelSelectBox.classList.add('send-back');
    instructionsBox.classList.add('send-back');
    messageBox.classList.add('send-back');
}

// do this when user choses a level, actived by green button
function levelChosen() {
    const level = selectLevelDisplay.textContent;
    userSelectedLevel = true;
    gameStart = true;
    sendBack();    
    setTimeout(() => {toggleStartPauseListeners();},3000);
    toggleSelectLevelListeners();
    addBlocks();    
    addBall();
    countDown();
    setTimeout(moveBallTimer,3000);
    addUser();
    checkPageSize();    
    if (level === 'Lvl.1') {
        levelDisplay.innerHTML = 'Lvl.1';
    } else if (level === 'Lvl.2') {
        levelDisplay.innerHTML = 'Lvl.2';
        addObstacles();       
    } else if (level === 'Lvl.3') {
        levelDisplay.innerHTML = 'Lvl.3';
        addObstacles();       
    }
}

// use arrow buttons to select level, toggle button for other uses
function toggleSelectLevelListeners() {
    if (userSelectedLevel === false) {
        rightArrowButton.addEventListener('click', selectLevelRight);
        leftArrowButton.addEventListener('click', selectLevelLeft);
        greenStartButton.addEventListener('click', levelChosen);
    }

    if (userSelectedLevel === true) {
        rightArrowButton.removeEventListener('click', selectLevelRight);
        leftArrowButton.removeEventListener('click', selectLevelLeft);
        greenStartButton.removeEventListener('click', levelChosen);
    }
}
// should be shown when user loads page
toggleSelectLevelListeners();

// use green button to start and pause game 
// if user has selected a level and game is not over
function toggleStartPauseListeners() {
    if (
        userSelectedLevel === true &&
        gameOver === false
        ) { 
            greenStartButton.addEventListener('click', startPause);
        }
}

// countdown from 3 on level select
function countDown() {
    messageBox.classList.remove('send-back');
    messageBox.innerHTML = '3';
    setTimeout(() => {messageBox.innerHTML = '2';}, 1000);
    setTimeout(() => {messageBox.innerHTML = '1';}, 2000);
    setTimeout(sendBack, 3000);
}

//START-PAUSE
function startPause() {
    if (gameStart === true) {
        gameStart = false;
        clearInterval(timerId);
        messageBox.classList.remove('send-back');
        messageBox.innerHTML = 'Paused';        
    } else {
        gameStart = true;
        moveBallTimer();
        sendBack();
    }
}

// draw blocks
function addBlocks() {
    if (pageSizeSmall === true) {
        for (let i = 0; i < blocks.length; i++) {
            const block = document.createElement('div');
            block.classList.add('block')
            block.style.left = blocks[i].topLeft[0] + 'px'
            block.style.top = blocks[i].topLeft[1] + 'px'
            grid.appendChild(block)
        } 
    //for larger page view       
    } else {
        for (let i = 0; i < blocks.length; i++) {
            const block = document.createElement('div');
            block.classList.add('block')
            block.style.left = blocksLarge[i].topLeft[0] + 'px'
            block.style.top = blocksLarge[i].topLeft[1] + 'px'
            grid.appendChild(block)
        }
    }       
}


// draw user
function drawUser() {
    user.style.left = currentPosition[0] + 'px';
    user.style.top = currentPosition[1] + 'px';
}
// add user
function addUser() {
    user.classList.add('user');
    drawUser();
    grid.appendChild(user);
}

// draw ball
function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px';
    ball.style.top = ballCurrentPosition[1] + 'px';
}
// add ball
function addBall() {    
    ball.classList.add('ball');
    drawBall();
    grid.appendChild(ball);
}
// move ball every 30 ms
function moveBallTimer() {
    if (pageSizeSmall === true) {
        timerId = setInterval(moveBall, 20);
    } else {
        timerId = setInterval(moveBall, 10);
    }
    
}
// move ball
function moveBall() {    
    ballCurrentPosition[0] += xDirection;
    ballCurrentPosition[1] += yDirection;
    drawBall();
    checkForCollisions();
}

// add obstacles for lvl 2 and 3
function addObstacles() {
    //lvl 2 and 3 share same first obstacle
    const level = selectLevelDisplay.textContent;
    console.log(level);
    if (level === 'Lvl.2' || level === 'Lvl.3') {
        obstacle1.classList.add('obstacle');
        drawObstacle1();
        grid.appendChild(obstacle1);
    }
    if (level === 'Lvl.3') {
        obstacle2.classList.add('obstacle');
        drawObstacle2();
        grid.appendChild(obstacle2);
    }
}

//draw obstacles
function drawObstacle1() {
    obstacle1.style.left = obstacle1Position[0] + 'px';    
    obstacle1.style.top = obstacle1Position[1] + 'px';    
}
function drawObstacle2() {
    obstacle2.style.left = obstacle2Position[0] + 'px';    
    obstacle2.style.top = obstacle2Position[1] + 'px';    
}





// ball bouces off 3 walls, *bottom wall is gameOver
function checkForWalls() {
    if (
        ballCurrentPosition[0] >= (boardWidth - ballDiameter) || 
        ballCurrentPosition[1] <= 0 ||
        ballCurrentPosition[0] <= 0 ||
        ballCurrentPosition[1] >= (boardHeight - ballDiameter)
        ) {
            changeDirection();
    }
}


// ball bounces off obstacles
// lvl 2 single obstacle, lvl 3 has two
// left, right, bottom, top
function checkForObstacles() {
    const level = selectLevelDisplay.textContent;
    if (level === 'Lvl.2' || level === 'Lvl.3') {
        if (
            (ballCurrentPosition[0] > obstacle1Position[0] - ballDiameter &&
            ballCurrentPosition[0] < obstacle1Position[0] + obstacleWidth) &&
            (ballCurrentPosition[1] < obstacle1Position[1] + obstacleHeight &&
            ballCurrentPosition[1] > obstacle1Position[1] - ballDiameter)
            )
        {
            changeDirection();
        }
    }
    if (level === 'Lvl.3') {
        //shifted one obstacle width horiz.
        if (
            (ballCurrentPosition[0] > obstacle2Position[0] - ballDiameter &&
            ballCurrentPosition[0] < obstacle2Position[0] + obstacleWidth) &&
            (ballCurrentPosition[1] < obstacle2Position[1] + obstacleHeight &&
            ballCurrentPosition[1] > obstacle2Position[1] - ballDiameter)
            )
        {
            changeDirection();
        }
    }
    
}

// checks for all possible collisions
function checkForCollisions() {
    checkForWalls();
    checkForObstacles();
    
}

// changes direction based on current direction
function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2;
        return;
    }
    if (xDirection == 2 && yDirection == -2) {
        xDirection = -2;
        return;
    }
    if (xDirection == -2 && yDirection == -2) {
        yDirection = 2;
        return;
    }
    if (xDirection == -2 && yDirection == 2) {
        xDirection = 2;
        return;
    }
}