const mongoose = require('mongoose');
const Tag = require('./tag');

const articleSchema = mongoose.Schema({
  title: String,
  html: String,
  source: String,
  url: String,
  image: String,
  author: String,
  description: String,
  published: String,
  links: [String],
  tags: [Tag.schema],
});

module.exports = mongoose.model('Article', articleSchema);
