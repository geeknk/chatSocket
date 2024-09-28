const userService = require('../services/user.service')
const isUser = async (req, res, next)=>{
    try {
        const user = await userService.isUser(req.body.email)
        console.log(user);
        
        if(user) return res.status(500).json({message:"email already exist"})
        
        return next()
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports={
    isUser
}