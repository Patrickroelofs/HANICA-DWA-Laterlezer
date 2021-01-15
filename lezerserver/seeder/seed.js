/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const mongoose = require('mongoose');
const User = require('../models/user');
const userData = require('./data.json');

// Make a connection with database: uncomment the second line and comment the first line to seed the readerTestDB
mongoose.connect('mongodb://localhost:27017/reader', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
// mongoose.connect('mongodb://localhost:27017/readerTestDB', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

// Get reference to database
const db = mongoose.connection;

// Handle connection errors
db.on('error', console.error.bind(console, 'connection error:'));

const insertData = async () => {
  try {
    await User.insertMany(userData);
    console.log('Seeding done!');
    return;
  } catch (e) {
    throw new Error(e);
  }
};

db.once('open', async () => {
  console.info('Seeder connection successful!');
  try {
    const count = await db.collection('users').countDocuments({ userName: 'testuser' });
    if (count !== 0) {
      await db.dropCollection('users');
      await insertData();
    } else {
      await insertData();
    }
  } catch (e) {
    console.error(e);
  } finally {
    console.log('Seeder connection closed!');
    await mongoose.disconnect();
  }
});
