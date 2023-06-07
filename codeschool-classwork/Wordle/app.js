var correctWord = "flood";
var validWords = [];
var guessedWords = ["floor", "guess", "water"];
var NUM_GUESSES = 6;
var WORD_LENGTH = 5;
var WINNER = false;

function updateGuesses() {
    // get value from input

    // validate word: right length and in valid words

    // check against right word -- creating a new element

    // add to our guesses and put on the screen
}

function checkWord(guessedWord, rightWord) {
    var checkArray = [0, 0, 0, 0, 0];

    var correctLetters = rightWord.split("");
    // for loop (i=0; i < WORD_LENGTH; i++)...
    // check letter one at a time
    for (var i=0; i < WORD_LENGTH; i++) {
        if (guessedWord[i] == correctLetters[i]) {
            correctLetters[i] = null;
            checkArray[i] = 1;
        }
    }

    // check for misplaced letters
    for (var i=0; i < WORD_LENGTH; i++) {
        var index = correctLetters.indexOf(guessedWord[i]);
        if (index >= 0 && checkArray[i] == 0) {
            checkArray[i] = 2;
            correctLetters[index] = null;
        }
    }

    return checkArray;
}

function updateGuesses() {
    var allGuessesDiv = document.querySelector("#guessesDiv");

    allGuessesDiv.innerHTML = "";

    for (var i=0; i < NUM_GUESSES; i++) { // create NUM_GUESSES number of guesses
        var newGuess = document.createElement("div");
        newGuess.classList.add("guess");
        for (var j=0; j < WORD_LENGTH; j++) { // Create WORD_LENGTH number letters
            var newLetter = document.createElement("span");
            newLetter.classList.add("letter");
            newGuess.appendChild(newLetter);
        }

        allGuessesDiv.appendChild(newGuess);
    }
}


console.log(checkWord("guess","floss"));


updateGuesses();