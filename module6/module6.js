// declaration of variables and functions

let operation, firstNum, secondNum, result;

const checkOperation = function (op) {
    if (op !== "+" && op !== "-" && op !== "*" && op !== "/") {
        console.log(`That is not a valid operation `);
        op = rs.question(`What operation would you like to perform? `);
        checkOperation(op);
    } else {
        operation = op;
    }
};

const checkNum = function (num) {
    if (isNaN(Number(num)) || !num) {  // adjustment : empty string is falsy value
        console.log(`This is not a number `);
        if (!secondNum) {
            num = rs.question(`Please enter the first number `);
            checkNum(num);
        } else {
            num = rs.question(`Please enter the second number `);
            checkNum(num);
        }
    } else {
        secondNum === undefined ? (firstNum = num) : (secondNum = num);
    }
};

const calculate = function (num1, num2, op) {
    if (op === "+") {
        return (Number(num1) + Number(num2)).toFixed(2);
    } else if (op === "-") {
        return (Number(num1) - Number(num2)).toFixed(2);
    } else if (op === "*") {
        return (Number(num1) * Number(num2)).toFixed(2);
    } else {
        return (Number(num1) / Number(num2)).toFixed(2);
    }
};


// execute the calculator

let rs = require("readline-sync");
operation = rs.question(`What operation would you like to perform? `);
checkOperation(operation);
firstNum = rs.question(`Please enter the first number `);
checkNum(firstNum);
secondNum = rs.question(`Please enter the second number `);
checkNum(secondNum);
result = calculate(firstNum, secondNum, operation);
console.log(`The result is: ${result}`);






