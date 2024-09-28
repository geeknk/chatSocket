const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const connectDB = require('./database/db'); // Import the DB connection
const Message = require('./models/Message'); // Import the Message model
const Contact = require('./models/Contact'); // Import the Contact model
const dotenv = require('dotenv');
const contactRouter = require('./route/contact.route')
const messageRouter = require('./route/message.route')
const userRouter = require('./route/user.route')

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

app.use('/api',contactRouter)
app.use('/api',messageRouter)
app.use('/user',userRouter)


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
