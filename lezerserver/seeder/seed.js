/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const mongoose = require('mongoose');
const Tag = require('../models/tag');
const User = require('../models/user');
const users = require('./dummyUsers');
const articles = require('./dummyArticles');
const tags = require('./dummyTags');
const HTMLParser = require('../utils/HTMLParser');

// Make a connection with database
mongoose.connect('mongodb://localhost:27017/reader', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

// Get reference to database
const db = mongoose.connection;

// Handle connection errors
db.on('error', console.error.bind(console, 'connection error:'));

// Add new users with tags and articles to the database
const seedUsers = async () => {
  try {
    console.group('Adding users');
    for (const user of users) {
      // Create new user
      const newUser = new User(user);
      console.log(`Adding user: ${newUser.userName}`);
      console.group(`Adding tags for user: ${newUser.userName}`);
      for (const tag of tags) {
        console.log(`Adding tag: ${tag.title}, ${tag.color}`);
        // Add tag to user
        newUser.createTag([new Tag(tag)]);
      }
      console.groupEnd();
      console.group(`Converting articles for user: ${newUser.userName}`);
      for (const url of articles) {
        console.log(`Adding article: ${url}`);
        // Parse url
        const page = await HTMLParser(url);
        const includedTags = [];
        console.group(`Adding tags to article: ${url}`);
        for (let i = 0; i < Math.floor(Math.random() * tags.length); i += 1) {
          const randomTag = tags[Math.floor(Math.random() * tags.length)];
          if (!includedTags.includes(randomTag)) {
            console.log(`Adding tag: ${randomTag.title}, ${randomTag.color}`);
            // Push random tag into the article
            includedTags.push(randomTag);
          }
        }
        console.groupEnd();
        // Add article to user
        newUser.updateOrCreateArticle(page.content, page.url, {
          title: page.title,
          author: page.author,
          published: page.date_published,
          image: page.lead_image_url,
          links: [page.next_page_url],
          description: page.excerpt,
          tags: includedTags,
        });
      }
      console.groupEnd();
      // Save the new user
      await newUser.save();
      console.log(`Saved user: ${newUser.userName}`);
    }
    console.groupEnd();
  } catch (err) {
    // Throw error if anything goes wrong
    throw new Error(err);
  } finally {
    // Disconnect the database
    mongoose.disconnect();
    console.log('Done!');
  }
};

db.once('open', async () => {
  console.info('Connection successful!');

  // Drop the existing collection before making a new one
  if (db.collection('users')) {
    await db.dropCollection('users', (err) => {
      if (err) {
        console.error(`Error delete existing collection: ${err}`);
        mongoose.disconnect();
      } else {
        console.info('Delete existing collection success!');
        seedUsers();
      }
    });
  }
});
