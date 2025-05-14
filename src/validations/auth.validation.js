const Joi = require("joi")

const registerValdation = Joi.object({
    fullname: Joi.string().min(3).max(100).required(),
    phone: Joi.number().integer().min(100000000).max(999999999).required(),
    password: Joi.string().min(8).required(),
    photo: Joi.string().required(),
    balance: Joi.number().required(),
    role: Joi.forbidden()
})

const loginValidation = Joi.object({
    phone: Joi.number().integer().min(100000000).max(999999999).required(),
    password: Joi.string().required()
})

const userValidationUpdate = Joi.object({
    fullname: Joi.string().min(3).max(100),
    phone: Joi.number().integer().min(100000000).max(999999999),
    password: Joi.string().min(8),
    photo: Joi.string()
})

module.exports = {
    registerValdation,
    loginValidation,
    userValidationUpdate
}