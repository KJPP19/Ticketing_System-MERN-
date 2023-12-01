const { ticketSchema } = require("../schema/ticketSchema");

const validateTicket = (req, res, next) => {
    const validateResult = ticketSchema.validate(req.body, {abortEarly: false});

    if(validateResult.error) {
        const errorMessages = validateResult.error.details.map(error => error.message);
        return res.status(400).json({errors: errorMessages})
    }

    next();
};

module.exports = { validateTicket };
