const express = require("express")
const historyModel = require("../models/history.model")
const userModel = require("../models/users.model")
const { transactionUpdateValidation, transactionValidation } = require("../validations/transaction.validation")

async function getAllTransactions (req, res){
    const history  = await historyModel.find({userId: req.user.id}).populate("categoryId")
    res.status(200).send(history)
}

async function getTotalBalance(req, res) {
    const user = await userModel.findById(req.user.id)
    const balance = user.balance
    res.status(200).send({message: `Your accaount balance is ${balance}!`})
}

async function getOneById (req, res){
    const transactionId = req.params.id
    const history  = await historyModel.findOne({_id: transactionId, userId: req.user.id}).populate("categoryId")
    res.status(200).send(history)
}

async function addTransaction(req, res) {
    const data = await transactionValidation.validateAsync(req.body)

    const user = await userModel.findById(req.user.id)

    const {amount, type}  = data
    if (type === "expense" && amount > user.balance) {
        return res.status(400).send({message: "Insufficient balance! "})
    }
    type === "income"? user.balance += amount : user.balance -= amount
    console.log(typeof amount);
    
    await user.save()
    const newTransaction = new historyModel({
        ...data, userId: req.user.id
    })
    await newTransaction.save()
    res.status(201).send({message: "Transaction reported", balance: user.balance})
}

async function editTransaction(req, res){
    const transactionId = req.params.id
    const data = await transactionUpdateValidation.validateAsync(req.body)
    const {amount, type}  = data
    const transactionToUpdate = await historyModel.findOne({_id:transactionId, userId:req.user.id})
    if (!transactionToUpdate) {
        return res.status(404).send({message: "Transaction not found!"})
    }

    const user = await userModel.findById(req.user.id)
    transactionToUpdate.type === "income" ? user.balance -= transactionToUpdate.amount : user.balance += transactionToUpdate.amount
    type === "income" ? user.balance += amount : user.balance -= amount

    await user.save()
    const updatedTransaction = await historyModel.findByIdAndUpdate(transactionId, data, {new: true})
    res.status(200).send({message: "Transaction successfully updated!", updatedTransaction})
}

async function deleteTransaction(req, res) {
    const transactionId = req.params.id
    const transactionToDelete = await  historyModel.findOne({_id:transactionId, userId: req.user.id})
    if (!transactionToDelete) {
        return res.status(404).send({ message: "Transaction not found." })
    }
    const {type, amount} = transactionToDelete
    const user = await userModel.findById(req.user.id)
    type === "income" ? user.balance -= amount : user.balance += amount

    await user.save()
    await historyModel.findByIdAndDelete(transactionId);
    res.status(200).send({ message: "Transaction successfully deleted!", balance: user.balance})

}

module.exports = {
    getAllTransactions, getTotalBalance, getOneById, addTransaction, editTransaction, deleteTransaction
}