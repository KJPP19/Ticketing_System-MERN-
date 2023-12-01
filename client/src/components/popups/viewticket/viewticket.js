import React from "react";
import "./viewticket.css";

const ViewTicket = ({isOpen, onClose, ticket}) => {
    
    return (
            <div>
                <div className={`view-ticket-overlay ${isOpen ? 'open': ''}`}>
                    <div className={`view-ticket-container ${isOpen ? 'open': ''}`}>
                        <div className="view-ticket-content">
                            <div className="title-and-close-btn">
                                <div className="ticket-name-header">{ticket ? ticket.ticketTitle : ''}</div>
                                <button className="view-ticket-close-btn" onClick={onClose}>Close</button>
                            </div>
                            <div>Description: {ticket ? ticket.ticketDescription : ''}</div>
                            <div>Priority: {ticket ? ticket.priority : ''}</div>
                            <div>created at: {ticket ? new Date(ticket.createdAt).toLocaleString() : ''}</div>
                            <div>updated at: {ticket ? new Date(ticket.updatedAt).toLocaleString() : ''}</div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default ViewTicket;