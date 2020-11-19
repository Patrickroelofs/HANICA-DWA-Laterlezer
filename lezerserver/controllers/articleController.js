const htmlParser = require('../utils/HTMLParser');
const User = require('../models/user');

exports.createArticlePost = async (req, res) => {
  const user = await User.findOne({ userName: 'test' });
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
