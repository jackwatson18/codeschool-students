
var myWord = "flood";
var rightWord = "floor";

console.log(myWord[0]);

var myWordSplit = myWord.split("")
console.log(myWordSplit);

myWordSplit.forEach(function(letter) {
    console.log(letter);
});

for (var i=0; i < myWord.length; i++) {
    console.log(myWord[i],rightWord[i]);
}