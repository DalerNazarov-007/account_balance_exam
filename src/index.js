const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routers/auth.router');
const usersRouter = require('./routers/users.router');
const categoriesRouter = require('./routers/category.router');
const balanceRouter = require('./routers/balance.router');

const app = express();

mongoose.connect('mongodb://localhost:27017/Bank_balance').then(() => {
    console.log('Connected to MongoDB successfully');
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter)
app.use("/users", usersRouter)
app.use("/categories", categoriesRouter)
app.use("/transactions", balanceRouter)

app.use((error, req, res, next) => {

    if (error.name === "ValidationError") {
        return res.status(400).send({ message: error.message })
    }
    else{
        return res.status(500).send({ message: "Internal Server Error" })
        
    }
})

app.listen(1717, () => {
    console.log('Server is running on port 1717');
})