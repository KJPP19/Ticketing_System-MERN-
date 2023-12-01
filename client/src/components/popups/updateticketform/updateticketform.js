import axios from 'axios';
import React, {useState, useEffect} from 'react';
import "./updateticketform.css";

const UpdateTicketPopup = ({isOpen, onClose, ticket}) => {
    const [updatedTicket, setUpdatedTicket] = useState({
        ticketTitle: '',
        ticketDescription: '',
        priority: '',
    });
    const [editFormError, setEditFormError] =useState('');

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
        setEditFormError('');
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
            if(error.response && error.response.data && error.response.data.errors){
                setEditFormError(error.response.data.errors);
            } else {
                setEditFormError(["unexpected error occured"]);
            }
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
                        {editFormError.length > 0 && (
                            <div className='edit-form-error-messages'>
                                {editFormError.map((error, index) => (
                                    <div key={index} className='edit-error-message'>
                                        {error}
                                    </div>
                                ))}
                            </div>
                        )}
                        <form>
                            <label>Ticket Title</label>
                            <input type='text' name='ticketTitle' className='edit-ticket-title' value={updatedTicket.ticketTitle} onChange={handleInputChange}/>
                            <label>Ticket Description:</label>
                            <input type='text' name='ticketDescription' className='edit-ticket-description' value={updatedTicket.ticketDescription} onChange={handleInputChange}/>
                            <label>Priority:</label>
                            <select className='edit-ticket-dropdown' name='priority' value={updatedTicket.priority} onChange={handleInputChange}>
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