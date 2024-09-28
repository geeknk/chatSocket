const Message = require("../models/Message") 

const getMessage = async (req, res) =>{
    try {
        const contacts = await Message.find();
        return res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const saveMessage = async (req, res) =>{
    const { text, sender, receiver } = req.body;
    const newMessage = new Message({ text, sender, receiver });

    try {
        await newMessage.save();
        res.json(newMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getMessage,
    saveMessage
}