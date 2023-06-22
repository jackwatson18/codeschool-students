

function bookValidator(book) {
    console.log(book.rating);
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
    if (isNaN(book.rating)) {
        errors.push("Rating must be a number.");
    }
    
    return errors;
}

const express = require("express");
const cors = require("cors");
const model = require("./model.js")

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));



app.get("/books", function(req, res) {
    model.Book.find().then(function(books) {
        res.send(books);
    })
})

app.get("/books/:bookId", function(req, res) {
    model.Book.findOne({ "_id": req.params.bookId }).then(function(book) {
        if (book) {
            res.send(book);
        }
        else {
            res.status(404).send("Book not found.");
        }
    }).catch(function(errors) {
        console.log(errors);
        res.status(422).send("Bad request.");
    })
});

app.post("/books", function(req, res) {
    const newBook = new model.Book({
        title: req.body.title,
        author: req.body.author,
        rating: req.body.rating
    });
    console.log(newBook);

    var errors = bookValidator(newBook);

    if (errors.length == 0) {
        newBook.save().then(function() {
            res.status(201).send("Created new book.");
        }).catch(function(errors) {
            console.log(errors);
            res.status(400).send("Failed to save book.");
        })
    }
    else {
        res.status(422).send(errors)
    }
});

app.delete("/books/:bookId", function(req, res) {
    var bookId = req.params.bookId;

    model.Book.findOne({ "_id":bookId }).then(book => {
        if (book) {
            model.Book.deleteOne({ "_id":bookId }).then(result => {
                console.log(result.deletedCount);
                res.status(204).send("Book deleted.");
            })
        }
        else {
            res.status(404).send("Book not found");
        }
    }).catch(errors => {
        console.log(errors);
        res.status(400).send("Book not found/error deleting");
    });
})

app.put("/books/:bookId", function(req, res) {
    var bookId = req.params.bookId;

    model.Book.findOne({ "_id":bookId }).then(book => {
        if (book) {
            // Prepare to update book
            var newBook = {
                title: req.body.title,
                author: req.body.author,
                rating: req.body.rating
            }

            let errorList = bookValidator(newBook);

            if (errorList.length > 0) {
                // errors occured in validation
                res.status(422).send("Could not update book.");
            }
            else {
                book.title = req.body.title;
                book.author = req.body.author;
                book.rating = req.body.rating;
    
                console.log(book);

                model.Book.findOneAndUpdate({ "_id":bookId }, book, {new: true, runValidators: true, context: "query"}).then((result) => {
                    res.status(200).send("Updated book.");
                });
            }

            
        }
        else {
            // doesn't exist, can't update nothing
            res.status(404).send("Book not found.");
        }
    }).catch(errors => {
        console.log(errors);
        res.status(400).send("Book not found.");
    })

})

app.listen(8080, function() {
    console.log("Server is running!");
})

// get by ID

// post function

// put function

// delete function
