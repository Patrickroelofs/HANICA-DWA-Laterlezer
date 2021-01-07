/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const mongoose = require('mongoose');
const User = require('../models/user');
const userData = require('./data.json');

// Make a connection with database
mongoose.connect('mongodb://localhost:27017/reader', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

// Get reference to database
const db = mongoose.connection;

// Handle connection errors
db.on('error', console.error.bind(console, 'connection error:'));

const insertData = async () => {
  try {
    await User.insertMany(userData);
    console.log('Done!');
    return;
  } catch (e) {
    throw new Error(e);
  }
};

db.once('open', async () => {
  console.info('Connection successful!');

  // Drop the existing collection before making a new one
  if (db.collection('users')) {
    db.dropCollection('users', (err) => {
      if (err) {
        console.error(`Error delete existing collection: ${err}`);
        mongoose.disconnect();
      } else {
        console.info('Delete existing collection success!');
        insertData();
      }
    });
  }
});
