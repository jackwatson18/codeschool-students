var playerTurn = 0;
var gameOver = false;
var allTiles = document.querySelectorAll(".tile");
var topRow = document.querySelectorAll(".row1.x");
var turnSpan = document.querySelector("#turn");
var winnerDiv = document.querySelector("#winner");

console.log(allTiles.length);




// var rowTest = "diag1";

// var topRow = document.querySelectorAll("."+rowTest+"."+"tile");
// console.log(topRow);
// topRow.forEach(function(cell) {
//     cell.classList.add("x");
// })


function exampleCheckWinner(player) {
    var winState = "row1";
    var cells = document.querySelectorAll("." + winState + "." + player);
    console.log(cells.length);

} // if cell has WINSTATE & PLAYER 


function checkWinner(player) {
    var sets = ["row1", "row2", "row3", "col1", "col2", "col3", "diag1", "diag2"];

    var winner = false;

    sets.forEach(function (set) {
        var selector = "." + set + "." + player;
        var tiles = document.querySelectorAll(selector);
        console.log("Selector:", selector, "count:", tiles.length);

        if (tiles.length == 3) {
            winner = true;
        }
    });

    return winner;
}

allTiles.forEach(function (tile) {
    tile.onclick = function() {
        if (tile.innerHTML == "" && !gameOver) {
            if (playerTurn == 0) {
                tile.innerHTML = "X";
                tile.classList.add("x");

                if (checkWinner("x")) {
                    console.log("X HAS WON!");
                    winnerDiv.innerHTML = "X WINS!";
                    winnerDiv.classList.add("x");
                    gameOver = true;
                }
            
                playerTurn = 1;
                turnSpan.innerHTML = "O";
            }
            else {
                tile.innerHTML = "O";
                tile.classList.add("o");

                if(checkWinner("o")) {
                    console.log("O HAS WON!");
                    winnerDiv.innerHTML = "O WINS!";
                    winnerDiv.classList.add("o");
                    gameOver = true;
                }

                playerTurn = 0;
                turnSpan.innerHTML = "X";
            }
        }
    }
});

console.log("New game");