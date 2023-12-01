const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
    {
        ticketTitle: {
            type: String,
            required: true,
        },
        ticketDescription: {
            type: String,
            required: true,
        },
        priority: {
            type: String,
            required: true,
            enum: ["low", "medium", "high", "urgent"],
        },
    }, {timestamps: true},
);

module.exports = mongoose.model("Ticket", ticketSchema);