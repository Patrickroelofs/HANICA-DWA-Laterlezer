/* eslint-disable max-len */
const moment = require('moment');
const { parseHTML } = require('../utils/HTMLParser');
const response = require('../utils/response');
const _Article = require('../models/article');

exports.getArticles = async (req, res) => {
  const tags = req.query.tags && req.query.tags.split(',');
  const articles = req.user.articles.filter((article) => {
    if (req.query.status) {
      return article.checkStatus(req.query.status);
    }
    return !article.archivedAt;
  }).filter((article) => {
    if (req.query.range) {
      return article.checkRange(req.query.range);
    }
    return true;
  }).filter(_Article.filterWithTags(tags)).sort((a, b) => b.createdAt - a.createdAt).map((article) => {
    const parsedArticle = article;
    parsedArticle.html = undefined;
    return parsedArticle;
  });
  res.json(articles);
};

exports.getArticle = async (req, res) => {
  const article = req.user.articles.find((a) => a._id.toString() === req.params.id);
  article.read();
  req.user.save();

  res.json(article);
};

exports.updateStatus = async (req, res) => {
  const article = req.user.articles.find((a) => a._id.toString() === req.params.id);
  if (req.body.readAt !== undefined) {
    article.read(req.body.readAt);
  }
  if (req.body.archivedAt !== undefined) {
    article.archive(req.body.archivedAt);
  }
  req.user.save();

  res.json(article);
};

exports.createArticlePost = async (req, res, next) => {
  try {
    const { dom, site } = await parseHTML(req.body.url);
    if (req.body.tags) {
      req.body.tags.forEach((tag) => {
        if (tag.__isNew__) {
          req.user.createTag([tag]);
        }
      });
    }
    if (site.error) {
      res.status(406).send(site.message);
      return;
    }

    req.user.updateOrCreateArticle(dom, site.url, {
      title: site.title,
      author: site.author,
      published: site.date_published,
      image: site.lead_image_url,
      links: [site.next_page_url],
      description: site.excerpt,
      tags: req.body.tags,
      createdAt: moment(),
    });

    req.user.save((err) => {
      if (err) {
        res.status(400).send(response('Something went wrong', null, false));
      } else {
        res.status(201).send(response('Article created', req.user.articles.reverse()[0]._id, true));
      }
    });
  } catch (e) {
    next(e);
  }
};
exports.updateArticle = async (req, res) => {
  const article = req.user.articles.find((a) => a._id.toString() === req.params.id);
  if (req.body.tags) {
    article.tags = req.body.tags;
  }
  req.user.save();
  res.json(article);
};
