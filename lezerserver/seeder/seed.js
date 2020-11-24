/* eslint no-console: ["off", { allow: ["warn"] }] */
const mongoose = require('mongoose');
const Article = require('../models/article');
const Tag = require('../models/tag');
const User = require('../models/user');
const users = require('./dummyUsers');
const articles = require('./dummyArticles');
const tags = require('./dummyTags');

// make a connection
mongoose.connect('mongodb://localhost:27017/reader', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

// get reference to database
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', async () => {
  console.info('Connection Successful!');

  // drops the existing collection before making a new one
  if (db.collection('users')) {
    await db.dropCollection('users', (err) => {
      if (err) {
        console.error(`error delete existing collection: ${err}`);
      } else {
        console.info('delete existing collection success');
      }
    });
  }

  for(const user of users) {
    const newUser = new User(user);
    for(const tag of tags) {
      newUser.createTag([new Tag(tag)]);
    }
    for (const article of articles) {
      newUser.articles.push(new Article(article));
    }
    await newUser.save();
  }
  console.log('DONE');
  mongoose.disconnect();
});
