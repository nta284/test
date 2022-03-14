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

var board = [
    'x', 'o', 'x',
    '', 'o', 'x',
    'o', 'x', ''
]

const scores = {
    o: 10,
    x: -10,
    draw: 0
}
var step;

function bestMove() {
    let bestScore = -Infinity;
    let index;

    for (let i = 0; i < 9; i ++) {
        if (board[i] == '') {
            step = i
            // console.log(step);

            board[i] = 'o';
            // console.log(board);

            let score = minimax(board, 0, false);

            board[i] = '';

            if (score > bestScore) {
                bestScore = score;
                index = i;
            }
        }
    }

    console.log(index);
}

bestMove();

function minimax(board, depth, isMaximizing) {
    let result = resultCheck();
    // console.log(result);
    if (result == 'o') {
        return (10 - depth);
    }
    else if (result == 'x') {
        return (depth - 10);
    }
    else if (result == 'draw') {
        return 0;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;

        for (let i = 0; i < 9; i ++) {
            if (board[i] == '') {
                let t = step;
                step = t + ' - ' + i; 
                // console.log(step);

                board[i] = 'o';
                // console.log(board);

                let score = minimax(board, depth + 1, false);

                step = t;
                board[i] = '';

                if (score > bestScore) {
                    bestScore = score;
                }
            }    
        }
        return bestScore;
    }
    else {
        let bestScore = Infinity;

        for (let i = 0; i < 9; i ++) {
            if (board[i] == '') {
                let t = step;
                step = t + ' - ' + i; 
                // console.log(step);

                board[i] = 'x';
                // console.log(board);

                let score = minimax(board, depth + 1, true);

                step = t;
                board[i] = '';

                if (score < bestScore) {
                    bestScore = score;
                }
            }    
        }
        return bestScore;
    }
}

function resultCheck() {
    for (let condition of winningConditions) {
        if ((board[condition[0]] == board[condition[1]]) && 
            (board[condition[1]] == board[condition[2]]) && 
            (board[condition[0]] != '')) {

            return board[condition[0]];
        }
    }

    if (board.filter(s => s == '').length == 0) {
        return 'draw';
    }
    
    return 'none';
}

// function resultCheck() {
//     let result;
//     let emptyCount = 0;

//     for (let i = 0; i < 3; i ++) {
//         result = threeEquals(board[i][0], board[i][1], board[i][2]);
//         if (result != 'none') {
//             return result;
//         }

//         result = threeEquals(board[0][i], board[1][i], board[2][i]);
//         if (result != 'none') {
//             return result;
//         }

//         emptyCount += countEmpty(board[i]);
//     }

//     result = threeEquals(board[0][0], board[1][1], board[2][2]);
//     if (result != 'none') {
//         return result;
//     }

//     result = threeEquals(board[0][2], board[1][1], board[2][0]);
//     if (result != 'none') {
//         return result;
//     }

//     if (emptyCount == 0) {
//         return 'draw';
//     }

//     return 'none';
// }