import React, {useRef, useState} from 'react';
import "./ticketForm.css";
import axios from 'axios';

const PopupTicketForm = ({isPopupOpen, closePopup}) => {

    const titleRef = useRef('');
    const descriptionRef = useRef('');
    const priorityRef = useRef('');
    const [formError, setFormError] = useState('');

    //implement auto refresh in this function
    const handleSubmit = async (e) => {
        e.preventDefault();
        const ticketFormData = {
            ticketTitle: titleRef.current.value,
            ticketDescription: descriptionRef.current.value,
            priority: priorityRef.current.value,
        };
        try {
            const response = await axios.post("http://127.0.0.1:4000/api/v1/tickets", ticketFormData);
            if(response.status === 201) {
                console.log("ticket submitted", response.data);
                closePopup();
                //refresh functionality
                window.location.reload(false);
            }
        } catch(error) {
            console.error("unable to submit ticket", error);
            if(error.response && error.response.data && error.response.data.errors){
                setFormError(error.response.data.errors);
            } else {
                setFormError(["unexpected error occured"]);
            }
        }
    };

    const resetFormErrors = () => {
        setFormError('');
    }


    return(
        <div>
            <div className={`overlay ${isPopupOpen ? 'open': ''}`}/>
                <div className={`popup ${isPopupOpen ? 'open': ''}`}>
                    <div className='popup-content'>
                        <div className='header-and-close'>
                            <div className='create-ticket-header'>create new ticket</div>
                            <button className='close-btn' onClick={closePopup}>Close</button>
                        </div>
                        {formError.length > 0 && (
                            <div className='form-error-messages'>
                                {formError.map((error, index) => (
                                    <div key={index} className='error-message'>
                                        {error}
                                    </div>
                                ))}
                            </div>
                        )}
                        <form className='ticket-form' onSubmit={handleSubmit}>
                            <div>Ticket Title</div>
                            <input type='text' ref={titleRef} onChange={resetFormErrors} placeholder='enter ticket' className='title-textfield'/>
                            <div>Ticket Description</div>
                            <input type='text' ref={descriptionRef} placeholder='enter description' className="description-textfield"/>
                            <div>Priority</div>
                            <select ref={priorityRef} className='priority-dropdown'>
                                <option value="">Select Priority</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                                <option value="urgent">urgent</option>
                            </select>
                            <div>
                                <button type='submit' className='submit-ticket-btn'>Submit Ticket</button>
                            </div>                   
                        </form>
                    </div>
                </div>
        </div>
    );
};

export default PopupTicketForm;