var submitButton = document.querySelector("#submit-button");

function newProblem() {
    // generate new A and B values
    var a = Math.floor(Math.random()*20);
    var b = Math.floor(Math.random()*20);
    var op = Math.floor(Math.random()*2);

    // Find spans in DOM
    var span_a = document.querySelector("#number-a");
    var span_b = document.querySelector("#number-b");
    var span_op = document.querySelector("#operator");

    span_a.innerHTML = a;
    span_b.innerHTML = b;

    if (op == 1) {
        span_op.innerHTML = "*";
        return (a * b);
    }
    else {
        span_op.innerHTML = "+";
        return (a + b);
    }
}

var correctAnswer = newProblem();

submitButton.onclick = function() {
    var answer_input = document.querySelector("#answer-box");
    var answer_feedback = document.querySelector("#answer-feedback");

    if (answer_input.value == correctAnswer) {
        console.log("Correct!");
        answer_feedback.innerHTML = "Correct!";
        answer_feedback.classList.remove("incorrect");
        answer_feedback.classList.add("correct");

        correctAnswer = newProblem();
    }
    else {
        console.log("Wrong answer. Try again.");
        answer_feedback.innerHTML = "Wrong answer. Try again";
        answer_feedback.classList.remove("correct");
        answer_feedback.classList.add("incorrect");
        
    }
}