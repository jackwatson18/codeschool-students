const mongoose = require("mongoose");
const {Schema} = mongoose;
const dotenv = require('dotenv');

dotenv.config() // Import environmental variables

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_PASSWORD);


const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, "Must have an email."],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Must have a password."]
    },
    name: String
})

const User = mongoose.model("User", UserSchema);

module.exports = {
   User: User
}