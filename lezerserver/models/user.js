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

userSchema.methods.createTag = async function (data) {
  // TODO: find the parent and add the child
  //
  // const title = await this.model('User').aggregate([{ $match: { 'tags._id': data.parent._id } }]);
  // const title = await Tag.findOneAndUpdate({ 'tags._id': data.parent._id }, { $push: { children: data.tag } });
  // const repo = await this.model('User').find({}, { _id: 0, s: { $elemMatch: { _id: data.parent._id } } });
  // this.model('User').updateOne({ _id: data.parent._id }, { children: data.tag }, { upsert: true });
  //
  //
  // const tree = new TreeModel();
  // const root = tree.parse(this.tags);
  // const sport = root.first((node) => {
  //   root.first((node) => node.model._id === data.parent._id);
  //   return node.model._id === data.parent._id;
  // });
  // console.log(sport);
  // const user = await this.model('User').findOne({ tags: { $elemMatch: { title: data.parent.title } } });
  // console.log(user.tags);
  //
  //
  // data.forEach((newTag) => {
  //   if (newTag.title.trim().length === 0) {
  //     throw new CustomError('No tag title given', 400);
  //   }
  //   if (newTag.title.length > 30) {
  //     throw new CustomError('Tag title is too long', 400);
  //   }
  //   if (this.tags.find((tag) => tag.title === newTag.title) === undefined) {
  //     this.tags = [...this.tags, new Tag(newTag)];
  //   } else {
  //     throw new CustomError('Tag already exists', 400);
  //   }
  // });
};
const User = model('User', userSchema);

module.exports = User;
