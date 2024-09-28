const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },    
    mobile: {
        type: String,
        required: true,
        match: /^\d{10}$/, // Example for a 10-digit mobile number
    },
    password: {
        type:String,
        required:true
    },
},
{timestamp: true});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next(); // Only hash the password if it has been modified

    try {
        const salt = await bcrypt.genSalt(10); // Generate a salt
        this.password = await bcrypt.hash(this.password, salt); // Hash the password
        next(); // Proceed to save the document
    } catch (error) {
        next(error); // Pass the error to the next middleware
    }
});

module.exports = mongoose.model('User', userSchema);
