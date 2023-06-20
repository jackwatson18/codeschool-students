const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: false }));


const port = 8080;

var myReminders = ["Make dinner", "Take out the trash", "Sleep"];

app.get("/reminders", function(req, res) {
    res.send(JSON.stringify(myReminders));
})

app.get("/reminders/:reminderId", function(req, res) {
    var index = req.params.reminderId;
    
    if (index >= 0 && index < myReminders.length) {
        if (myReminders[index]) {
            // Valid index
            res.send(JSON.stringify(myReminders[index]));
        }
        else {
            res.status(404).send("Reminder not found.");
        }
    }

    else {
        // Invalid index
        res.status(404).send("Reminder not found.");
    }

    // Idk what this is, its not an index though
});

app.post("/reminders", function (req, res) {
    var new_reminder = req.body.reminder;

    if (new_reminder) {
        myReminders.push(new_reminder);
        res.status(201).send("New reminder created.");
    }
    else {
        res.status(422).send("Invalid request (no empty reminders please!)");
    }
    
})

app.put("/reminders/:reminderId", function(req, res) {
    var index = req.params.reminderId;
    
    if (index >= 0 && index < myReminders.length) {
        var updated_reminder = req.body.reminder;
        if (updated_reminder) {
            myReminders[index] = updated_reminder;
            res.status(204).send("Reminder updated!");
        }
        else {
            res.status(422).send("Invalid request (no empty reminder updates!)");
        }
    }

    else {
        res.status(404).send("Reminder not found.");
    }

});

app.delete("/reminders/:reminderId", function(req, res) {
    var index = req.params.reminderId;

    if (index >= 0 && index < myReminders.length) {
        if (myReminders[index] != undefined) {
            myReminders[index] = undefined;
            res.status(204).send("Reminder deleted.");
        }
        else {
            res.status(404).send("Reminder not found.");
        }
    }
    else {
        res.status(404).send("Reminder not found.");
    }

})


app.listen(port, function() {
    console.log("Server started locally on port",port);
})