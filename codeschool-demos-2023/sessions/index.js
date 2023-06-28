const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
const model = require("./model");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.urlencoded({ extended: false }));

function AuthMiddleware(req, res, next) {
    if (req.session && req.session.userId) {
        model.User.findOne({ "_id":req.session.userId }).then(user => {
            if (user) {
                req.user = user;
                next(); // proceed to next process
            }
            else {
                res.status(401).send("Unauthenticated."); // supposed user doesn't exist
            }
        })
    } 
    else {
        res.status(401).send("Unauthenticated."); // no session to authorize
    }
}


app.use(session({
    // secret is a random string we use for a password. In practice, this should NEVER be stored in the open!
    // however, since we are learning, this is fine for now.
    secret: "jljrweajlgrshjhhjjfejkfkjlkhrjfhgklf78934uitojgrk6ytrgfiboklrwefsdvycxgihjkthf",
    saveUninitialized: true,
    resave: false
}));

app.get("/blueprints", AuthMiddleware, function(req, res) {
    model.Blueprint.find().then(blueprints => {
        res.send(blueprints);
    })
})

app.post("/blueprints", AuthMiddleware, function(req, res) {
    const newBlueprint = new model.Blueprint({
        title: req.body.title,
        description: req.body.description
    });

    newBlueprint.save().then(()=>{
        res.status(201).send("New blueprint created.");
    }).catch(errors => {
        console.log(errors);
        res.status(422).send("Error creating blueprint.");
    })
})

app.get("/users", function(req, res) {
        model.User.find().then(users => {
            res.send(users);
        })
    })

app.post("/users", function(req,res) {
    
        const newUser = new model.User({
            email: req.body.email,
            name: req.body.name
        });
        newUser.setPassword(req.body.password).then(function() {
            newUser.save().then(() => {
                res.status(201).send("User created.");
            }).catch(errors => {
                console.log(errors);
                res.status(422).send("Couldn't create user.");
            }) 
        })
        
})

app.put("/users/:userId", AuthMiddleware, function(req, res) {
    model.User.findOne({ "_id":req.params.userId }).then(user => {
        if (user) {
            user.email = req.body.email,
            user.password = req.body.password,
            user.name = req.body.name

            user.save().then(function() {
                res.status(200).send("Updated user.");
            }).catch(errors => {
                console.log(errors);
                res.status(422).send("Error updating user.");
            })
        }
        else {
            res.status(404).send("User not found.");
        }
    })
})

app.delete("/users/:userId", AuthMiddleware, function(req, res) {
    model.User.findOne({ "_id":req.params.userId }).then(user => {
        if (user) {
            model.User.deleteOne({ "_id":req.params.userId }).then(() => {
                res.status(204).send("deleted.");
            }
            )
        }
        else {
            res.status(404).send("User not found.");
        }
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
            user.verifyPassword(req.body.password).then(result => {
                console.log(result);
                if (result) {
                    // password matches
                    req.session.userId = user._id;
                    req.session.name = user.name;
                    res.status(201).send("Session created.");
                }
                else {
                    // passwords don't match
                    res.status(401).send("Couldn't authenticate 2. Check email/password.")
                }
            })
            
        }
        else {
            // user doesn't exist
            // 404 would expose user information about who is signed up or not. 401 is unauthenticated.
            res.status(401).send("Couldn't authenticate 1. Check email/password.");
        }
    }).catch(errors => {
        res.status(400).send("Couldn't process request.");
    })
})

app.listen(8080, function() {
    console.log("Server running port 8080");

})