const mongoose = require('mongoose');
const Article = require('./article');
const Tag = require('./tag');
const CustomError = require('../utils/custom-error');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  userName: String,
  password: String,
  profilePicture: String,
  email: String,
  articles: [Article.schema],
  tags: [Tag.schema],
});

userSchema.statics.getUserByUsername = async function (userName) {
  const user = await this.model('User').findOne({ userName });
  if (!user) {
    throw new CustomError('User does not exists', 400);
  }
  return user;
};

userSchema.methods.getTags = function () {
  return this.tags;
};

userSchema.methods.createTag = function (data) {
  data.forEach((newTag) => {
    if (newTag.title.trim().length === 0) {
      throw new CustomError('No tag title given', 400);
    }
    if (newTag.title.length > 30) {
      throw new CustomError('Tag title is too long', 400);
    }
    if (this.tags.find((tag) => tag.title === newTag.title) === undefined) {
      this.tags.push(newTag);
    } else {
      throw new CustomError('Tag already exists', 400);
    }
  });
};

userSchema.methods.updateOrCreateArticle = function (html, source, data = {}) {
  const key = Object.keys(this.articles).find((k) => this.articles[k].source === source);

  if (key) {
    this.articles[key] = {
      ...this.articles[key], ...data, html, source,
    };
  } else {
    this.articles.push({
      html,
      source,
      ...data,
    });
  }
};

userSchema.methods.getArticlesByTags = function (tags) {
  const filteredArticles = this.articles.filter((a) => {
    let counter = 0;
    tags.forEach((filterTag) => {
      a.tags.forEach((articleTag) => {
        if (filterTag === articleTag.title) {
          counter += 1;
        }
      });
    });
    return (counter === tags.length) ? a : null;
  });
  return filteredArticles;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
