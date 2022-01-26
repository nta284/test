document.addEventListener("DOMContentLoaded", () => {

$(document).ready(function () {
    $(".preload").each(function (index, element) {
        setTimeout(function () { $(element).removeClass("preload") }, 10);
    });
});
    
var menuCollapse = false;

const menu = document.querySelector(".menu");
const board = document.querySelector(".board");
const startBtn = document.querySelector("#start-btn");
const restartBtn = document.querySelector("#restart-btn");
const homeBtn = document.querySelector("#home-btn");
const replayBtn = document.querySelector("#replay-btn");
const headerText = document.querySelector(".header_text");
const boardMask = document.querySelector(".board-mask");

const player = ['red', 'blue'];
var turnCount = 0;
var winningStatus = 'none';

var randomNum = Math.floor(Math.random() * 2);

var currentTurn = player[randomNum];

const squares = document.querySelectorAll(".square");

// Array of squares that hasn't been clicked
var unclickedSquares = [...squares];

var squaresStatus = ['', '', '', '', '', '', '', '', ''];

// 0 1 2
// 3 4 5
// 6 7 8
var winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]


startBtn.addEventListener('click', start);

restartBtn.addEventListener('click', reset);
replayBtn.addEventListener('click', reset);

homeBtn.addEventListener('click', start);
homeBtn.addEventListener('click', reset);

function start() {
    menuToggle();

    updateHeaderText();
    squareHover(currentTurn);
}

function menuToggle() {
    if (!menuCollapse){
        setTimeout(() => {
            menu.style.transform = "translateY(100%)";
            menu.style.opacity = "0";
        }, 150);
        
        startBtn.style.visibility = "hidden";
        startBtn.style.opacity = "0";

        replayBtn.style.visibility = "visible";
        replayBtn.style.opacity = "1";
        homeBtn.style.visibility = "visible";
        homeBtn.style.opacity = "1";

        board.style.visibility = "visible";
    }
    else {
        menu.style.transform = "translateY(0%)";
        menu.style.opacity = "1";
        
        setTimeout(() => {
            startBtn.style.visibility = "visible";
            startBtn.style.opacity = "1";
        }, 700);

        replayBtn.style.visibility = "hidden";
        replayBtn.style.opacity = "0";
        homeBtn.style.visibility = "hidden";
        homeBtn.style.opacity = "0";

        board.style.visibility = "hidden";
    }

    menuCollapse = !menuCollapse;
}

function reset() {
    for (var square of squares) {
        square.innerHTML = '';
        removeClassFromChildrens(square, 'z-index-3');
        removeClassFromChildrens(square, 'blur');
    }

    squares.forEach( (square) => {
        square.removeEventListener('click', squareClick);
    });

    squares.forEach( (square) => {
        square.addEventListener('click', squareClick, { once: true });
    });

    boardMask.style.zIndex = '-1';
    boardMask.style.opacity = '0';

    restartBtn.style.visibility = 'hidden';
    restartBtn.style.opacity = '0';

    turnCount = 0;
    winningStatus = 'none';
    
    randomNum = Math.floor(Math.random() * 2);
    
    currentTurn = player[randomNum];

    unclickedSquares = [...squares];

    squaresStatus = ['', '', '', '', '', '', '', '', ''];

    updateHeaderText();
    squareHover(currentTurn);
}


squares.forEach( (square) => {
    square.addEventListener('click', squareClick, { once: true });
});


// Call when a square is clicked
function squareClick() {
    insertMark(this);
    updateSquareStatus(this.id);

    // Remove this square from the unclicked array
    unclickedSquares.splice(unclickedSquares.indexOf(this), 1);

    resultCheck();

    // Swap turn
    turnCount ++;
    currentTurn = player[(turnCount + 0) % 2];

    updateHeaderText();
    squareHover(this);
}



function insertMark(element) {
    if (currentTurn == 'red') {
        element.innerHTML = '<i class="fas fa-slash sl1"></i><i class="fas fa-slash sl2"></i>';
    }
    else if (currentTurn == 'blue') {
        element.innerHTML = '<i class="blue-mark far fa-circle"></i>';
    }
}


function updateSquareStatus(elementId) {
    squaresStatus[elementId[1]] = currentTurn;
    // console.log(squaresStatus);
}


function resultCheck() {
    if (unclickedSquares.length == 0) {
        winningStatus = 'draw';
    }

    for (var condition of winningConditions) {
        if ((squaresStatus[condition[0]] == squaresStatus[condition[1]]) && 
            (squaresStatus[condition[1]] == squaresStatus[condition[2]]) && 
            (squaresStatus[condition[0]] != '')) {

            winningStatus = squaresStatus[condition[0]];

            win(condition);

            break;
        }
    }

    if (winningStatus == 'red' || winningStatus == 'blue') {
        squares.forEach((square) => {
            square.removeEventListener('click', squareClick);
        });
    }

    if (winningStatus != 'none') {
        restartBtn.style.visibility = 'visible';
        restartBtn.style.opacity = '1';
    }

    return winningStatus;
}

function addClassToChildrens(element, classToAdd) {
    for (var c = 0; c < element.childNodes.length; c ++) {
        element.children[c].classList.add(classToAdd);
    }
}

function removeClassFromChildrens(element, classToRemove) {
    for (var c = 0; c < element.childNodes.length; c ++) {
        if (element.children[c].classList.contains(classToRemove)) {
            element.children[c].classList.remove(classToRemove);
        }
    }
}

function win(condition) {
    var remainingSquares = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    
    for (var i of condition) {
        addClassToChildrens(squares[i], 'z-index-3');
        remainingSquares = remainingSquares.filter((ele) => {
            return ele != i;
        }) 
    }

    for (var s of remainingSquares) {
        addClassToChildrens(squares[s], 'blur');
    }

    boardMask.style.zIndex = '2';
    boardMask.style.opacity = '1';
}


// Update header text
function updateHeaderText() {
    if (menuCollapse) {
        if (resultCheck() == 'none') {
            if (currentTurn == 'red') {
                headerText.innerHTML = 'It\'s player <span class="red-text">RED</span> turn';
            }
            else {
                headerText.innerHTML = 'It\'s player <span class="blue-text">BLUE</span> turn';
            }
        }
        else if (resultCheck() == 'red') {
            headerText.innerHTML = 'Player <span class="red-text">RED</span> wins';
        }
        else if (resultCheck() == 'blue'){
            headerText.innerHTML = 'Player <span class="blue-text">BLUE</span> wins';
        }
        else {
            headerText.innerHTML = 'Draw!';
        }
    }
    else {
        headerText.innerHTML = "Let's play some Tic Tac Toe ...";
    }
}


// Call when square is hovered, set hover color
function squareHover(element) {
    unclickedSquares.forEach((square) => {
        if (resultCheck() == 'none'){
            if (currentTurn == 'red') {
                square.classList.add("red-hover");
                square.classList.remove("blue-hover");
            }
            else if (currentTurn == 'blue') {
                square.classList.add("blue-hover");
                square.classList.remove("red-hover");
            }
        }
        else {
            square.classList.remove("red-hover");
            square.classList.remove("blue-hover");
        }
    });

    // Remove hover effect from this square because it's clicked
    if (element.classList.contains("red-hover")) {
        element.classList.remove("red-hover");
    }
    else if (element.classList.contains("blue-hover")){
        element.classList.remove("blue-hover");
    }
}

});