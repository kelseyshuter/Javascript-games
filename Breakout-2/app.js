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
const ball = document.createElement('div');

let gameStart = false; //pause = true
let gameOver = false;
let userSelectedLevel = false;
let pageWidth = window.innerWidth;
let pageHeight = window.innerHeight;
let score = 0;
let timerId;
let xDirection = -2;
let yDirection = -2;

let ballDiameter = 15;
let boardHeight = 180;
let boardWidth = 270;

const ballStart = [120, 120];
let ballCurrentPosition = ballStart;

// adjust grid size based on page size, mobile is default
function checkPageSize() {
    if (pageWidth > 750 && pageHeight > 600) {
        boardHeight = 340;
        boardWidth = 500;
    }
}
checkPageSize();

// allows user to use buttons to select a level, 
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
    sendBack();
    userSelectedLevel = true;
    setTimeout(() => {gameStart = true;},3000)
    toggleSelectLevelListeners();
    toggleStartPauseListener();
    addBall();
    countDown();
    setTimeout(moveBallTimer,3000)
    if (level === 'Lvl.1') {
        levelDisplay.innerHTML = 'Lvl.1';
    } else if (level === 'Lvl.2') {
        levelDisplay.innerHTML = 'Lvl.2';       
    } else if (level === 'Lvl.3') {
        levelDisplay.innerHTML = 'Lvl.3';      
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
//should be shown when user loads page
toggleSelectLevelListeners();

//use green button to start and pause game
function toggleStartPauseListener() {
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
        messageBox.classList.remove('send-back')
        messageBox.innerHTML = 'Paused';        
    } else {
        gameStart = true;
        moveBallTimer();
        sendBack();
    }
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



function checkForCollisions() {

    //check for walls
    if (
        ballCurrentPosition[0] >= (boardWidth - ballDiameter) || 
        ballCurrentPosition[1] <= 0 ||
        ballCurrentPosition[0] <= 0 ||
        ballCurrentPosition[1] >= (boardHeight - ballDiameter)
        ) {
            changeDirection();
    }
}

// move ball every 30 ms
function moveBallTimer() {
    timerId = setInterval(moveBall, 30);
}

// move ball
function moveBall() {    
    ballCurrentPosition[0] += xDirection;
    ballCurrentPosition[1] += yDirection;
    drawBall();
    checkForCollisions();
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