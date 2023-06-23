var allTiles = document.querySelectorAll(".tile");

var currentPlayer = 0;


allTiles.forEach(function(tile) {
    tile.onclick = function() {
        tile.innerHTML = "X";
    }
})

