/* eslint-disable max-len */
const { Schema, model } = require('mongoose');
const Article = require('./article');
const Tag = require('./tag');
const CustomError = require('../utils/custom-error');

const userSchema = new Schema({
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
  if (!user) throw new CustomError('User does not exists', 400);
  return user;
};

userSchema.methods.getTags = function () {
  return this.tags;
};

userSchema.methods.updateOrCreateArticle = function (html, source, data = {}) {
  const key = Object.keys(this.articles).find((k) => this.articles[k].source === source);

  if (key) {
    this.articles[key] = {
      ...this.articles[key], ...data, html, source,
    };
  } else {
    this.articles = [...this.articles, {
      html,
      source,
      ...data,
    }];
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

// eslint-disable-next-line consistent-return
userSchema.methods.createTag = function (data) {
  if (!data.parent) return this.tags.push(data.tag);
  if (data.tag.title === data.parent.title) {
    throw new CustomError('Subtag can\'t have the same title as the parent.', 400);
  }

  data.parent.children.forEach((tag) => {
    if (tag.title === data.tag.title) {
      throw new CustomError('Tag already exists.', 400);
    }
  });

  const eachRecursive = (tags) => {
    this.tags = tags.map((tag) => {
      if (data.parent._id.toString() !== tag._id.toString()) {
        eachRecursive(tag.children);
      } else if (data.parent._id.toString() === tag._id.toString()) {
        tag.children.push(new Tag(data.tag));
        return tag;
      }
      return tag;
    });
  };
  eachRecursive(this.tags);
};
const User = model('User', userSchema);

module.exports = User;
