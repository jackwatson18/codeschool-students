const mongoose = require("mongoose");
const {Schema} = mongoose;
const dotenv = require('dotenv');

dotenv.config() // Import environmental variables

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_PASSWORD);

const MovieSchema = Schema({
    title: {
        type: String,
        required: [true, "Movie must have a title."]
    },
    production_cost: Number,
    profit: Number,
    director: String
});

const Movie = mongoose.model("Movie", MovieSchema);

module.exports = {
    Movie: Movie
}