const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

mongoose.connect(process.env.DB_LINK);

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Must have a title."]
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
    rating: {
        type: Number,
        required: [true, "Must have a rating."]
    }

});

const authorSchema = new mongoose.Schema({
    name: String,
    birthday: Date,
    nationality: String,
    awards: [String]
})

const Book = mongoose.model("Book", bookSchema);
const Author = mongoose.model("Author", authorSchema);

module.exports = {
    Book: Book,
    Author: Author
}

