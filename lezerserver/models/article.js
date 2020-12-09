const { Schema, model } = require('mongoose');
const moment = require('moment');
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
  createdAt: Date,
  readAt: Date,
  archivedAt: Date,
});

articleSchema.methods.addTag = function (tag) { this.tags = [...this.tags, tag]; };

articleSchema.methods.archive = function (date) {
  if (date !== undefined) {
    this.archivedAt = date;
  } else {
    this.archivedAt = moment();
  }
};
articleSchema.methods.read = function (date) {
  if (date !== undefined) {
    this.readAt = date;
  } else {
    this.readAt = moment();
  }
};

module.exports = model('Article', articleSchema);
