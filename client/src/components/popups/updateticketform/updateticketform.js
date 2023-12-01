import axios from 'axios';
import React, {useState, useEffect} from 'react';
import "./updateticketform.css";

const UpdateTicketPopup = ({isOpen, onClose, ticket}) => {
    const [updatedTicket, setUpdatedTicket] = useState({
        ticketTitle: '',
        ticketDescription: '',
        priority: '',
    });

    useEffect(() => {
        if(ticket) {
            setUpdatedTicket({
                ticketTitle: ticket.ticketTitle,
                ticketDescription: ticket.ticketDescription,
                priority: ticket.priority,
            });
        }
    }, [ticket]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUpdatedTicket((prevTicket) => ({
            ...prevTicket,
            [name]: value,
        }));
    };

    const handleUpdate = async() => {
        try {
            const response = await axios.put(`http://127.0.0.1:4000/api/v1/tickets/${ticket._id}`, updatedTicket);
            if(response.status === 200) {
                console.log(response);
                onClose();
                window.location.reload(false);
            }
        } catch (error) {
            console.error('failed to update ticket', error);
        }
    };

    return (
        <div>
            <div className={`update-popup-overlay ${isOpen ? 'open': ''}`}>
                <div className={`update-popup-container ${isOpen ? 'open': ''}`}>
                    <div className='update-popup-content'>
                        <div className='edit-header-and-close-btn'>
                            <div className='update-popup-header'>Edit Ticket</div>
                            <button type='button' className='edit-close-btn' onClick={onClose}>close</button>
                        </div>
                        <form>
                            <label>Ticket Title</label>
                            <input type='text' className='edit-ticket-title' value={updatedTicket.ticketTitle} onChange={handleInputChange}/>
                            <label>Ticket Description:</label>
                            <input type='text' className='edit-ticket-description' value={updatedTicket.ticketDescription} onChange={handleInputChange}/>
                            <label>Priority:</label>
                            <select className='edit-ticket-dropdown' value={updatedTicket.priority} onChange={handleInputChange}>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                                <option value="urgent">urgent</option>
                            </select>
                            <button type='button' className='edit-update-btn' onClick={handleUpdate}>Update ticket</button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default UpdateTicketPopup;