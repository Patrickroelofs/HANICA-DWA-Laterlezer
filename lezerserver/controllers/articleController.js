const htmlParser = require('../utils/HTMLParser');

exports.getArticles = async (req, res) => {
  const articles = req.user.articles.reverse().map((article) => {
    const parsedArticle = article;
    parsedArticle.html = null;
    return parsedArticle;
  });

  res.json(articles);
};

exports.getArticle = async (req, res) => {
  const article = req.user.articles.find((article) => article._id == req.params.id);

  res.json(article);
};

exports.createArticlePost = async (req, res) => {
  const page = await htmlParser(req.body.url);
  if (page.error) {
    res.status(406).send(page.message);
    return;
  }
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
      res.status(500).send(err);
    } else {
      res.send('Article created');
    }
  });
};

exports.updateArticle = async (req, res) => {
  const article = req.user.articles.find((article) => article._id == req.params.id);
  if (req.body.tags) {
    const newTags = req.body.tags.filter((tag) => !req.user.tags.find((uTag) => uTag.title === tag.title));
    req.user.createTag(newTags);
    article.tags = req.body.tags;
  }
  req.user.save();
  res.json(article);
}
