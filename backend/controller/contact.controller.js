const Contact = require("../models/Contact") 

const contact = async (req, res) =>{
    try {
        const contacts = await Contact.find();
        return res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    contact
}