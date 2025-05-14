const { required } = require("joi");
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    photo: {
        type: String
    },
    type: {
        type: String,
        enum: ["income", "expense"],
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },     
}, 
    {
        timestamps: true,
    }    
)

const categoryModel = mongoose.model("Category", categorySchema)
module.exports = categoryModel