const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
const model = require("./model");

const app = express();
app.use(express.urlencoded({ extended: false }));

app.use(session({
    // secret is a random string we use for a password. In practice, this should NEVER be stored in the open!
    // however, since we are learning, this is fine for now.
    secret: "jljrweajlgrshjhhjjfejkfkjlkhrjfhgklf78934uitojgrk6ytrgfiboklrwefsdvycxgihjkthf",
    saveUninitialized: true,
    resave: false
}));

app.get("/users", function(req, res) {
        model.User.find().then(users => {
            res.send(users);
        })
    })

app.post("/users", function(req,res) {
    const newUser = new model.User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
    });

    newUser.save().then(() => {
        res.status(201).send("User created.");
    }).catch(errors => {
        res.status(422).send("Couldn't create user.");
    })
})

app.get("/session", function(req, res) {
    console.log(req.session);
    res.send();
})

app.post("/session", function(req, res) {
    // email
    // password

    model.User.findOne({ "email":req.body.email }).then(user => {
        if (user) {
            // user exists, now check password
            if (req.body.password == user.password) {
                // password matches
                req.session.userId = user._id;
                req.session.name = user.name;
                res.status(201).send("Session created.");
            }
            else {
                // passwords don't match
                res.status(401).send("Couldn't authenticate. Check email/password.")
            }
        }
        else {
            // user doesn't exist
            // 404 would expose user information about who is signed up or not. 401 is unauthenticated.
            res.status(401).send("Couldn't authenticate. Check email/password.");
        }
    }).catch(errors => {
        res.status(400).send("Couldn't process request.");
    })
})

app.listen(8080, function() {
    console.log("Server running port 8080");
})