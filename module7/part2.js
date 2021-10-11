// load the readline and table package 
// table npm link : https://www.npmjs.com/package/table

const rs = require("readline-sync");
const { table } = require("table");

// function

const generateBoard = function (boardSize) {
    const board = [];
    const character = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const colName = ['']

    for (let i = 0; i < boardSize; i++) {
        const row = [character[i]];

        for (let j = 0; j < boardSize; j++) {
            row.push('');
        }
        board.push(row);
        colName.push(i + 1)
    }

    board.unshift(colName)
    return board;
};

const pickNum = function (shipSize, boardSize) {
    let result = [];
    let max = boardSize - shipSize;
    let startNum;
    do {
        startNum = Math.floor(Math.random() * (max + 2))
    } while (startNum === 0)

    for (let i = 0; i < shipSize; i++) {
        result.push(startNum);
        startNum += 1;
    }

    return result;
};

const isIntersection = function (shipPosition, currentPosition) {
    let boolean = false;
    if (shipPosition.length !== 0) {
        for (let i = 0; i < shipPosition.length; i++) {
            for (let j = 0; j < shipPosition[i].length; j++) {
                for (let k = 0; k < currentPosition.length; k++) {
                    if (currentPosition[k] === shipPosition[i][j]) {
                        boolean = true;
                        break;
                    }
                }
                if (boolean) {
                    break;
                }
            }
            if (boolean) {
                break;
            }
        }
    }
    return boolean;
};

const placeShip = function (boardSize) {
    const shipPosition = [];
    const char = {
        1: "A",
        2: "B",
        3: "C",
        4: "D",
        5: "E",
        6: "F",
        7: "G",
        8: "H",
        9: "I",
        10: "J",
    };
    const shipSize = [2, 3, 3, 4, 5];
    for (let i = 0; i < shipSize.length; i++) {
        let direction, row, col, position;

        do {
            direction = Math.floor(Math.random() * 2); // 0 : horizontal , 1 : vertical

            do {
                row = Math.floor(Math.random() * (boardSize + 1))
            } while (row === 0)

            col = pickNum(shipSize[i], boardSize);

            if (direction === 0) {
                position = col.map((element) => char[row] + (element + 1).toString());
            } else {
                position = col.map((element) => char[element] + (row + 1).toString());
            }
        } while (isIntersection(shipPosition, position));

        shipPosition.push(position);
    }

    return shipPosition.flat();
};

const UserPlaceSpot = function (board, shipPosition, position) {
    let row, col, isHit;
    const charToNum = { A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9, J: 10 };
    row = charToNum[position[0]]
    col = Number(position.substring(1))

    for (var i = 0; i < shipPosition.length; i++) {
        if (position === shipPosition[i]) {
            isHit = true;
            shipPosition.splice(i, 1);
            break;
        }
    }

    console.clear();

    if (isHit) {
        board[row][col] = "X";
        console.log(`Hit. You have sunk a battleship`);
    } else {
        board[row][col] = "O";
        console.log(`You have missed!`);
    }
};

const isInputRepeat = function (board, boardSize, userInputHistory, userInput) {
    let boolean = false,
        regularExp = /^[a-j]/gi;

    console.clear();

    if (!regularExp.test(userInput) || isNaN(Number(userInput.substring(1))) || Number(userInput.substring(1)) > boardSize) {
        console.log(`Invalid input!!`);
        boolean = true;
    } else if (userInputHistory.length >= 1) {
        for (let i = 0; i < userInputHistory.length; i++) {
            if (userInputHistory[i] === userInput) {
                boolean = true;
                console.log(`You have already picked this location. Miss!`);
                break;
            }
        }
    }

    return boolean;
};

// execution

const boardSize = 10;
const board = generateBoard(boardSize);
const shipPosition = placeShip(boardSize);
const userInputHistory = [];

// show the position of the ship for convenience

const shipPositionBoard = generateBoard(10);
const charToNum = { A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9, J: 10 };
for (let i = 0; i < shipPosition.flat().length; i++) {
    let rowIndex = charToNum[shipPosition.flat()[i][0]]
    let colIndex = Number(shipPosition.flat()[i].substring(1))

    shipPositionBoard[rowIndex][colIndex] = 'ship'
}
console.log(`-----------Show the position of the ship for convenience!!!---------`);
console.log(shipPosition.flat());
console.log(table(shipPositionBoard));
console.log(`---------------------------------------------------------------------`);

do {

    rs.keyIn(`Press any key to start the game... `);

    while (shipPosition.length !== 0) {
        let userInput, boolean;

        do {
            userInput = rs.question(`Enter a location to strike `);
            userInput = userInput.toUpperCase();
            boolean = isInputRepeat(board, boardSize, userInputHistory, userInput);
        } while (boolean);

        userInputHistory.push(userInput);
        UserPlaceSpot(board, shipPosition, userInput);
    }
} while (
    rs.keyInYNStrict(
        `You have destroyed all your battleships. Would you like to play again?`
    )
);

