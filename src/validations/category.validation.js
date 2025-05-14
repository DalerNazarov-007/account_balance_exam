const Joi = require("joi")

const categoryValidation = Joi.object({
    name: Joi.string().required(),
    photo: Joi.string().required(),
    type: Joi.string().valid("income", "expense").required(),
    userId: Joi.forbidden()
})

const categoryUpdateValidation = Joi.object({
    name: Joi.string(),
    photo: Joi.string(),
    type: Joi.string().valid("income", "expense"),
    userId: Joi.forbidden()
})

module.exports = {categoryUpdateValidation, categoryValidation }