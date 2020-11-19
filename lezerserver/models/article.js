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
  tags: {
    type: [Map],
    of: Tag,
  },
});

articleSchema.methods.addTag = function (tag) { this.tags.push(tag); };

module.exports = mongoose.model('Article', articleSchema);
