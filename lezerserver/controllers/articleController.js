const { serializeHTML, parseHTML } = require('../utils/HTMLParser');

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

exports.createArticlePost = async (req, res) => {
  const URLRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
  // eslint-disable-next-line no-unused-expressions
  if (req.body.url.match(URLRegex)) {
    res.status(201).json('success');
  } else {
    return res.status(406).json('Dat is geen goede URL');
  }

  const page = await parseHTML(req.body.url);
  page.content = serializeHTML(page.content);
  if (page.error) {
    return res.status(406).send(page.message);
  }

  if (req.body.tags) {
    req.body.tags.forEach((tag) => {
      if (tag.__isNew__) {
        req.user.createTag([tag]);
      }
    });
  }

  try {
    req.user.updateOrCreateArticle(page.content, req.body.url, {
      title: page.title,
      author: page.author,
      published: page.date_published,
      image: page.lead_image_url,
      links: [page.next_page_url],
      description: page.excerpt,
      tags: req.body.tags,
    });
  } catch (e) {
    return res.status(500).json(e.message);
  }
  req.user.save();
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
