// controllers/users.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');





router.get('/', async (req, res) => {
    try {
        const foundUsers = await User.find();
        res.render('users/index.ejs', {
            users: foundUsers
         })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
    
})

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const pantryItems = await pantry.find({ userId: user._id });
        res.render('users/show.ejs', {
            pantryItems
        })
    } catch (error) {
        res.status(400).json({ msg: error.message }) 
    }
})


module.exports = router;