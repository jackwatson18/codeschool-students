const mongoose = require("mongoose");
const {Schema} = mongoose;
const dotenv = require('dotenv');

dotenv.config() // Import environmental variables

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_PASSWORD);

const QuizSchema = Schema({
    title: {
        type: String,
        required: [true, "Quiz must have a title."]
    },
    description: String
})

const QuestionSchema = Schema({
    text: {
        type: String,
        required: [true, "Question must have text."]
    },
    answers: [{
        answerText: {
            type: String,
            required: [true, "Answer must have text."]
        },
        isTrue: Boolean
    }]
})

const Quiz = mongoose.model("Quiz", QuizSchema);
const Question = mongoose.model("Question", QuestionSchema);

module.exports = {
    Quiz: Quiz,
    Question: Question
}