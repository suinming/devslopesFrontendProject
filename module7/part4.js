// load the readline and table package 
// table npm link : https://www.npmjs.com/package/table

const rs = require("readline-sync");
const { table } = require("table");

// class

class Player {
    constructor(board, boardSize, shipPosition) {
        this.board = board;
        this.boardSize = boardSize;
        this.shipPosition = shipPosition;
        this.inputHistory = [];
    }

    // function for player
    userPlaceSpot = function (position) {
        let row, col, isHit = false;

        row = numCharConverter(position[0])
        col = Number(position.substring(1))

        for (var i = 0; i < this.shipPosition.length; i++) {
            if (position === this.shipPosition[i]) {
                isHit = true;
                this.shipPosition.splice(i, 1);
                break;
            }
        }

        console.clear();

        if (isHit) {
            this.board[row][col] = "X";
            //console.log(table(this.board));
            console.log(`Hit. You have sunk a battleship`);
        } else {
            this.board[row][col] = "O";
            //console.log(table(this.board));
            console.log(`You have missed!`);
        }
    };

    isInputRepeat = function (userInput) {
        let boolean = false,
            regularExp = /^[a-j]/gi;

        console.clear();

        if (!regularExp.test(userInput) || isNaN(Number(userInput.substring(1))) || Number(userInput.substring(1)) > this.boardSize) {
            console.log(`Invalid input!!`);
            printTable(player.board, computer.board)
            boolean = true;
        } else if (this.inputHistory.length >= 1) {
            for (let i = 0; i < this.inputHistory.length; i++) {
                if (this.inputHistory[i] === userInput) {
                    boolean = true;
                    console.log(`You have already picked this location. Miss!`);
                    printTable(player.board, computer.board)
                    break;
                }
            }
        }

        return boolean;
    };

    // function for computer
    // - generate random input for computer and tell player the position computer placed
    generateInput = function () {
        let row, col, boolean = false, isHit = false, computerInput
        do {
            do {
                row = Math.floor(Math.random() * (this.boardSize + 1))
                col = Math.floor(Math.random() * (this.boardSize + 1))
            } while (row === 0 || col === 0)

            computerInput = numCharConverter(row) + col;

            if (this.inputHistory.length >= 1) {
                for (let i = 0; i < this.inputHistory.length; i++) {
                    if (this.inputHistory[i] === computerInput) {
                        boolean = true;
                        break;
                    }
                }
            }
        } while (boolean);

        for (var i = 0; i < this.shipPosition.length; i++) {
            if (computerInput === this.shipPosition[i]) {
                isHit = true;
                this.shipPosition.splice(i, 1);
                break;
            }
        }

        if (isHit) {
            this.board[row][col] = "X";
            console.log(`Computer pick position ${computerInput}. Computer have sunk a battleship`);
        } else {
            this.board[row][col] = "O";
            console.log(`Computer pick position ${computerInput}. Computer have missed!`);
        }

    }


}

// function

const numCharConverter = function (input) {
    const character = { A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9, J: 10 };
    if (input > 10) {
        return 'error'
    } else if (typeof character[input] === 'number') {
        return character[input]
    } else {
        return Object.keys(character).filter(key => character[key] === input)
    }

}

const generateBoard = function (boardSize) {
    const board = [];
    const colName = ['']

    for (let i = 0; i < boardSize; i++) {
        const row = [numCharConverter(i + 1)];

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
                position = col.map((element) => numCharConverter(row) + (element + 1).toString());
            } else {
                position = col.map((element) => numCharConverter(element) + (row + 1).toString());
            }
        } while (isIntersection(shipPosition, position));

        shipPosition.push(position);
    }

    return shipPosition.flat();
};

const printTable = function (playBoard, computerBoard) {
    const output = []
    for (let i = 0; i < playBoard.length; i++) {
        output[i] = playBoard[i].concat(computerBoard[i])
    }
    console.log(table(output, {
        drawVerticalLine: (lineIndex) => {
            return lineIndex === 0 || lineIndex === 1 || lineIndex === 11 || lineIndex === 12 || lineIndex === 22;
        },
        header: {
            alignment: 'center',
            content: 'Player v.s computer',
        },
    }));
}


// declare variables

const boardSize = 10;

const playerBoard = generateBoard(boardSize);
const computerBoard = generateBoard(boardSize);

const playerShipPosition = placeShip(boardSize);
const computerShipPosition = placeShip(boardSize);

// show the position of the ship for convenience

const playerShipPositionBoard = generateBoard(10);
const computerShipPositionBoard = generateBoard(10);
const charToNum = { A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9, J: 10 };

for (let i = 0; i < playerShipPosition.flat().length; i++) {
    let playerRowIndex = charToNum[playerShipPosition.flat()[i][0]]
    let playerColIndex = Number(playerShipPosition.flat()[i].substring(1))
    let computerRowIndex = charToNum[computerShipPosition.flat()[i][0]]
    let computerColIndex = Number(computerShipPosition.flat()[i].substring(1))
    playerShipPositionBoard[playerRowIndex][playerColIndex] = 'ship'
    computerShipPositionBoard[computerRowIndex][computerColIndex] = 'ship'
}

console.log(`-----------Show the position of the ship for convenience!!!---------`);
console.log(`PLAYER's BOARD`);
console.log(playerShipPosition.flat());
console.log(table(playerShipPositionBoard));
console.log(`---------------------------------------------------------------------`);
console.log(`COMPUTER's BOARD`);
console.log(computerShipPosition.flat());
console.log(table(computerShipPositionBoard));
console.log(`---------------------------------------------------------------------`);

// execution

const player = new Player(playerBoard, boardSize, playerShipPosition)
const computer = new Player(computerBoard, boardSize, computerShipPosition)
const isTie = false;

do {

    rs.keyIn(`Press any key to start the game... `);

    while (playerShipPosition.length !== 0 && computerShipPosition.length !== 0) {
        let userInput, boolean;

        do {
            userInput = rs.question(`Enter a location to strike `);
            userInput = userInput.toUpperCase();
            boolean = player.isInputRepeat(userInput);
        } while (boolean);

        player.inputHistory.push(userInput);
        player.userPlaceSpot(userInput);
        computer.generateInput()
        printTable(player.board, computer.board)

        if (playerShipPosition.length === 0 && computerShipPosition.length === 0) {
            isTie = true;
        }
    }

    // show result

    if (isTie) {
        console.log(`Tie`);
    } else if (playerShipPosition.length === 0) {
        console.log(`Congratulation!! You win the game`);
    } else {
        console.log(`You lose the game!!`);
    }

} while (
    rs.keyInYNStrict(
        `Would you like to play again?`
    )
);

