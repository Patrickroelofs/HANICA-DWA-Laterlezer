const express = require('express');
const userController = require('../controllers/userController');
const articleController = require('../controllers/articleController');
const tagController = require('../controllers/tagController');
const { auth } = require('../middlewares/auth.middleware');

const router = express();

router.get('/user/:userName', userController.loginUser);
router.post('/user', userController.createUser);

router.use(auth);

router.route('/articles')
  .get(articleController.getArticles)
  .post(articleController.createArticlePost);
router.route('/articles/:id')
  .post(articleController.updateArticle)
  .get(articleController.getArticle);

router.route('/articles/tags/filter')
  .get(articleController.getArticlesByTags);

router.route('/tags')
  .get(tagController.getTagsGet)
  .post(tagController.createTagPost);

module.exports = router;
