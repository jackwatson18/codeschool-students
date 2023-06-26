const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");

const app = express();

app.use(session({
    // secret is a random string we use for a password. In practice, this should NEVER be stored in the open!
    // however, since we are learning, this is fine for now.
    secret: "jljrweajlgrshjhhjjfejkfkjlkhrjfhgklf78934uitojgrk6ytrgfiboklrwefsdvycxgihjkthf",
    saveUninitialized: true,
    resave: false
}));

app.get("/users", function(req, res) {
    console.log(req.headers.cookie);
    res.send("Hello world!");
})


app.listen(8080, function() {
    console.log("Server running port 8080");
})