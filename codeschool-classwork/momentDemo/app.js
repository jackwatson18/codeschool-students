
var myArray = ["a", "b", "c", "d", "e", "f", "g"];

var dateTime = moment().format("YYYYMMDDHHmm");
var dateNumber = parseInt(dateTime, 10);
console.log(dateTime);
console.log(dateNumber);

console.log(myArray[dateNumber % myArray.length]);



var textInput = document.querySelector("#text-input");
var dateInput = document.querySelector("#date-input");
var setName = document.querySelector("#set-name");
var loadName = document.querySelector("#load-name");

setName.onclick = function() {
    var name = textInput.value;
    var date = dateInput.value;
    localStorage.setItem(name, JSON.stringify(date));
    console.log(name);
}

loadName.onclick = function() {
    var name = textInput.value;
    var date = JSON.parse(localStorage.getItem(name));
    console.log(date);
}