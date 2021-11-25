##Question unsolved:skull_and_crossbones:
In the program, there is one part called 'show the position of the ship for convenience'
I want to show the position of the ship before the game start.
Sometimes the compiler threw an error 'Table must have a consistent number of cells.', and I 
checked the file in table package that I used.
I think the following code is where the problem occur.
(this code snippet is in the file called validateTableData.js which is in the folder of the npm package)

if (row.length !== columnNumber) {
            throw new Error('Table must have a consistent number of cells.');
}

