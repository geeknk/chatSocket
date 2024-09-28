const User = require("../models/User")
const userService = require("../services/user.service")

const signup = async (req, res) =>{
    try {
        const newUser = await User.create(req.body);
        return res.status(200).json({message:"user created successfully", newUser});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const signin = async (req, res) =>{
    try {
        const accessToken = await generateToken(req.user);
        return res.status(200).send({message:"You are logged in successfully", "accessToken":accessToken});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getUsers = async (req, res) =>{
    try {
        const users = await userService.getUsers();
        console.log(users);
        
        return res.status(200).send({message:"All Users", users});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    signup,
    signin,
    getUsers
}