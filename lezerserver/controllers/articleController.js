const mongoose = require('mongoose');
const fetch = require('node-fetch');
const htmlParser = require('../utils/HTMLParser');

let _User;

exports.middleware = async (req, res, next) => {
  const user = await _User.findOne({ userName: 'test' });
    if (!user) {
      res.status(401).send('Invalid username')
    }
    req.user = user;
    next();
};

exports.getArticles = async (req, res) => {
    const articles = req.user.articles.reverse().map((article) => {
        article.html = null;
        return article;
    });

    res.json(articles);
};

exports.getArticle = async (req, res) => {
    const article = req.user.articles.find((article) => article._id == req.params.id);

    res.json(article);
};

exports.createArticlePost = async (req, res) => {
  const page = await htmlParser(req.body.url);

  try {
    req.user.updateOrCreateArticle(page.content, req.body.url, {
      title: page.title,
      author: page.author,
      published: page.date_published,
      image: page.lead_image_url,
      links: [page.next_page_url],
      description: page.excerpt,
    });
  } catch (e) {
    res.status(500).json(e.message);
  }
  req.user.save((err) => {
    if (err) {
      res.status(404).send('User not found');
    } else {
      res.send('Article created');
    }
  });
};

exports.setUserModel = (userModel) => _User = userModel;

exports.setUserModel(require('../models/user'));
