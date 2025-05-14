const express = require("express")
const categoryModel = require("../models/category.model")
const { categoryUpdateValidation, categoryValidation } = require("../validations/category.validation")

async function getAllCategories (req, res){
    const categories  = await categoryModel.find({userId: req.user.id})
    res.status(200).send(categories)
}

async function getOneById (req, res){
    const id = req.params.id
    const category  = await categoryModel.findById(id)
    res.status(200).send(category)
}

async function createCategory(req, res) {
    const data = await categoryValidation.validateAsync(req.body)
    const newCategory = new categoryModel({
        ...data, userId: req.user.id
    })
    await newCategory.save()
    res.status(201).send(newCategory)
}

async function editCategory(req, res){
    const id = req.params.id
    const data = await categoryUpdateValidation.validateAsync(req.body)
    const categoryToUpdate = await categoryModel.findById(id)
    if (!categoryToUpdate) {
        return res.status(404).send({message: "Category not found!"})
    }if (categoryToUpdate.userId.toString() !== req.user.id) {
        return res.status(403).send({message: "Unauthorized!"})
    }
    const updatedCategory = await categoryModel.findByIdAndUpdate(id, data, {new: true})
    res.status(200).send({message: "Category successfully updated!", updatedCategory})
}

async function deleteCategory(req, res) {
    const id = req.params.id
    const categoryToDelete = await categoryModel.findById(id)
        if (!categoryToDelete) {
            return res.status(404).send({ message: "Category not found." })
        }if (categoryToDelete.userId.toString() !== req.user.id) {
        return res.status(403).send({message: "Unauthorized!"})
    }
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({ message: "Category successfully deleted!" })

}

module.exports = {
    getAllCategories, getOneById, createCategory, editCategory, deleteCategory
}