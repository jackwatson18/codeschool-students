const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

mongoose.connect(process.env.DB_LINK);

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


module.exports = {
    Book: Book
}