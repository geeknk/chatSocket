const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const connectDB = require('./database/db'); // Import the DB connection
const Message = require('./models/Message'); // Import the Message model
const Contact = require('./models/Contact'); // Import the Contact model
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

app.get('/api/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/messages', async (req, res) => {
    const { text, sender, receiver } = req.body;
    const newMessage = new Message({ text, sender, receiver });

    try {
        await newMessage.save();
        res.json(newMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('sendMessage', async (message) => {
        const { text, sender, receiver } = message;

        // Save message to the database
        await new Message({ text, sender, receiver }).save();
        io.emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
