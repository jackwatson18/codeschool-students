var correctWord = "";
var validWords = [];
var possibleAnswers = [];
var guessedWords = [];
var NUM_GUESSES = 6;
var WORD_LENGTH = 5;
var GAME_OVER = false;
var currentGuess = "";


function saveState() {
    localStorage.setItem("correctWord", JSON.stringify(correctWord));
    localStorage.setItem("guesses", JSON.stringify(guessedWords));
    localStorage.setItem("gameOver", JSON.stringify(GAME_OVER));
}

function loadState() {
    correctWord = JSON.parse(localStorage.getItem("correctWord"));
    guessedWords = JSON.parse(localStorage.getItem("guesses"));
    GAME_OVER = JSON.parse(localStorage.getItem("gameOver"));

    // What if they're empty though?
    if (!guessedWords) {
        guessedWords = [];
    }
    if (!GAME_OVER) {
        GAME_OVER = false;
    }
    
}

function resetGame() {
    correctWord = "";
    currentGuess = "";
    guesses = [];
    gameOver = false;
}

function getCurrentWord() {
    var dateString = moment().format("YYYYMMDDHHmm");
    var dateNumber = parseInt(dateString, 10);
    var word = possibleAnswers[dateNumber % possibleAnswers.length];
    console.log(word);
    return word;
}

function chooseNewWord() {
    var newWord = getCurrentWord();

    if (!correctWord || correctWord != newWord) {
        resetGame();
        correctWord = newWord;
    }
}

// function pickRandomWord() {
//     var randomIndex = Math.floor(possibleAnswers.length * Math.random());
//     correctWord = possibleAnswers[randomIndex];
//     console.log(correctWord);
// }

function getWordList() {
    fetch("https://raw.githubusercontent.com/chidiwilliams/wordle/main/src/data/words.json").then(function(response) {
        response.json().then(function (data) {
            console.log(data);
            possibleAnswers = data;
            validWords = data;
            // possibleAnswers = data.record.answers;
            // console.log(possibleAnswers);
            // validWords = data.record.allowed.concat(possibleAnswers);
            // console.log(validWords);
            correctWord = getCurrentWord();
        })
    });
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

                // var checkedOutput = checkWord(guessedWords[i], correctWord);
                // console.log(checkedOutput);

                if (checkedOutput[j] == 1) {
                    newLetter.classList.add("match");
                }
                else if (checkedOutput[j] == 2) {
                    newLetter.classList.add("contains");
                }
            }
            else if (i == guessedWords.length) {
                if (j < currentGuess.length) {
                    newLetter.innerHTML = currentGuess[j];
                }
                
            }
            newGuess.appendChild(newLetter);
        }

        allGuessesDiv.appendChild(newGuess);
    }
}


// function setupInputs() {
//     var guessButton = document.querySelector("#guess-button");
//     guessButton.onclick = function() {
//         makeGuess();
        
        
//     }
// }

function makeGuess() {
    var guessInput = document.querySelector("#guess-input");
    var messageDiv = document.querySelector("#message");

    if (!GAME_OVER) {
        if (currentGuess.length != 5) {
            messageDiv.innerHTML = "Five letters please.";
        }
        else if (!validWords.includes(currentGuess)) {
            messageDiv.innerHTML = "Not a real word.";
        }
        else {
            var lastGuess = currentGuess;
            guessedWords.push(lastGuess);
            currentGuess = "";

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
    var currentWordDiv = document.querySelector("#current-word");
    //console.log(currentWordDiv);
    document.onkeydown = function(event) {
        if (event.key == "Enter") {
            makeGuess();
        }
        else if (event.keyCode >= 65 && event.keyCode <= 90) {
            if (currentGuess.length < 5) {
                currentGuess += event.key;
                console.log("currentGuess:",currentGuess);
            }
            
        }
        else if (event.key == "Backspace") {
            currentGuess = currentGuess.slice(0,-1);
            console.log(currentGuess);
        }
        else {
            console.log(event.key);
        }

        if (!GAME_OVER) {
            currentWordDiv.innerHTML = currentGuess;
            updateGuesses();
        } 
    }
}

getWordList();
updateGuesses();
// setupInputs();
setupKeys();