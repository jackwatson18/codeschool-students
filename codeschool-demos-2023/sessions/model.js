const mongoose = require("mongoose");
const {Schema} = mongoose;
const dotenv = require('dotenv');
const bcrypt = require("bcrypt");

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

UserSchema.methods.setPassword = function(plainPassword) {
    var promise = new Promise((resolve, reject) => {
        bcrypt.hash(plainPassword, 12).then(hashedPassword => {
            this.password = hashedPassword;
            resolve();
        }).catch(() => {
            reject();
        })
    })

    return promise;
    
}

UserSchema.methods.verifyPassword = function(plainPassword) {
    var promise = new Promise((resolve, reject) => {
        bcrypt.compare(plainPassword, this.password).then(result => {
            resolve(result);
        }).catch(() => {
            reject();
        })
    })

    return promise;
}

const User = mongoose.model("User", UserSchema);
const Blueprint = mongoose.model("Blueprint", BlueprintSchema);

const RedactedUser = mongoose.model("RedactedUser", UserSchema);

User.createCollection()

RedactedUser.createCollection({
    viewOn: "users",
    pipeline: [
        {
            $set: {
                name: "$name",
                email: "$email",
                password: "***"
            }
        }
    ]
});

// RedactedUser.createCollection({
//     viewOn: "users",
//     pipeline: [
//         {
//             $set: {
//                 name: {$concat: [{ $substr: ["$name", 0, 3] }, "..."]},
//                 email: { $concat: [{ $substr: ["$email", 0, 3] }, "..."]},
//                 password: "***"
//             }
//         }
//     ]
// })

module.exports = {
   User: User,
   RedactedUser: RedactedUser,
   Blueprint: Blueprint
}