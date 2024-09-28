const User = require('../models/User')

const isUser = async(email)=>{
    console.log(email);
    
    return await User.findOne({email});   
}

const getUsers = async()=>{
    return await User.find();   
}

module.exports={
    isUser,
    getUsers
}