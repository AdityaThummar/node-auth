const Joi = require("joi")

const registerUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required("Please enter password")
})

module.exports = { registerUserSchema }