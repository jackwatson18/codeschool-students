const mongoose = require('mongoose');
const {Schema} = mongoose;


mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://cs4200:XTz8UBfv0RAj8fwG@cluster0.jtfgznj.mongodb.net/dogs?retryWrites=true&w=majority");

const dogSchema = new mongoose.Schema({
    name: String,
    age: Number,
    breed: String,
    isGoodDog: Boolean
})

const Dog = mongoose.model("Dog", dogSchema);

// const newDog = new Dog({
//     name: "Fido",
//     age: 5,
//     breed: "Unnkown",
//     isGoodDog: true
// })

// console.log(newDog);

// newDog.save().then(() => {
//     console.log("Save the dawg");
// })

Dog.find({"name": "Fido"}).then(dog => {
    console.log(dog);
})