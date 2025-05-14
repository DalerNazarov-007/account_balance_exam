const jwt = require("jsonwebtoken")
const { SECRET_KEY_ACCESS, SECRET_KEY_REFRESH } = require("../configuration/configuration")
const express = require("express")
const { registerValdation, loginValidation } = require("../validations/auth.validation")
const userModel = require("../models/users.model")


async function registerNewUser(req, res) {
    const data = await registerValdation.validateAsync(req.body)

    const existingNumber = await userModel.findOne({phone: data.phone})
    if (existingNumber) {
        return res.status(400).send({message: "User with this phone already exists"})
    }
    const user = new userModel(data)
    await user.save()

    const accessToken = jwt.sign({id: user._id, role: user.role}, SECRET_KEY_ACCESS, {
        expiresIn: "30m"
    })
    const refreshToken = jwt.sign({id: user._id, role: user.role}, SECRET_KEY_REFRESH, {
        expiresIn: "24h"
    })
    
    res.send({data: user, accessToken, refreshToken})

}

async function loginUser(req, res, next) {
    const data = await loginValidation.validateAsync(req.body)

    const { phone, password } = data
    if (!phone || !password) {
        return res.status(400).send("Phone and password are required");
    }

    const user = await userModel.findOne({ phone });

    if (!user) {
        return res.status(401).send("Unauthorized: User not found");
    }

    if (user.password !== password) {
        return res.status(403).send("Unauthorized: Incorrect password");
    }

    const accessToken = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY_ACCESS, {
        expiresIn: "30m"
    });

    const refreshToken = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY_REFRESH, {
        expiresIn: "24h"
    });

    res.send({ accessToken, refreshToken });
}

module.exports = {
    registerNewUser,
    loginUser
}