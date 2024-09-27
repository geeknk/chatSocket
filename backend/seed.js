// backend/seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Contact = require('./models/Contact'); // Import the Contact model

dotenv.config();

const seedContacts = async () => {
    await mongoose.connect(process.env.MONGO_URI);

    await Contact.deleteMany(); // Clear existing contacts

    const contacts = [
        { name: 'Alice' },
        { name: 'Bob' },
        { name: 'Charlie' },
        { name: 'David' },
    ];

    await Contact.insertMany(contacts);
    console.log('Contacts seeded!');
    mongoose.connection.close();
};

seedContacts();
