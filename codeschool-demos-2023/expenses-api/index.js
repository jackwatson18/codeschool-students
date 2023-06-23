const express = require('express');
const cors = require('cors');
const model = require('./model');

const app = express();
const port = 8080;

function validateExpense(expense) {
    errors = [];

    return errors;
}

app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/expenses", function(req, res) {
    model.JournalEntry.find().then(function(expenses) {
        res.send(expenses);
    })
});

app.get("/expenses/:expenseId", function(req, res) {
    model.JournalEntry.findOne( { "_id": req.params.expenseId } ).then(function(expense) {
        if (expense) {
            res.send(expense);
        }
        else {
            res.status(404).send("Expense not found.");
        }
    }).catch(function(errors) {
        console.log(errors);
        res.status(422).send("Bad request (GET expenses)")
    })
});

app.post("/expenses", function(req,res) {
    var newExpense = new model.JournalEntry({
        description: req.body.description,
        amount: req.body.amount,
        category: req.body.category
    });

    var errors = validateExpense(newExpense);

    if (errors.length == 0) {
        newExpense.save().then(function() {
            res.status(201).send("Expense created.");
        })
    }
    else {
        res.status(422).send(("Validation failed:", errors))
    }
})

app.delete("/expenses/:expenseId", function(req, res) {
    model.JournalEntry.findOne({ "_id": req.params.expenseId})
})


app.listen(port, function() {
    console.log(`Running server on port ${port}...`);
});