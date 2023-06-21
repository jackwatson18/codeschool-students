const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(process.env.DB_LINK)

// sets up for our database
const animalSchema = new mongoose.Schema({
    name: String,
    weight: Number,
    species: String,
    birthday: Date
});

// sets up for our code
const Animal = mongoose.model("Animal", animalSchema);

// const newAnimal = new Animal({
//     name: "Skipper",
//     weight: 20,
//     species: "Penguin",
//     birthday: new Date("Jun 20 1950")
// })

// console.log(newAnimal);

// newAnimal.save().then(console.log("done"));

// Finding animals (multiple):
// Animal.find({"species": "Hippotomus", "weight": {$gte: 1000}}).then(function(animals) {
//     console.log(animals);
// });

Animal.findOne({"_id": "6493211abd26ec97a7c995a8"}).then(function(animal) {
    if (animal) {
        console.log(animal);
    }
    else {
        console.log("No animal");
    }
})
