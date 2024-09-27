// frontend/src/App.jsx
import React, { useState } from 'react';
import ContactList from './components/contactList';
import Chat from './components/Chat';
import './App.css';

const App = () => {
    const [selectedContact, setSelectedContact] = useState('Alice');

    return (
        <div className="app">
            <ContactList onSelectContact={setSelectedContact} />
            <Chat selectedContact={selectedContact} />
        </div>
    );
};

export default App;
