/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
const { Schema, model } = require('mongoose');
const Article = require('./article');
const Tag = require('./tag');
const CustomError = require('../utils/custom-error');

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  userName: {
    type: String,
    maxlength: 30,
  },
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

userSchema.methods.updateTag = async function (newTag) {
  const eachRecursive = (tags) => {
    this.tags = tags.map((tag) => {
      if (newTag._id.toString() !== tag._id.toString()) {
        eachRecursive(tag.children);
      } else if (newTag._id.toString() === tag._id.toString()) {
        tag.title = newTag.title;
        tag.color = newTag.color;
        return newTag;
      }
      return tag;
    });
  };
  eachRecursive(this.tags);

  this.articles.map((a) => {
    a.tags = a.tags.map((t) => {
      if (t._id.toString() === newTag._id.toString()) {
        t.title = newTag.title;
        t.color = newTag.color;
        return t;
      }
      return t;
    });
  });
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

const findTag = function (tag, allTags) {
  let tagToFind = '';
  const eachRecursive = (tags) => {
    tags.forEach((t) => {
      if (tag && tag._id.toString() === t._id.toString()) {
        tagToFind = t;
      } else {
        eachRecursive(t.children);
      }
    });
  };
  eachRecursive(allTags);
  return tagToFind;
};

// eslint-disable-next-line consistent-return
userSchema.methods.createTag = function (data) {
  const parent = findTag(data.parent, this.tags);
  if (data.tag.title.length > 29) {
    throw new CustomError('Tag title is too long.', 400);
  }
  if (!parent) {
    this.tags.forEach((tag) => {
      if (tag.title === data.tag.title) {
        throw new CustomError('Tag already exists.', 400);
      }
    });
    return this.tags.push(data.tag);
  }

  if (data.tag.title === parent.title) {
    throw new CustomError('Subtag can\'t have the same title as the parent.', 400);
  }

  parent.children.forEach((tag) => {
    if (tag.title === data.tag.title) {
      throw new CustomError('Tag already exists.', 400);
    }
  });

  const eachRecursive = (tags) => {
    this.tags = tags.map((tag) => {
      if (parent._id.toString() !== tag._id.toString()) {
        eachRecursive(tag.children);
      } else if (parent._id.toString() === tag._id.toString()) {
        tag.children.push(new Tag(data.tag));
        return tag;
      }
      return tag;
    });
  };
  eachRecursive(this.tags);
};

const setChildrenInArray = function (tag) {
  const children = [tag[0]];
  const eachRecursive = (tags) => {
    tags.forEach((child) => {
      children.push(child);
      eachRecursive(child.children);
    });
  };
  eachRecursive(tag[0].children);
  return children;
};

const findParent = function (tag, allTags) {
  let tagParent = '';
  const eachRecursive = (tags) => {
    tags.forEach((parent) => {
      // eslint-disable-next-line consistent-return
      parent.children.forEach((child) => {
        if (child._id.toString() === tag._id.toString()) {
          tagParent = parent;
        }
        eachRecursive(parent.children);
      });
    });
  };
  eachRecursive(allTags);
  return tagParent;
};

// eslint-disable-next-line consistent-return
userSchema.methods.deleteTag = function (data) {
  const parent = findParent(data.tag, this.tags);
  if (!parent) {
    const children = setChildrenInArray(this.tags.filter((t) => (data.tag._id.toString() === t._id.toString())));
    this.articles.forEach((article) => {
      article.deleteTags(children);
    });
    // eslint-disable-next-line no-return-assign
    return this.tags = this.tags.filter((t) => (data.tag._id.toString() !== t._id.toString()));
  }
  const eachRecursive = (tags) => {
    this.tags = tags.map((tag) => {
      if (parent._id.toString() !== tag._id.toString()) {
        eachRecursive(tag.children);
      } else if (parent._id.toString() === tag._id.toString()) {
        const children = setChildrenInArray(tag.children.filter((t) => (data.tag._id.toString() === t._id.toString())));
        this.articles.forEach((article) => {
          article.deleteTags(children);
        });
        // eslint-disable-next-line no-return-assign,no-param-reassign
        tag.children = tag.children.filter((t) => (data.tag._id.toString() !== t._id.toString()));
      }
      return tag;
    });
  };
  eachRecursive(this.tags);
};

const User = model('User', userSchema);

module.exports = User;
