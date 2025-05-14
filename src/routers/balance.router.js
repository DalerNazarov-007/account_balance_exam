const express = require("express")
const authenticateToken = require("../middleware/auth.middleware")
const { getAllTransactions, getOneById, addTransaction, editTransaction, deleteTransaction, getTotalBalance } = require("../controllers/balance.controller")

const balanceRouter = express.Router()

balanceRouter.get("/", authenticateToken, getAllTransactions),
balanceRouter.get("/totalBalance", authenticateToken, getTotalBalance)
balanceRouter.get("/:id", authenticateToken, getOneById),
balanceRouter.post("/", authenticateToken, addTransaction),
balanceRouter.put("/:id", authenticateToken, editTransaction),
balanceRouter.delete("/:id", authenticateToken, deleteTransaction)

module.exports = balanceRouter

