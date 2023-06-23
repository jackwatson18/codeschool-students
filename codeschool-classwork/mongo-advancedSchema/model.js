const mongoose = require("mongoose");
const {Schema} = mongoose;
const dotenv = require('dotenv');

dotenv.config() // Import environmental variables

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_PASSWORD);


const QuizSchema = Schema({
    title: String,
    description: String
});

const QuestionScehma = Schema({
    text: String,
    answers: [
        {answer_text: String, is_correct: Boolean}
    ]
})


const StudentSchema = Schema({
    name: {
        type: String,
        required: [true, "Must have a name."]
    },
    email: {
        type: String,
        unique: true
    },
    age: {
        type: Number,
        min: [5, "Age too low."],
        max: [18, "Age too high."]
    },
    class_level: {
        type: String,
        enum: ["freshman", "sophomore", "junior", "senior"],
    },
    classes: [String]
});

const Student = mongoose.model("Student", StudentSchema)

module.exports = {
    Student:Student
}

