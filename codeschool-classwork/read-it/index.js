

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
    if (isNaN(book.rating)) {
        errors.push("Rating must be a number.");
    }
    
    return errors;
}

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(process.env.DB_LINK)

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));


const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Must have a title."]
    },
    author: {
        type: String,
        required: [true, "Must have an author."]
    },
    rating: {
        type: Number,
        required: [true, "Must have a rating."]
    }

});

const Book = mongoose.model("Book", bookSchema);




app.get("/books", function(req, res) {
    Book.find().then(function(books) {
        res.send(books);
    })
})

app.get("/books/:bookId", function(req, res) {
    Book.findOne({ "_id": req.params.bookId }).then(function(book) {
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
    const newBook = new Book({
        title: req.body.title,
        author: req.body.author,
        rating: req.body.rating
    });

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

    Book.findOne({ "_id":bookId }).then(book => {
        if (book) {
            Book.deleteOne({ "_id":bookId }).then(result => {
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

    Book.findOne({ "_id":bookId }).then(book => {
        if (book) {
            // Prepare to update book
            book.title = req.body.title;
            book.author = req.body.author;
            book.rating = req.body.rating;

            let errorList = bookValidator(book);

            if (errorList.length > 0) {
                // errors occured in validation
                res.status(422).send("Could not update book.");
            }
            else {
                Book.findOneAndUpdate({ "_id":bookId }, book, {new: true, runValidators: true}).then(result => {
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
