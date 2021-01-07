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
  prioritizedAt: Date,
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

articleSchema.methods.prioritize = function (date) {
  if (date !== undefined) {
    this.prioritizedAt = date;
  } else {
    this.prioritizedAt = moment();
  }
};

articleSchema.methods.checkStatus = function (status) {
  if (status === 'archived') {
    return this.archivedAt;
  }
  if (status === 'priority') {
    if (!this.archivedAt) {
      return this.prioritizedAt;
    }
  }
  return !this.archivedAt;
};

articleSchema.methods.deleteTags = function (deletingTags) {
  // eslint-disable-next-line max-len,no-return-assign
  deletingTags.forEach((tag) => this.tags = this.tags.filter((deletingTag) => (tag._id.toString() !== deletingTag._id.toString())));
};

module.exports = model('Article', articleSchema);
