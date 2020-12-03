const { parse } = require('@postlight/mercury-parser');
const { returnHTML } = require('../utils/HTMLParser');
const response = require('../utils/response');

exports.getArticles = async (req, res) => {
  const articles = req.user.articles.reverse().map((article) => {
    const parsedArticle = article;
    parsedArticle.html = undefined;
    return parsedArticle;
  });
  res.json(articles);
};

exports.getArticle = async (req, res) => {
  const article = req.user.articles.find((a) => a._id.toString() === req.params.id);
  res.json(article);
};

exports.createArticlePost = async (req, res, next) => {
  // const URLRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
  // eslint-disable-next-line no-unused-expressions
  // if (req.body.url.match(URLRegex)) {
  //   res.status(201).json('success');
  // } else {
  //   return res.status(406).json('Dat is geen goede URL');
  // }
  try {
    // const test = await returnHTML(req.body.url);
    const test = parse(req.body.url);
    if (test.error) {
      return res.status(406).send(response(`${test.message}`, null, false));
    }

    if (req.body.tags) {
      req.body.tags.forEach((tag) => {
        if (tag.__isNew__) {
          req.user.createTag([tag]);
        }
      });
    }
    req.user.updateOrCreateArticle(test.content, req.body.url, {
      title: test.title,
      author: test.author,
      published: test.date_published,
      image: test.lead_image_url,
      links: [test.next_page_url],
      description: test.excerpt,
      tags: req.body.tags,
      pages: [{ test }],
    });
    req.user.save(((err) => {
      if (err) {
        res.status(400).send(response(`${err}`, null, false));
      } else {
        res.status(201).send(response('article created', req.user.articles, true));
      }
    }));
  } catch (error) {
    next(error);
  }
  // TODO: Send websocket response to client about the article
};

exports.updateArticle = async (req, res) => {
  const article = req.user.articles.find((a) => a._id.toString() === req.params.id);
  if (req.body.tags) {
    // eslint-disable-next-line max-len
    const newTags = req.body.tags.filter((tag) => !req.user.tags.find((uTag) => uTag.title === tag.title));
    req.user.createTag(newTags);
    article.tags = req.body.tags;
  }
  req.user.save();
  res.json(article);
};
