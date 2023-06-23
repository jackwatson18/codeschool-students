const mongoose = require("mongoose");
const {Schema} = mongoose;
const dotenv = require('dotenv');

dotenv.config() // Import environmental variables

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_PASSWORD);


const studentSchema = Schema({
    name: {
        type: String,
        required: [true, "Person must have a name."]
    },
    lunchMoney: Number,
    classes: [String],
    backpackContents: [String]
});

const Student = mongoose.model("Student", studentSchema);

module.exports = {
    Student:Student
}

