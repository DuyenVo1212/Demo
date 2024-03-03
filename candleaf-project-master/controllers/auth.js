const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const register = async(req, res) => {   
    try {
        
        const user = await User.create(req.body)
        
        const token = jwt.sign(
            { userId: user._id, userName: user.name },
                process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_LIFETIME,
            })

        res.status(200).json({user, token})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const login = async(req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(500).json({msg: 'please prove email and password'})
    }
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(500).json({msg: 'Invalid user'})
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        return res.status(500).json({msg:'Invalid Credentials'})
    }

    const token = jwt.sign(
        { userId: user._id, userName: user.name },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFETIME,
        })
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    res.status(200).json({ user: { name: user.name }, token, decoded })
}

const forgotPassword = async(req, res) => {
    res.send("user forgot password")
}

const resetPassword = async(req, res) => {
    res.send("user reset password")
}

module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword
}