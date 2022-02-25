document.addEventListener("DOMContentLoaded", () => {

$(document).ready(function () {
    $(".preload").each(function (index, element) {
        setTimeout(function () { $(element).removeClass("preload") }, 10);
    });
});
    
const menu = document.querySelector(".menu");
const board = document.querySelector(".board");
const startBtn = document.querySelector("#start-btn");
const restartBtn = document.querySelector("#restart-btn");
const homeBtn = document.querySelector("#home-btn");
const replayBtn = document.querySelector("#replay-btn");
const headerText = document.querySelector(".header_text");
const boardMask = document.querySelector(".board-mask");
const modeWrappers = document.querySelectorAll(".mode-border-wrap");

var mode = "multiplayer";
// var mode = "impossible";

var isBotPlaying = false;

var menuCollapsed = false;

const players = ['red', 'blue'];
var turnCount = 0;
var winningStatus = 'none';

var randomNum = Math.floor(Math.random() * 2);

var currentTurn = players[0];

const squares = document.querySelectorAll(".square");

// Array of squares that hasn't been clicked
var unclickedSquares = [...squares];
var clickedSquares = [];

var squaresStatus = ['', '', '', '', '', '', '', '', ''];

var status = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]

var position = {
    center: 4,
    edges: [1, 3, 5, 7],
    corners: [0, 2, 6, 8]
}

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

Array.prototype.shuffle = function() {
    return this.sort(() => {
        return Math.random() - 0.5;
    });
}


modeWrappers.forEach(modeWrapper => {
    modeWrapper.addEventListener("click", modeChoosing);
    modeWrapper.classList.add("mode-hover");
})

function modeChoosing() {
    mode = this.id;
    this.children[0].style.opacity = "1";
    
    modeWrappers.forEach(modeWrapper => {
        if (modeWrapper != this) {
            modeWrapper.children[0].style.opacity = "0";
        }

        modeWrapper.classList.remove("mode-selected");
        modeWrapper.classList.add("mode-hover");
    })

    this.classList.remove("mode-hover");
    this.classList.add("mode-selected");
}


startBtn.addEventListener('click', start);
// start()

restartBtn.addEventListener('click', reset);
replayBtn.addEventListener('click', reset);

homeBtn.addEventListener('click', start);
homeBtn.addEventListener('click', reset);

function start() {
    menuToggle();

    headerText.innerHTML = updateHeaderText();
    squareHover();
}

// Swipe menu down and up
function menuToggle() {
    if (!menuCollapsed){
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

    menuCollapsed = !menuCollapsed;
}

function reset() {

    // remove the marks and the blur effect when winning
    for (let square of squares) {
        square.innerHTML = '';
        removeClassFromChildrens(square, 'z-index-3');
        removeClassFromChildrens(square, 'blur');
    }

    // reset the click event of the squares
    squares.forEach( (square) => {
        square.removeEventListener('click', play);
    });
    squares.forEach( (square) => {
        square.addEventListener('click', play, { once: true });
    });

    // hide the board mask when winning
    boardMask.style.zIndex = '-1';
    boardMask.style.opacity = '0';

    // hide the restart button when winning
    restartBtn.style.visibility = 'hidden';
    restartBtn.style.opacity = '0';

    // reset the turn and the status
    turnCount = 0;
    winningStatus = 'none';
    
    randomNum = Math.floor(Math.random() * 2);
    
    currentTurn = players[0];

    unclickedSquares = [...squares];

    squaresStatus = ['', '', '', '', '', '', '', '', ''];

    status = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]


    headerText.innerHTML = updateHeaderText();
    squareHover();
}


squares.forEach(square => {
    square.addEventListener('click', play, { once: true });
});

function play() {
    squareClick(this);
    // console.log(winningStatus);

    if (mode != 'multiplayer') {
        unclickedSquares.forEach(square => {
            square.removeEventListener('click', play);
        });
        isBotPlaying = true;
        squareHover();
        
        setTimeout(() => {
            if (winningStatus == 'none') {
                botPlay();
            }
            // console.log(winningStatus);

            unclickedSquares.forEach(square => {
                square.addEventListener('click', play, { once: true });
            });
            isBotPlaying = false;
            squareHover();
        }, 500);
    }
}

function botPlay() {
    if (mode == 'begginer') {
        botBeginner();
    }
    else if (mode == 'normal') {
        botNormal();
    }
    else if (mode == 'impossible') {
        botImpossible();
    }
}

// Pick a random square from an array of squares
function randomSquareFrom(squareArray) {
    return squareArray[Math.floor(Math.random() * squareArray.length)];
}

// Return an array of the unclicked squares that is in the position 
function positionFilter(pos) {
    let filtered = [];

    if (typeof pos == 'object') {
        for (let p of pos) {
            filtered = filtered.concat(unclickedSquares.filter(square => {
                return position[p].includes(parseInt(square.id[1]));
            })) 
        }
    }
    else {
        filtered = unclickedSquares.filter(square => {
            return position[pos].includes(parseInt(square.id[1]));
        })
    }
    return filtered;
}

function botBeginner() {
    squareClick(randomSquareFrom(unclickedSquares));
}

function botNormal() {
    if (turnCount == 1) {
        if (status[1][1] == 'red') {
            console.log("First move: Opponent played center!");
            squareClick(randomSquareFrom(positionFilter('edges')));
        }
        else {
            console.log("First move: Opponent did not play center!");
            squareClick(randomSquareFrom(positionFilter(['edges', 'corners'])));
        }
    }
    else {
        if (checkTwoMarks('blue') != 'none') {
            console.log("Detect winning move!");
            squareClick(squares[checkTwoMarks('blue')]);
        }
        else if (checkTwoMarks('red') != 'none') {
            console.log("Detect losing move!");
            squareClick(squares[checkTwoMarks('red')]);
        }
        else {
            console.log("Random!");
            squareClick(randomSquareFrom(unclickedSquares));
        }
    }
}

function botImpossible() {
    if (turnCount == 1) {
        if (status[1][1] == '') {
            squareClick(squares[position.center]);
        }
        else {
            squareClick(randomSquareFrom(positionFilter('corners')));
        }
    }
    else {
        if (checkTwoMarks('blue') != 'none') {
            squareClick(squares[checkTwoMarks('blue')]);
        }
        else if (checkTwoMarks('red') != 'none') {
            squareClick(squares[checkTwoMarks('red')]);
        }
        else {
            squareClick(randomSquareFrom(unclickedSquares));
        }
    }
}

function unclickedSquaresIDs() {
    return unclickedSquares.map(square => {
        return parseInt(square.id[1]);
    })
}

function checkTwoMarks(color) {

    for (let condition of winningConditions.shuffle()) {
        if (squaresStatus[condition[0]] == squaresStatus[condition[1]] && squaresStatus[condition[0]] == color) {
            if (unclickedSquaresIDs().includes(condition[2])) {
                return condition[2];
            }
        }
        else if (squaresStatus[condition[0]] == squaresStatus[condition[2]] && squaresStatus[condition[0]] == color) {
            if (unclickedSquaresIDs().includes(condition[1])) {
                return condition[1];
            }
        }
        else if (squaresStatus[condition[1]] == squaresStatus[condition[2]] && squaresStatus[condition[1]] == color) {
            if (unclickedSquaresIDs().includes(condition[0])) {
                return condition[0];
            }
        }
    }
    return 'none';
}


// Call when a square is clicked
function squareClick(thisSquare) {
    insertMark(thisSquare);
    updateSquareStatus(thisSquare.id[1]);

    // Remove this square from the unclicked array
    unclickedSquares.splice(unclickedSquares.indexOf(thisSquare), 1);

    resultCheck();

    // Swap turn
    turnCount ++;
    // currentTurn = players[(turnCount + 0) % 2];
    currentTurn = players[turnCount % 2];

    headerText.innerHTML = updateHeaderText();
    squareHover(thisSquare);
}



function insertMark(element) {
    if (currentTurn == 'red') {
        element.innerHTML = '<i class="fas fa-slash sl1"></i><i class="fas fa-slash sl2"></i>';

        setTimeout(() => {
            element.childNodes[0].style.opacity = "1";
            element.childNodes[1].style.opacity = "1";
        }, 0);
    }
    else if (currentTurn == 'blue') {
        element.innerHTML = '<i class="blue-mark far fa-circle"></i>';

        setTimeout(() => {
            element.childNodes[0].style.opacity = "1";
        }, 0);
    }
}


function updateSquareStatus(elementId) {
    status[Math.floor(elementId / 3)][elementId % 3] = currentTurn;
    squaresStatus[elementId] = currentTurn;
}


function resultCheck() {
    if (unclickedSquares.length == 0) {
        winningStatus = 'draw';
    }
    
    for (let condition of winningConditions) {
        if ((squaresStatus[condition[0]] == squaresStatus[condition[1]]) && 
            (squaresStatus[condition[1]] == squaresStatus[condition[2]]) && 
            (squaresStatus[condition[0]] != '')) {

            winningStatus = squaresStatus[condition[0]];

            win(condition);

            break;
        }
    }

    if (winningStatus != 'none') {
        squares.forEach((square) => {
            square.removeEventListener('click', play);
        });
        restartBtn.style.visibility = 'visible';
        restartBtn.style.opacity = '1';
    }

    return winningStatus;
}

function addClassToChildrens(element, classToAdd) {
    for (let c = 0; c < element.childNodes.length; c ++) {
        element.children[c].classList.add(classToAdd);
    }
}

function removeClassFromChildrens(element, classToRemove) {
    for (let c = 0; c < element.childNodes.length; c ++) {
        if (element.children[c].classList.contains(classToRemove)) {
            element.children[c].classList.remove(classToRemove);
        }
    }
}

function win(condition) {
    let remainingSquares = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    
    for (let i of condition) {
        addClassToChildrens(squares[i], 'z-index-3');
        remainingSquares = remainingSquares.filter(ele => {
            return ele != i;
        }) 
    }

    for (let s of remainingSquares) {
        addClassToChildrens(squares[s], 'blur');
    }

    boardMask.style.zIndex = '2';
    boardMask.style.opacity = '1';
}


// Update header text
function updateHeaderText() {
    if (menuCollapsed) {
        if (resultCheck() == 'none') {
            if (currentTurn == 'red') {
                return "It's player <span class='red-text'>RED</span> turn";
            }
            else {
                return "It's player <span class='blue-text'>BLUE</span> turn";
            }
        }
        else if (resultCheck() == 'red') {
            return 'Player <span class="red-text">RED</span> wins';
        }
        else if (resultCheck() == 'blue'){
            return 'Player <span class="blue-text">BLUE</span> wins';
        }
        else {
            return 'Draw!';
        }
    }
    else {
        return "Let's play some Tic Tac Toe ...";
    }
}


// Set the hover color to the squares
function squareHover(element) {
    // Add hover effect to the unclicked squares
    unclickedSquares.forEach(square => {
        if (resultCheck() != 'red' && resultCheck() != 'blue' && !isBotPlaying){
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
            square.classList.remove("red-hover", "blue-hover");
        }
    });

    // Remove hover effect from this square because it's clicked
    if (element != undefined) {
        element.classList.remove("red-hover", "blue-hover");
    }
}

});