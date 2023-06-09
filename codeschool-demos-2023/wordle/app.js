var ATTEMPTS = 6; // Caps helps us know its a global
var LENGTH = 5;

var correctWord = "";
var currentGuess = "";
var numWins = {};
var myName = "";

var guesses = [];

var allowed = [];
var answers = [];
var gameOver = false;

var numWinsDiv = document.querySelector("#num-wins");
var myNameInput = document.querySelector("#my-name");
var changeNameButton = document.querySelector("#change-name");
var displayNameTag = document.querySelector("#display-name");

changeNameButton.onclick = function() {
    myName = myNameInput.value;
    displayNameTag.innerHTML = myName;
    saveState();
    updateGuesses();
}




function saveState() {
    localStorage.setItem("correctWord", JSON.stringify(correctWord));
    localStorage.setItem("guesses", JSON.stringify(guesses));
    localStorage.setItem("gameOver", JSON.stringify(gameOver));
    localStorage.setItem("myName", JSON.stringify(myName));
    localStorage.setItem("numWins", JSON.stringify(numWins));
}

function loadState() {
    correctWord = JSON.parse(localStorage.getItem("correctWord"));
    guesses = JSON.parse(localStorage.getItem("guesses"));
    gameOver = JSON.parse(localStorage.getItem("gameOver"));
    numWins = JSON.parse(localStorage.getItem("numWins"));
    myName = JSON.parse(localStorage.getItem("myName"));
    displayNameTag.innerHTML = myName;

    console.log(numWins);
    if (!guesses) {
        guesses = [];
    }
    if (!gameOver) {
        gameOver = false;
    }
}

function resetGame() {
    correctWord = "";
    currentGuess = "";
    guesses = [];
    gameOver = false;
}

function fetchWordList() {
    fetch("https://raw.githubusercontent.com/chidiwilliams/wordle/main/src/data/words.json").then(function (response) {
        response.json().then(function (data) {
            allowed = data;
            answers = data;

            loadState();
            chooseNewWord();
            updateGuesses();
            setupInputs();
        });
    });
}

function randomizeWord() {
    var index = Math.floor(Math.random() * answers.length);
    correctWord = answers[index];
    console.log("The correct word is:",correctWord);
}

function chooseNewWord() {
    var newWord = getCurrentWord();
    if (!correctWord || correctWord != newWord) {
        resetGame();
        correctWord = newWord;
        saveState();
        console.log("The answer is now:", correctWord);
    }
    else {
        console.log("The answer is still:", correctWord);
    }
}

function getCurrentWord() {
    var dateString = moment().format("YYYYMMDDHHmm");
    var dateNumber = parseInt(dateString, 10);
    var word = answers[dateNumber % answers.length];
    return word;
}

function checkWord(correct, guess) {
    var result = [0, 0, 0, 0, 0]; // 0=wrong, 1=right, 2=misplaced
    var letters = correct.split(""); // correct letters into array
    // check good letters first
    for (var i = 0; i < LENGTH; i++) {
        // Not a for each. Still a for loop.
        if (guess[i] == letters[i]) {
            // letter is perfect match.
            letters[i] = null;
            result[i] = 1;
        }
    }

    // mark 2 for misplaced letters
    for (var i = 0; i < LENGTH; i++) {
        var index = letters.indexOf(guess[i]);
        // returns index of first position matching our parameter.
        // if nothing is found, returns -1.

        if (index >= 0 && result[i] == 0) {
            // Only if we found i in our correct letters, and result isn't already marked.
            result[i] = 2;
            letters[index] = null;
        }
    }

    console.log("result:", result)
    return result;
    // final array telling us which letters are correct.
}

function updateGuesses() {
    var allGuessesDiv = document.querySelector("#guesses");
    allGuessesDiv.innerHTML = ""; // reset guessDiv to empty

    // if (numWins[myName]) {
    //     numWinsDiv.innerHTML = numWins[myName];
    // }
    

    for (var i = 0; i < ATTEMPTS; i++) {
        var guessDiv = document.createElement("div");
        guessDiv.classList.add("guess"); // create new div and add to existing div
        allGuessesDiv.appendChild(guessDiv);

        var result;
        if (i < guesses.length) { // don't exceed number of guesses.
            guessDiv.classList.add("guessed");
            result = checkWord(correctWord, guesses[i]);
            // use our checkWord function to compare our guess to actual word.
        }

        for (var j = 0; j < LENGTH; j++) { // note different variable! Nested for loops need different var.
            var letterDiv = document.createElement("div");
            letterDiv.classList.add("letter");
            if (i < guesses.length) {
                // again, checking to see if our guess div contains an actual guess.
                // we won't do anything if this row is past our number of guesses.
                letterDiv.innerHTML = guesses[i][j];

                if (result[j] == 1) {
                    letterDiv.classList.add("match");
                } else if (result[j] == 2) {
                    letterDiv.classList.add("contains");
                }
            }

            if (i == guesses.length && j < currentGuess.length) {
                letterDiv.innerHTML = currentGuess[j];
            }

            guessDiv.appendChild(letterDiv);
        }
    }
}


// function setupInputs() {
//     var guessInput = document.querySelector("#guess-input");
//     var guessButton = document.querySelector("#guess-button");
//     var messageDiv = document.querySelector("#message");

//     guessButton.onclick = function () {
//         var guess = guessInput.value;

//         if (guess.length == 5) {
//             guesses.push(guess);
//             console.log("guesses:", guesses);
//             guessInput.value = "";
//             messageDiv.innerHTML = "";
//             updateGuesses();
//         } else {
//             messageDiv.innerHTML = "5 Letters required.";
//         }
//     }
// }

function submitGuess() {
    var messageDiv = document.querySelector("#message");

    if (currentGuess.length != 5) {
        messageDiv.innerHTML = "5 letters required.";
    }
    else if (!allowed.includes(currentGuess)) {
        messageDiv.innerHTML = "Not a real word. Try again.";
    }
    else {
        if (guesses.length < 6) {
            guesses.push(currentGuess);
            messageDiv.innerHTML = "";
            if (currentGuess == correctWord) {
                messageDiv.innerHTML = "You win!";
                // if (numWins[myName]) {
                //     numWins[myName] += 1;
                // }
                // else {
                //     numWins[myName] = 1;
                // }
                
                gameOver = true;
            }
            else if (guesses.length == 6) {
                messageDiv.innerHTML = "You lose!";
                gameOver = true;
            }
        }

        updateGuesses();
        saveState();
    }
}

function setupInputs() {
    document.onkeydown = function (event) {
        if (!gameOver && !event.altKey && !event.ctrlKey && !event.metaKey) {
            if (event.keyCode >= 65 && event.keyCode <= 90) {
                if (currentGuess.length < 5) {
                    currentGuess += event.key.toLowerCase();
                }
            }
            else if (event.keyCode == 8) {
                currentGuess = currentGuess.slice(0, -1);
            }
            else if (event.keyCode == 13) {
                submitGuess();
                currentGuess = "";
            }
        }
        updateGuesses();
    }
}

// initialize by calling
fetchWordList();
