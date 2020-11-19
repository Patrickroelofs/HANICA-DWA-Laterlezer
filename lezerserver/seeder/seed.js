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
  await db.dropCollection('users', (err) => {
    if (err) {
      console.error('error delete existing collection');
    } else {
      console.info('delete existing collection success');
    }
  });

  // converts tags from Javascript objects to Mongoose objects
  tags.map((t) => {
    const tag = new Tag(t);
    return tag;
  });

  // converts articles from Javascript objects to Mongoose objects and adds tags to them
  articles.map((a) => {
    // eslint-disable-next-line no-param-reassign
    a.tags = tags;
    const article = new Article(a);
    return article;
  });

  // converts users from Javascript object to Mongoose object and adds tags and articles to them
  users.map(async (u, index) => {
    const user = new User(u);
    user.articles = articles;
    user.tags = tags;
    await user.save(() => {
      if (index === users.length - 1) {
        console.log('DONE!');
        mongoose.disconnect();
      }
    });
  });
});
