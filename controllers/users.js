// controllers/users.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');







router.get('/users', async (req, res) => {
    try {
        const foundUser = await User.find({})
        res.render('users/index.ejs', {
            user: foundUser
        })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
    
})










module.exports = router;