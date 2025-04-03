const mongoose = require('mongoose');
const Player = require('../models/players'); // Adjust the path based on your project structure

console.log('Before connecting to mongodb');

require('dotenv').config();
console.log('Before connecting to mongodb');

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const resetPlayerRatings = async () => {
  try {
    const players = await Player.find({}); // Retrieve all players

    // Iterate through each player and reset the rating to 1000
    for (const player of players) {
      player.rating = 1000; // Reset rating to 1000
      await player.save(); // Save the updated player
    }

    console.log('Player ratings reset completed.');
  } catch (error) {
    console.error('Error resetting player ratings:', error);
  } finally {
    mongoose.disconnect(); // Close the connection when done
  }
};

resetPlayerRatings();
