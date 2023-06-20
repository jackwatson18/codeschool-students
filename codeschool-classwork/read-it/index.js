

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

function bookValidator(book) {
    var errors = [];
    if (!book.title) {
        errors.push("Book must have a title.");
    }
    if (!book.author) {
        errors.push("Book must have an author.");
    }
    if (!book.rating) {
        errors.push("Book must have a rating.");
    }
    return errors;
}

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.get("/books", function(req, res) {
    res.send(JSON.stringify(myBooks));
})

app.get("/books/:bookId", function(req, res) {
    var index = req.params.bookId;

    if (index >= 0 && index < myBooks.length) {
        if (myBooks[index]) {
            res.send(JSON.stringify(myBooks[index]));
        }
        else {
            res.status(404).send("Book not found.");
        }
    }
    else {
        res.status(404).send("Book not found.");
    }
});

app.post("/books", function(req, res) {
    var newBook = {
        title: req.body.title,
        author: req.body.author,
        rating: req.body.rating
    }

    var errors = bookValidator(newBook);

    if (errors.length == 0) {
        myBooks.push(newBook);
        res.status(201).send("Book added.");
    }
    else {
        res.status(422).send(errors)
    }
});

app.delete("/books/:bookId", function(req, res) {
    var index = req.params.bookId;

    if (index >= 0 && index < myBooks.length) {
        if (myBooks[index]) {
            myBooks[index] = null;
            res.status(204).send("Book deleted.");
        }
        else {
            res.status(404).send("Book not found.");
        }
    }
    else {
        res.status(404).send("Book not found.");
    }
})

app.put("/books/:bookId", function(req, res) {
    var index = req.params.bookId;
    
    var updatedBook = {
        title: req.body.title,
        author: req.body.author,
        rating: req.body.rating
    }

    errors = bookValidator(updatedBook);

    if (index >= 0 && index < myBooks.length) {
        if (myBooks[index]) {
            if (errors.length == 0) {
                myBooks[index] = updatedBook;
                res.status(200).send("Book updated.");
            }
            else {
                res.status(422).send(errors);
            }
        }
        else {
            res.status(404).send("Book not found.");
        }
    }
    else {
        res.status(404).send("Book not found.");
    }

})

app.listen(8080, function() {
    console.log("Server is running!");
})

// get by ID

// post function

// put function

// delete function
