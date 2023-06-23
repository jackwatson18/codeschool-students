const express = require("express");
const model = require("./model");

const app = express();
const port = 8080;

app.use(express.json());

app.get("/quizes", function(req, res) {
    model.Quiz.find().then(quizes => {
        res.send(quizes);
    })
})

app.get("/questions", function(req, res) {
    model.Question.find().then(questions => {
        res.send(questions);
    })
})

app.post("/quizes", function(req, res) {
    const newQuiz = new model.Quiz({
        title: req.body.title,
        description: req.body.description
    })

    newQuiz.save().then(() => {
        res.status(201).send("Quiz created.");
    }).catch(errors => {
        let error_list = [];
        console.log(errors.errors);
        for (key in errors.errors) {
            error_list.push(errors.errors[key].properties.message)
        }
        res.status(422).send(error_list)
    })
})

app.post("/questions", function(req, res) {
    const newQuestion = new model.Question({
        text: req.body.text,
        answers: req.body.answers
    })

    newQuestion.save().then(() => {
        res.status(201).send("Question created.");
    }).catch(errors => {
        let error_list = [];
        console.log(errors.errors);
        for (key in errors.errors) {
            error_list.push(errors.errors[key].properties.message)
        }
        res.status(422).send(error_list)
    })
})

app.listen(port, function() {
    console.log(`Running server on port ${port}...`);
});