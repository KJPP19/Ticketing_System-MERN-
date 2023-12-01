import "./ticketlist.css";
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ViewTicket from "../popups/viewticket/viewticket";
import UpdateTicketPopup from "../popups/updateticketform/updateticketform";

function TicketList () {
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [isViewPopup, setIsViewPopup] = useState(false);
    const [isUpdatePopup, setIsUpdatePopup] = useState(false);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:4000/api/v1/tickets");
                setTickets(response.data);
            } catch (error) {
                console.error('failed to fetch tickets', error);
            }
        };

        fetchTickets();

    }, []);

    const handleEdit = async(ticketId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:4000/api/v1/tickets/${ticketId}`);
            console.log(response.data);
            setSelectedTicket(response.data);
            setIsUpdatePopup(true);
        } catch (error) {
            console.error("cannot fetch ticket", error);
        }
    };

    const handleView = async(ticketId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:4000/api/v1/tickets/${ticketId}`);
            console.log(response.data);
            setSelectedTicket(response.data);
            setIsViewPopup(true);
        } catch (error) {
            console.error("cannot fetch ticket", error);
        }
    };

    const handleDelete = async(ticketId) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:4000/api/v1/tickets/${ticketId}`);
            if(response.status === 200){
                console.log(response.data);
                window.location.reload(false);
            }
        } catch (error) {
            console.error("cannot delete ticket", error);
        }
    };

    const handleCloseViewPopup = () => {
        setSelectedTicket(null);
        setIsViewPopup(false);
    };

    const handleCloseUpdatePopup = () => {
        setSelectedTicket(null);
        setIsUpdatePopup(false);
    }

    return (
        <div>
            <div className="ticket-list-header">Ticket List</div>
            <div className="ticket-table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>priority</th>
                            <th>created at</th>
                            <th>updated at</th>
                            <th>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map((ticket) => (
                            <tr key={ticket._id}>
                                <td>{ticket.ticketTitle}</td>
                                <td>{ticket.ticketDescription}</td>
                                <td>{ticket.priority}</td>
                                <td>{new Date(ticket.createdAt).toLocaleString()}</td>
                                <td>{new Date(ticket.updatedAt).toLocaleString()}</td>
                                <td>
                                    <button onClick={() => handleView(ticket._id)}>view</button>
                                    <button onClick={()=> handleEdit(ticket._id)}>edit</button>
                                    <button onClick={() => handleDelete(ticket._id)}>delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ViewTicket isOpen={isViewPopup} onClose={handleCloseViewPopup} ticket={selectedTicket}/>
            <UpdateTicketPopup isOpen={isUpdatePopup} onClose={handleCloseUpdatePopup} ticket={selectedTicket}/>
        </div>
    );
}

export default TicketList;