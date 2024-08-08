// controllers/foods.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');


// router logic will go here - will be built later on in the lab

module.exports = router;


router.get('/', async (req, res) => {
        const userId = req.session.user._id;
        const user = await User.findById(userId);
        res.render('foods/index.ejs', {   
            foundPantry: user.pantry
        })
  });
  
router.get('/new', (req, res) => {
    res.render('foods/new.ejs')
  });
  
  
router.post('/', async (req, res)=> {
      try {
        const foundUser = await User.findById(req.session.user._id)
        foundUser.pantry.push(req.body)
        console.log(foundUser)
        await foundUser.save()
        console.log('done')
        res.redirect(`/users/${foundUser._id}/foods`)
      } catch (error) {

      }
  })

  router.delete('/:id', async (req, res) => {
    try {
        const userId = req.session.user._id;
        const itemId = req.params.id
        const user = await User.findById(userId);
        if (!user) {
            return res.redirect('/')
        }
        user.pantry.pull({ _id: itemId })
        await user.save()
        res.redirect(`/users/${userId}/foods`)
        }   catch (error) {
        console.error(error)
        res.redirect('/')
    }
})

