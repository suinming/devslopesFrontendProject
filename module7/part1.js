// load the readline and table package 
// table npm link : https://www.npmjs.com/package/table

const rs = require("readline-sync");
const { table } = require('table');

// function

const generateBoard = function (size, shipRemain) {
    const board = [];
    const character = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const colName = ['']

    for (let i = 0; i < size; i++) {
        const row = [character[i]];

        for (let j = 0; j < size; j++) {
            row.push('');
        }
        board.push(row);
        colName.push(i + 1)
    }

    board.unshift(colName)
    console.log(table(board));

    for (let i = 0; i < shipRemain; i++) {
        let rowIndex, colIndex
        do {
            do {
                rowIndex = Math.floor(Math.random() * (size + 1))
                colIndex = Math.floor(Math.random() * (size + 1))
            } while (rowIndex === 0 || colIndex === 0)

        } while (board[rowIndex][colIndex] === "ship");

        board[rowIndex][colIndex] = "ship";
    }

    // show the position of the ship for convenience
    console.log(table(board));

    return board;
};

// execution

do {
    rs.keyIn(`Press any key to start the game... `);
    let shipRemain = 2;
    let boardSize = 3
    let row, col;
    const board = generateBoard(boardSize, shipRemain);
    const charToNum = { A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9, J: 10 };
    const userInput = [];

    //console.table(board);

    while (shipRemain !== 0) {
        let location = rs.question(`Enter a location to strike `);
        let isRepeatInput = false;

        location = location.toUpperCase();
        row = charToNum[location[0]];
        col = Number(location[1]);

        // check if user enter repeated location
        if (userInput.length >= 1) {
            for (let i = 0; i < userInput.length; i++) {
                if (userInput[i] === location) {
                    isRepeatInput = true;
                    break;
                }
            }
        }
        userInput.push(location);

        // response for miss, hit or repeat 
        if (isRepeatInput) {

            console.log(`You have already picked this location. Miss!`);

        } else if (board[row][col] === "ship") {

            shipRemain -= 1;
            console.log(
                `Hit. You have sunk a battleship. ${shipRemain} ship remaining.`
            );

        } else {

            console.log(`You have missed`);

        }
    }
} while (
    rs.keyInYNStrict(
        `You have destroyed all your battleships. Would you like to play again?`
    )
);