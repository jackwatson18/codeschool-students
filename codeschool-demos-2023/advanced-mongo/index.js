const express = require('express');
const model = require('./model');

const app = express();
const port = 8080;

app.use(express.json());

app.get("/students", function(req, res) {
    console.log(req.query);
    model.Student.find(req.query).then(function(students) {
        res.send(students);
    })
})

app.post("/students", function(req, res) {
    const newStudent = new model.Student({
        name: req.body.name,
        lunchMoney: req.body.lunchMoney,
        classes: req.body.classes,
        backpackContents: req.body.backpackContents
    });

    newStudent.save().then(function() {
        res.status(201).send("Student created.");
    }).catch(function(errors){
        // console.log(errors);
        res.status(422).send("Error creating student.");
    })
})


app.listen(port, function() {
    console.log(`Running server on port ${port}...`);
});