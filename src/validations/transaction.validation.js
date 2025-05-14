const Joi = require("joi")

const transactionValidation = Joi.object({
    amount: Joi.number().required(),
    type: Joi.string().valid("income", "expense").required(),
    categoryId: Joi.string().required(),
    userId: Joi.forbidden()
})

const transactionUpdateValidation = Joi.object({
    amount: Joi.number(),
    type: Joi.string().valid("income", "expense"),
    categoryId: Joi.string(),
    userId: Joi.forbidden()
})

module.exports = {transactionValidation, transactionUpdateValidation}