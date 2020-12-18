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

articleSchema.methods.checkStatus = function (status) {
  if (status === 'today') {
    return moment(this.createdAt).diff(moment(), 'days') === 0 && !this.archivedAt;
  } if (status === 'week') {
    return moment(this.createdAt).diff(moment(), 'weeks') === 0 && !this.archivedAt;
  } if (status === 'month') {
    return moment(this.createdAt).diff(moment(), 'months') === 0 && !this.archivedAt;
  } if (status === 'year') {
    return moment(this.createdAt).diff(moment(), 'years') === 0 && !this.archivedAt;
  } if (status === 'archived') {
    return this.archivedAt;
  } if (status === 'undefined') {
    return moment(this.createdAt) && !this.archivedAt;
  }
  return true;
};

articleSchema.statics.filterWithTags = function (tags) {
  return (a) => {
    if (!tags) return true;
    let counter = 0;
    tags.forEach((filterTag) => {
      a.tags.forEach((articleTag) => {
        if (filterTag === articleTag.title) {
          counter += 1;
        }
      });
    });
    return counter === tags.length;
  };
};

articleSchema.methods.deleteTags = function (deletingTags) {
  // eslint-disable-next-line max-len,no-return-assign
  deletingTags.forEach((tag) => this.tags = this.tags.filter((deletingTag) => (tag._id.toString() !== deletingTag._id.toString())));
};

module.exports = model('Article', articleSchema);
