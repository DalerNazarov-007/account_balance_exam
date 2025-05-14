const express = require("express")
const authenticateToken = require("../middleware/auth.middleware")
const authorizeAdmin = require("../middleware/admin.middleware")
const { getUsers, getUserById, userEdit } = require("../controllers/users.controller")

const usersRouter = express.Router()

usersRouter.get("/", authenticateToken, authorizeAdmin, getUsers),
usersRouter.get("/:id", authenticateToken, authorizeAdmin, getUserById),
usersRouter.put("/:id", authenticateToken, authorizeAdmin, userEdit)

module.exports = usersRouter
