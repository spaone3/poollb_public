//somehow collection named players is being created
//When there is no collection create line in the code?
//Ok so the models players.js file is creating it
//not sure how it gets the name players when it isn't typed there



const mongoose = require("mongoose");
const Player = require('./models/players'); // Adjust the path to your Player model
const fs = require('fs');
require('dotenv').config();


async function readPlayerNamesFromFile() {
  return new Promise((resolve, reject) => {
    fs.readFile('./public/players.csv', 'utf8', (error, data) => {
      if (error) {
        console.error('Error reading CSV file:', error);
        reject(error);
        return;
      }

      // Split the data by newline characters to get an array of names
      const namesArray = data.split('\n').map(name => name.trim());

      resolve(namesArray);
    });
  });
}

const initializeDatabase = async () => {
  try {
    console.log('Before connecting to mongodb');

    const url = process.env.MONGODB_URI;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });


    const db = mongoose.connection.db;
    const collection = db.collection('players');
    const collInfo = await db.listCollections({ name: 'players' }).next();

    await collection.createIndex({ name: 1 }, { unique: true });


    
    const playerNames = await readPlayerNamesFromFile();
    //console.log('Names Array:', playerNames);


    const playersData = playerNames.map(name => ({ name, rating: 1000 }));



    // Use bulk insertion for efficiency
    const bulk = collection.initializeUnorderedBulkOp();
    playersData.forEach(player => {
      bulk.insert(player);
    });

    // Execute the bulk insert operation
    try {
      await bulk.execute();
      console.log('Players added');
    } catch (error){
      if(error.code === 11000){
        //Duplicate key error,
        console.log('Duplicate player name, skipped')
      } else {
        throw error;
      }
    }






  } catch (error) {
    console.error('Error connecting to mongodb:', error);
  }
};



module.exports = initializeDatabase;
