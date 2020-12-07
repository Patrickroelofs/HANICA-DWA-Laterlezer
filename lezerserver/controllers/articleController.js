const moment = require('moment');
const { lazifyImages } = require('../utils/HTMLParser');
const response = require('../utils/response');

exports.getArticles = async (req, res) => {
  const articles = req.user.articles.reverse().map((article) => {
    const parsedArticle = article;
    parsedArticle.html = undefined;
    return parsedArticle;
  }).filter((article) => {
    if (req.query.status) {
      if (req.query.status === 'today') {
        return moment(article.createdAt).diff(moment(), 'days') === 0;
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
}

exports.createArticlePost = async (req, res, next) => {
  try {
    const { dom, page } = await lazifyImages(req.body.url);
    if (req.body.tags) {
      req.body.tags.forEach((tag) => {
        if (tag.__isNew__) {
          req.user.createTag([tag]);
        }
      });
    }
    if (page.error) {
      res.status(406).send(page.message);
      return;
    }

    req.user.updateOrCreateArticle(dom, req.body.url, {
      title: page.title,
      author: page.author,
      published: page.date_published,
      image: page.lead_image_url,
      links: [page.next_page_url],
      description: page.excerpt,
      tags: req.body.tags,
      createdAt: moment(),
    });

    req.user.save((err) => {
      if (err) {
        res.status(400).send(response('Color must be in the right format', null, false));
      } else {
        res.status(201).send(response('tag created', req.user.tags, true));
      }
    });
  } catch (e) {
    next(e);
  }
};
exports.updateArticle = async (req, res) => {
  const article = req.user.articles.find((a) => a._id.toString() === req.params.id);
  if (req.body.tags) {
    console.log(req.params.id);
    // eslint-disable-next-line max-len
    const newTags = req.body.tags.filter((tag) => !req.user.tags.find((uTag) => uTag.title === tag.title));
    req.user.createTag(newTags);
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
        return moment(article.createdAt).diff(moment(), 'days') === 0;
      }
      if (req.query.status === 'archived') {
        return article.archivedAt;
      }
    }
    return !article.archivedAt;
  }));
};
