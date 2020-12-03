const { Schema, model } = require('mongoose');
const Tag = require('./tag');

const articleSchema = Schema({
  title: String,
  html: String,
  source: String,
  url: String,
  image: String,
  author: String,
  description: String,
  published: String,
  links: [String],
  pages: [Object],
  tags: [Tag.schema],
});

articleSchema.methods.addTag = function (tag) { this.tags = [...this.tags, tag]; };

module.exports = model('Article', articleSchema);
