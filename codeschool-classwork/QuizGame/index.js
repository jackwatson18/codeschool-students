const express = require("express");
const model = require("./model");

const app = express();
const port = 8080;

app.use(express.json());

app.get("/quizes", function(req, res) {
    model.Quiz.find().populate("questions").then(quizes => {
        res.send(quizes);
    })
})

app.get("/quizes/:quizID", function(req, res) {
    model.Quiz.findOne( {"_id":req.params.quizID }).populate("questions").then(quiz => {
        if (quiz) {
            res.send(quiz);
        }
        else {
            res.status(404).send("Quiz not found.");
        }
    })
})

app.get("/questions", function(req, res) {
    model.Question.find().then(questions => {
        res.send(questions);
    })
})

app.get("/questions/:questionID", function(req, res) {
    model.Question.findOne( {"_id":req.params.questionID }).then(question => {
        if (question) {
            res.send(question);
        }
        else {
            res.status(404).send("Quiz not found.");
        }
    })
})

app.post("/quizes", function(req, res) {
    const newQuiz = new model.Quiz({
        title: req.body.title,
        description: req.body.description,
        questions: req.body.questions // Will be IDs of questions
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
});

app.delete("/quiz/:quizID", function(req, res) {
    model.Quiz.findOne({ "_id":req.params.quizID }).then(quiz => {
        if (quiz) {
            model.Quiz.deleteOne({ "_id":req.params.quizID }).then(function() {
                res.status(204).send(); // deleted
            })
        }
        else {
            res.status(404).send("Quiz not found.");
        }
    })
})

app.delete("/questions/:questionID", function(req, res) {
    model.Question.findOne({ "_id":req.params.questionID }).then(question => {
        if (question) {
            model.Question.deleteOne({ "_id":req.params.questionID }).then(function() {
                res.status(204).send();
            })
        }
        else {
            res.status(404).send("Question not found.");
        }
    })
})

app.put("/quizes/:quizID", function(req, res) {
    model.Quiz.findOne( { "_id":req.params.quizID }).then(quiz => {
        if (quiz) {
            quiz.title = req.body.title,
            quiz.description = req.body.description,
            quiz.questions = req.body.questions

            quiz.save().then(() => {
                res.status(200).send("Quiz updated.");
            }).catch(errors => {
                console.log(errors);
                res.status(400).send("Error updating quiz.");
            })
        }
        else {
            res.status(404).send("Quiz not found.");
        }
    })
})

app.listen(port, function() {
    
    console.log(`Running server on port ${port}...`);
});