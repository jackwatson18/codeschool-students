console.log("Hello, JS!");

var my_array = ["Hello", "Words", "12344124"];
var my_object = {
    name: "Jack",
    class_name: "Code school"
}

var text_input = document.querySelector("#text-input");
console.log("Text input:");
console.log(text_input);
var submit_button = document.querySelector("#submit-button");
console.log("Submit button:");
console.log(submit_button);
var display_text = document.querySelector("#display-text");
console.log("Display text tag:");
console.log(display_text);

var display_list = document.querySelector("#my-list");
console.log(display_list);

function reload_list() {
    display_list.innerHTML = "";
    my_array.forEach(function(item) {
        console.log(item);
        var new_li = document.createElement("li");
        new_li.innerHTML = item;

        display_list.appendChild(new_li);
    });
}

submit_button.onclick = function() {
    console.log("Button clicked!");
    var user_input = text_input.value;
    console.log(user_input);

    my_array.push(user_input);
    console.log(my_array);

    display_text.innerHTML = user_input;
    
    reload_list();
};



var a_number = 1;

if (a_number == 1) {
    console.log("Number is one!");
}
else if (a_number == 2) {
    console.log("Number is two!")
}
else {
    console.log("Number is not one or two!");
}


reload_list();