const mongoose = require("mongoose");
const {Schema} = mongoose;
const dotenv = require('dotenv');

dotenv.config() // Import environmental variables

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_PASSWORD);

const BlueprintSchema = new Schema({
    title: {
        type: String,
        required: [true, "Blueprint must be titled."]
    },
    description: String
})

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
const Blueprint = mongoose.model("Blueprint", BlueprintSchema);

module.exports = {
   User: User,
   Blueprint: Blueprint
}