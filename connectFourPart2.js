// The differences between iterating over an array with the 4 primary looping constructs
// 1. for (let i = 0; i < arr.length; ++i)
// 2. for (let i in arr)
//      The for and for/in looping constructs give you access to the index in the array, not the 
//      actual element
//      Code example:
//            for (let i = 0; i < arr.length; ++i) {
//              console.log(arr[i]);
//            }
//
//            for (let i in arr) {
//              console.log(arr[i]);
//            }
// 3. arr.forEach((v, i) => { /* ... */ })
// 4. for (const v of arr)
//      The forEach() and for/of, allows access to the array element itself; with forEach() can
//      access the array index i, with for/of cannot
//      Code example:
//            arr.forEach((v, i) => console.log(v));
//
//            for (const v of arr) {
//              console.log(v);
//            }

// Check for game over
function gameOverCheck() {
    console.log("gameOverCheck");
    // Declare variable count, initialized to 0
    let count = 0;
    // Iterate through the 2d array initialMatrix
    // Write a for/of loop to iterate through the rows, loop control variable innerArray, in    2d array initialMatrix
    for (const innerArray of initialMatrix) {
        // If object innerArray, function every(val => (val) != 0))
        if (innerArray.every(val => val !== 0)) {
            // increment variable count by 1
            count++;
        // Else
        } else {
            // return false
            return false;
        }
    }
    // If variable count is equal to 6
    if (count === 6) {
         // Set constant message, property innerText, equal to "Game Over"
        message.innerText = "Game Over"
        // return false
        return false;
    }
}

// Win check logic
function winCheck (row, column) {
    console.log("winCheck");
    // Write decision making logic, if function call checkHorizontal, checkVertical, checkPositiveDiagonal, or checkNegativeDiagonal is true, return true
    if (checkHorizontal(row, column) || checkVertical(row, column) || checkPositiveDiagonal(row, column) || checkNegativeDiagonal(row, column)) {
        return true;
    // else return false
    } else {
        return false;
    }
}

// Write function setPiece 
function setPiece(startCount, colValue) {
    console.log("setPiece");
    // Add exception handling so the player cannot click a full column
    try {
        // Declare variable rows initialized to object document, method querySelectorAll, passing argument class ".grid-row"
        let rows = document.querySelectorAll(".grid-row");
        // If the element in array initialMatrix at indexes parameters startCount and colValue is NOT equal to 0   
        if (initialMatrix[startCount][colValue] !== 0) {
            // Decrement parameter startCount by 1
            startCount--;
            // Call function setPiece, passing as arguments parameters startCount and colValue
            setPiece(startCount, colValue);
        // Else
        } else {
            // Declare variable currentRow initialized to array rows, index startCount, method querySelectorAll, passing as an argument class ".grid-box"
            let currentRow = rows[startCount].querySelectorAll(".grid-box");
            // Modify currentRow, index colValue, object classlist, method add, passing as arguments "filled" and `player${currentPlayer}` 
            currentRow[colValue].classList.add("filled", `player${currentPlayer}`);
            // Update array initialMatrix, indexes startCount and colValue, set equal to currentPlayer
            initialMatrix[startCount][colValue] = currentPlayer;
            
            // If function call winCheck, passing as arguments parameters startCount and colValue is true
            // Current if/else should be wrapped inside a try{} block
            if (winCheck(startCount, colValue)) {
                // Set object message's innerHTML equal to `Player<span> ${currentPlayer}</span> wins` 
                message.innerHTML = `Player<span> ${currentPlayer}</span> wins`;
                // Return false
                return false;
            }
        }
        // Call function gameOverCheck
        gameOverCheck();
    // The catch(e){} block should display and alert dialog box informing the player "Column full, select again"
    } catch (e) {
        // Display an alert dialog box informing the player "Column full, select again"
        alert("Column full, select again");
    }
}

// Write function checkHorizontal to do the following
function checkHorizontal(row, column) {
    // Write a nest for loop to iterate through the rows and columns
    for (let i = 0; i < 4; i++) {
        // if the currentPlayer has four discs in a row horizontally, return true
        if (initialMatrix[row][i] === currentPlayer && 
            initialMatrix[row][i+1] === currentPlayer &&
            initialMatrix[row][i+2] === currentPlayer && 
            initialMatrix[row][i+3] === currentPlayer) {
            return true;
        }
    }
    // return false
    return false;
}

// Write function checkVertical to do the following
function checkVertical(row, column) {
    // Write a nest for loop to iterate through the columns and rows
    for (let i = 0; i < 3; i++) {
        // if the currentPlayer has four discs in a row vertically, return true
        if (initialMatrix[i][column] === currentPlayer && 
            initialMatrix[i+1][column] === currentPlayer && 
            initialMatrix[i+2][column] === currentPlayer &&
            initialMatrix[i+3][column] === currentPlayer) {
            return true;
        }
    }
    // return false
    return false;
}

// Write function checkPositiveDiagonal to do the following
function checkPositiveDiagonal(row, column) {
    // Write a nest for loop to iterate through the rows and columns
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            // if the currentPlayer has four discs in a row diagonally, bottom right to top left, return true
            if (initialMatrix[i][j] === currentPlayer &&
                initialMatrix[i+1][j+1] === currentPlayer &&
                initialMatrix[i+2][j+2] === currentPlayer &&
                initialMatrix[i+3][j+3] === currentPlayer) {
                return true;
        }
    }
}
    // return false
    return false;
}

// Write function checkNegativeDiagonal to do the following
function checkNegativeDiagonal(row, column) {
    // Write a nest for loop to iterate through the rows and columns
    for (let i = 0; i < 3; i++) {
        for (let j = 3; j < 7; j++) {
            // if the currentPlayer has four discs in a row diagonally, bottom left to top right, return true
            if (initialMatrix[i][j] === currentPlayer &&
                initialMatrix[i+1][j-1] === currentPlayer &&
                initialMatrix[i+2][j-2] === currentPlayer &&
                initialMatrix[i+3][j-3] === currentPlayer) {
                return true;
            }
        }
    }   
    // return false
    return false;
}

// Initialize the game when the window loads
// For the window.onload event, call function startGame
window.onload = startGame;