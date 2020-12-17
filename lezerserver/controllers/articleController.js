const moment = require('moment');
const { parseHTML } = require('../utils/HTMLParser');
const response = require('../utils/response');

exports.getArticles = async (req, res) => {
  const articles = req.user.articles.reverse().map((article) => {
    const parsedArticle = article;
    parsedArticle.html = undefined;
    return parsedArticle;
  }).filter((article) => {
    if (req.query.status) {
      if (req.query.status === 'today') {
        return moment(article.createdAt).diff(moment(), 'days') === 0 && !article.archivedAt;
      }
      if (req.query.status === 'archived') {
        return article.archivedAt;
      }
    }
    return !article.archivedAt;
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

exports.getArticlesByTags = async (req, res) => {
  let filterTags;
  if (!Array.isArray(req.query.title)) {
    filterTags = req.query.title.split();
  } else {
    filterTags = req.query.title;
  }
  res.json(req.user.getArticlesByTags(filterTags).filter((article) => {
    if (req.query.status) {
      if (req.query.status === 'today') {
        return moment(article.createdAt).diff(moment(), 'days') === 0 && !article.archivedAt;
      }
      if (req.query.status === 'archived') {
        return article.archivedAt;
      }
    }
    return !article.archivedAt;
  }));
};
