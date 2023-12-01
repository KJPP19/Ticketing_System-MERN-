const express = require("express");
const router = express.Router();
const ticketController = require("../controller/ticketController");
const {validateTicket} = require("../middleware/validateticket");

router.get("/", ticketController.getTickets);
router.post("/", validateTicket, ticketController.createTicket);
router.get("/:ticketId", ticketController.getTicket);
router.put("/:ticketId", validateTicket, ticketController.updateTicket);
router.delete("/:ticketId", ticketController.removeTicket);

module.exports = router;