const mongoose = require("mongoose");
const {Schema} = mongoose;
const dotenv = require('dotenv');

dotenv.config() // Import environmental variables

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_PASSWORD);



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

const QuizSchema = Schema({
    title: {
        type: String,
        required: [true, "Quiz must have a title."]
    },
    description: String,
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }]
})

const Question = mongoose.model("Question", QuestionSchema);
const Quiz = mongoose.model("Quiz", QuizSchema);

module.exports = {
    Quiz: Quiz,
    Question: Question
}