const { asyncHandler } = require("../utils/trycatchblock");
const {
    createTicketData,
    getTicketById,
    getTicketsData,
    updateTicketData,
    deleteTicket,
} = require("../services/ticketService");

const createTicket = asyncHandler(async(req, res) => {
    const newTicket = await createTicketData(req.body);
    res.status(201).json(newTicket);
});

const getTickets = asyncHandler(async(req, res) => {
    const { priority, sortOrder } = req.query;
    const ticket = await getTicketsData(priority, sortOrder);
    res.status(200).json(ticket);
});

const getTicket = asyncHandler(async(req, res) => {
    const ticket = await getTicketById(req.params.ticketId);
    res.status(200).json(ticket);
});

const updateTicket = asyncHandler(async(req, res) => {
    const ticket = await updateTicketData(req.body, req.params.ticketId);
    res.status(200).json(ticket);
});

const removeTicket = asyncHandler(async(req, res) => {
    const ticket = await deleteTicket(req.params.ticketId);
    res.status(200).json({message:"deleted succesfully"});
});

module.exports = {
    createTicket,
    getTickets,
    getTicket,
    updateTicket,
    removeTicket,
};