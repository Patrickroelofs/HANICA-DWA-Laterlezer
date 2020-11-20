const mongoose = require('mongoose');
const Article = require('./article');
const Tag = require('./tag');
const CustomError = require('../utils/custom-error');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  userName: String,
  password: String,
  email: String,
  articles: [Article.schema],
  tags: [Tag.schema],
});

userSchema.statics.getUserByUsername = async function (userName) {
  const user = await this.model('User').findOne({ userName });
  if (!user) throw new CustomError('User does not exists', 400);
  return user;
};

userSchema.methods.createTag = function (data) {
  if (this.tags === []) return;
  if (data === []) return;
  data.forEach((newTag) => {
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

const User = mongoose.model('User', userSchema);

module.exports = User;
