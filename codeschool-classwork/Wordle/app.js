var correctWord = "";
var validWords = [];
var possibleAnswers = [];
var guessedWords = [];
var NUM_GUESSES = 6;
var WORD_LENGTH = 5;
var GAME_OVER = false;

function pickRandomWord() {
    var randomIndex = Math.floor(possibleAnswers.length * Math.random());
    correctWord = possibleAnswers[randomIndex];
    console.log(correctWord);
}

function getWordList() {
    fetch("https://api.jsonbin.io/v3/b/629f9937402a5b38021f6b38").then(function(response) {
        response.json().then(function (data) {
            possibleAnswers = data.record.answers;
            // console.log(possibleAnswers);
            validWords = data.record.allowed.concat(possibleAnswers);
            // console.log(validWords);
            pickRandomWord();
        })
    });
}

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

        var checkedOutput;

        if (i < guessedWords.length) {
            checkedOutput = checkWord(guessedWords[i], correctWord);
            newGuess.classList.add("guessed");
        }
        for (var j=0; j < WORD_LENGTH; j++) { // Create WORD_LENGTH number letters
            var newLetter = document.createElement("span");
            newLetter.classList.add("letter");
            if (i < guessedWords.length) {
                newLetter.innerHTML = guessedWords[i][j];

                var checkedOutput = checkWord(guessedWords[i], correctWord);
                console.log(checkedOutput);

                if (checkedOutput[j] == 1) {
                    newLetter.classList.add("match");
                }
                else if (checkedOutput[j] == 2) {
                    newLetter.classList.add("contains");
                }
            }
            newGuess.appendChild(newLetter);
        }

        allGuessesDiv.appendChild(newGuess);
    }
}


function setupInputs() {
    var guessButton = document.querySelector("#guess-button");
    guessButton.onclick = function() {
        makeGuess();
        
        
    }
}

function makeGuess() {
    var guessInput = document.querySelector("#guess-input");
    var messageDiv = document.querySelector("#message");

    if (!GAME_OVER) {
        if (guessInput.value.length != 5) {
            messageDiv.innerHTML = "Five letters please.";
        }
        else if (!validWords.includes(guessInput.value)) {
            messageDiv.innerHTML = "Not a real word.";
        }
        else {
            var lastGuess = guessInput.value;
            guessedWords.push(lastGuess);
            guessInput.value = "";

            if (lastGuess == correctWord) {
                messageDiv.innerHTML = "You win!";
                GAME_OVER = true;
            }
            else {
                messageDiv.innerHTML = "";
            }
            
            updateGuesses();
        }

        if (guessedWords.length >= NUM_GUESSES && !GAME_OVER) {
            GAME_OVER = true;
            messageDiv.innerHTML = "You lose!";
        }
    }
}

function setupKeys() {
    document.onkeydown = function(event) {
        if (event.key == "Enter") {
            makeGuess();
        }

        else if (event.keyCode >= 65 && event.keyCode <= 90) {
            keyboardWord += event.key;
            console.log(keyboardWord);
        }
    }
}

var keyboardWord = "";

getWordList();
updateGuesses();
setupInputs();
setupKeys();