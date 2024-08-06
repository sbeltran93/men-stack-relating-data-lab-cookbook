// controllers/foods.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

const ensureAuthenticated = (req, res, next) => {
    if (req.session && req.session.user._id) {
        return next();
    }
    res.redirect('/login')
};

// router logic will go here - will be built later on in the lab

module.exports = router;


router.get('/', (req, res) => {
    res.render('foods/index.ejs')
  });
  
router.get('/new', (req, res) => {
    res.render('foods/new.ejs')
  });
  
  
router.post('/', async (req, res)=> {
      try {
        const foundUser = await User.findById(req.session.user._id)
        foundUser.pantry.push(req.body)
        await foundUser.save()
        res.redirect(`users/${foundUser._id}/foods`)
      } catch (error) {
          res.redirect('/')
      }
  })  

  router.get('/pantry', ensureAuthenticated, async (req, res) => {
    try {
        const userId = req.session.user._id;
        const user = await User.findById(user._id);
        
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.locals.foundPantry = user.pantry;
        res.render('/views/pantry/index.ejs', {
            foundPantry: user.pantry
        });
    } catch (error) {
        res.status(400).json({ msg: error.message });
        
    }
  })