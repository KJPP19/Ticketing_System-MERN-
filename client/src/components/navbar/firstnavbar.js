import React, {useState} from 'react';
import "./firstnavbar.css";
import PopupTicketForm from '../popups/ticketform/ticketForm';

function FirstNavBar () {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <div>
            <nav className="first-navbar-container">
                <ul className="menu-items">
                    <li><a href='#'>Ticket List</a></li>
                    <li>
                        <button className="create-ticket-btn" onClick={openPopup}>Create Ticket</button>
                    </li>
                </ul>
            </nav>
            <PopupTicketForm isPopupOpen={isPopupOpen} closePopup={closePopup} />
        </div>
    );
};

export default FirstNavBar;