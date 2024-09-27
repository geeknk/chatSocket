// frontend/src/components/ContactList.jsx
import React, { useEffect, useState } from 'react';

const ContactList = ({ onSelectContact }) => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchContacts = async () => {
            const response = await fetch('http://localhost:4000/api/contacts');
            const data = await response.json();
            setContacts(data);
        };

        fetchContacts();
    }, []);

    return (
        <div className="sidebar">
            {contacts.map((contact, index) => (
                <div key={index} className="contact" onClick={() => onSelectContact(contact.name)}>
                    {contact.name}
                </div>
            ))}
        </div>
    );
};

export default ContactList;
