const Joi = require("joi");

const ticketSchema = Joi.object({
    ticketTitle: Joi.string().min(3).max(50).required().messages({
        'string.base': 'title must be string',
        'string.empty': 'title should not be empty',
        'string.min': 'title should contain atleast 3 characters',
        'string.max': 'title should not exceed 20 characters',
        'any.required': 'ticket title is required'
    }),
    ticketDescription: Joi.string().min(5).max(100).required().messages({
        'string.base': 'description must be string',
        'string.empty': 'description should not be empty',
        'string.min': 'description should contain atleast 3 characters',
        'string.max': 'description should not exceed 100 characters',
        'any.required': 'ticket description is required'
    }),
    priority: Joi.string().required().messages({
        'string.base': 'priority must be string',
        'any.required': 'priority is required',
        'string.empty': "priority should not be empty",
    }),
});

module.exports = { ticketSchema };