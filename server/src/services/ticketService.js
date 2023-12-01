const Ticket = require("../models/ticketModel");
const mongoose = require("mongoose");
const { ApiError } = require("../middleware/customerror");

const validateTicketId = (ticketId) => {
    if(!mongoose.Types.ObjectId.isValid(ticketId)) {
        throw new ApiError(400, "invalid ticketId", `${ticketId} is not a valid Id`);
    }
};

const createTicketData = async (ticketData) => {
    const {ticketTitle, ticketDescription, priority} = ticketData;
    const validPriorities = ["low", "medium", "high", "urgent"];
    if(!validPriorities.includes(priority)){
        throw new ApiError(400, "invalid priority", `${priority} does not exist`);
    }
    const ticket = await Ticket.create({
        ticketTitle,
        ticketDescription,
        priority,
    });
    return ticket;
};

const getTicketsData = async (priority , sortOrder) => {
    const filter = priority ? { priority } : {};
    const sort = sortOrder ? { priority: parseInt(sortOrder)} : {};
    const ticket = await Ticket.find(filter).sort(sort);
    return ticket;
};

const getTicketById = async (ticketId) => {
    validateTicketId(ticketId);
    const ticket = await Ticket.findOne({_id:ticketId});
    if(!ticket) {
        throw new ApiError(404, "ticket id not found", "ticket does not exist");
    }
    return ticket;
};

const updateTicketData = async (ticketData, ticketId) => {
    validateTicketId(ticketId);
    const ticket =await Ticket.findByIdAndUpdate(ticketId, ticketData, {new:true});
    if(!ticket) {
        throw new ApiError(400, "ticket update error", "update error due to ticket Id does not exist");
    }
    return ticket;
};

const deleteTicket = async (ticketId) => {
    validateTicketId(ticketId);
    const ticket = await Ticket.findByIdAndDelete(ticketId);
    if(!ticket) {
        throw new ApiError(400, "ticket delete error", "delete error due to ticket Id does not exist");
    }
    return ticket;
};

module.exports = { 
                    createTicketData,
                    getTicketById,
                    getTicketsData,
                    updateTicketData,
                    deleteTicket  
                };