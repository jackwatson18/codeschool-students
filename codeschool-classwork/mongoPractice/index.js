const mongoose = require('mongoose');
const {Schema} = mongoose;


mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://cs4200:XTz8UBfv0RAj8fwG@cluster0.jtfgznj.mongodb.net/expenseTracker?retryWrites=true&w=majority");

const JournalEntrySchema = Schema({
    description: String,
    amount: Number,
    category: String
})




