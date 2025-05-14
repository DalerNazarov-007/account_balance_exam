const { required } = require("joi");
const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
    amount:{
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
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
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    }     
}, 
    {
        timestamps: true,
    }    
)

const historyModel = mongoose.model("History", historySchema)
module.exports = historyModel