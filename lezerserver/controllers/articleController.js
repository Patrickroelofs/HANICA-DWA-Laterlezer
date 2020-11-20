const mongoose = require('mongoose');
const fetch = require('node-fetch');
const htmlParser = require('../utils/HTMLParser');

let _User;

exports.createArticlePost = async (req, res) => {
  const user = await _User.findOne({ userName: req.headers.username });
  const page = await htmlParser(req.body.url);

  try {
    user.updateOrCreateArticle(page.content, req.body.url, {
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
  user.save((err) => {
    if (err) {
      res.status(404).send('User not found');
    } else {
      res.send('Article created');
    }
  });
};

exports.setUserModel = (userModel) => _User = userModel;

exports.setUserModel(require('../models/user'));
