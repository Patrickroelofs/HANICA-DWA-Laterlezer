/* eslint-disable max-len */
const moment = require('moment');
const { parseHTML } = require('../utils/HTMLParser');
const response = require('../utils/response');
let _User = require('../models/user');
const { sendMessage } = require('../websocket/ws');

exports.getArticles = async (req, res) => {
  const query = [
    { $unwind: '$articles' },
    {
      $match: {
        _id: req.user._id,
        'articles.archivedAt': undefined,
      },
    },
    {
      $project: {
        _id: '$articles._id',
        title: '$articles.title',
        description: '$articles.description',
        image: '$articles.image',
        tags: '$articles.tags',
        archivedAt: '$articles.archivedAt',
        readAt: '$articles.readAt',
        prioritizedAt: '$articles.prioritizedAt',
      },
    },
    {
      $sort: {
        _id: -1,
      },
    },
  ];
  if (req.query.range !== 'null') {
    const range = req.query.range === 'today' ? 'day' : req.query.range;
    query[1].$match['articles.createdAt'] = {
      $gte: moment().subtract(1, range).toDate(),
      $lte: moment().toDate(),
    };
  }
  if (req.query.status === 'archived') {
    query[1].$match['articles.archivedAt'] = {
      $lte: moment().toDate(),
    };
  }

  if (req.query.status === 'priority') {
    query[1].$match['articles.prioritizedAt'] = {
      $lte: moment().toDate(),
    };
  }

  const tags = req.query.tags && req.query.tags.split(',');
  if (tags.length > 0) {
    query[1].$match['articles.tags'] = {
      $elemMatch: {
        title: {
          $in: tags,
        },
      },
    };
  }
  const articles = (await _User.aggregate(query).exec()).filter((a) => {
    if (!tags) return true;
    let counter = 0;
    tags.forEach((filterTag) => {
      a.tags.forEach((articleTag) => {
        if (filterTag === articleTag.title) {
          counter += 1;
        }
      });
    });
    return counter === tags.length;
  });

  res.json(articles);
};

exports.getArticle = async (req, res) => {
  const article = req.user.articles.find((a) => a._id.toString() === req.params.id);

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
  if (req.body.prioritizedAt !== undefined) {
    article.prioritize(req.body.prioritizedAt);
  }

  req.user.save();
  res.json(article);
};

exports.createArticlePost = async (req, res, next) => {
  try {
    const { dom, site } = await parseHTML(req.body.url);
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

    sendMessage(req.user.userName, { type: 'NEW ARTICLE' });

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

/*
  This function in initially created for the websocket e2e test because of articles that you dont know if they update or not
 */
exports.deleteArticle = async (req, res) => {
  req.user.articles = req.user.articles.filter((article) => article._id.toString() !== req.params.id);
  req.user.save();
  res.status(200).send('Article deleted');
};

exports.setUserModel = (model) => { _User = model; };
