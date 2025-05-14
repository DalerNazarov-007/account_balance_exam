const express = require("express")
const authenticateToken = require("../middleware/auth.middleware")
const { getAllCategories, getOneById, createCategory, editCategory, deleteCategory } = require("../controllers/category.controller")

const categoriesRouter = express.Router()

categoriesRouter.get("/", authenticateToken, getAllCategories),
categoriesRouter.get("/:id", authenticateToken, getOneById),
categoriesRouter.post("/", authenticateToken, createCategory),
categoriesRouter.put("/:id", authenticateToken, editCategory),
categoriesRouter.delete("/:id", authenticateToken, deleteCategory)

module.exports = categoriesRouter

