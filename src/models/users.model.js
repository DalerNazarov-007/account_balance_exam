const mongoose= require("mongoose");

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        minLength: 3,
        maxLength: 100,
        required: true
    },
    password: {
        type: String,
        minLength: 8,
        required: true
    },
    phone: {
        type: Number,
        min: 100000000,
        max: 999999999,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }      
}, 
    {
        timestamps: true,
    }    
)

const userModel = mongoose.model("User", userSchema)
module.exports = userModel