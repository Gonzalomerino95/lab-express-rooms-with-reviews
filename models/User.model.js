const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
//RegEx para el hasheo de la password
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema ({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [EMAIL_PATTERN, "Invalid email pattern"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, 'Password needs at least 8 characters'],
    },
    fullName: {
        type: String,
        required: [true, "Full name is required"]
    }
},
{
    timestamps: true,
}
)

const User = mongoose.model("User", userSchema);

module.exports = User;