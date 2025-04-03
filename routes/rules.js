const express = require('express');
const router = express.Router();
const Player = require('../models/players');
const Match = require('../models/matches');


router.get('/', async (req, res) => {
    try {
        res.render('rules');
    } catch (error) {
      console.error('Error:', error);
      // Handle the error and send an appropriate response
      res.status(500).send('Internal Server Error');
    }
  });


module.exports = router;