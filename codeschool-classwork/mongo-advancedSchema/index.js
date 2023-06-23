const express = require('express');
const model = require('./model');

const app = express();
const port = 8080;

app.use(express.json());

app.get("/students", function(req, res) {
    model.Student.find().then(function(students) {
        res.send(students);
    })
})

app.post("/students", function(req, res) {
    const newStudent = new model.Student({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        class_level: req.body.class_level,
        classes: req.body.classes
    })

    newStudent.save().then(function() {
        res.status(201).send("Created student.");
    }).catch(function(errors) {
        var error_list = [];
        for (key in errors.errors) {
            console.log(errors.errors[key].properties.message);
            error_list.push(errors.errors[key].properties.message);
        }
        res.status(422).send(errors);
    })
});

app.listen(port, function() {
    console.log(`Running server on port ${port}...`);
});