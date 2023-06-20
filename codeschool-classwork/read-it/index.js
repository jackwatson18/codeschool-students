

// example book
const book = {
    title: "Harry Potter",
    author: "JK Rowling",
    rating: 5
}

const myBooks = [{
    title: "Harry Potter",
    author: "JK Rowling",
    rating: 5
}];

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.get("/books", function(req, res) {
    res.send(JSON.stringify(myBooks));
})

app.listen(8080, function() {
    console.log("Server is running!");
})

// get by ID

// post function

// put function

// delete function
