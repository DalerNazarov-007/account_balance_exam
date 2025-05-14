const express = require("express")
const userModel = require("../models/users.model")
const { userValidationUpdate } = require("../validations/auth.validation")

async function userEdit(req, res) {
    const id = req.params.id
    const data = await userValidationUpdate.validateAsync(req.body)
    const updatedUser = await userModel.findByIdAndUpdate(id, data, {new: true})
    res.status(200).send({message: "User data updated!", updatedUser })
}

async function getUsers(req, res) {
    const users = await userModel.find()
    res.status(200).send(users)
}
async function getUserById(req, res) {
    const id = req.params.id
    const user = await userModel.findById(id)
    res.status(200).send(user)
}

module.exports = {
    userEdit, getUsers, getUserById
}