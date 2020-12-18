const express = require('express');
const userController = require('../controllers/userController');
const articleController = require('../controllers/articleController');
const tagController = require('../controllers/tagController');
const { auth } = require('../middlewares/auth.middleware');

const router = express();

router.post('/user', userController.createUser);
router.get('/user/:userName', userController.loginUser);

router.route('/user/oauth/google')
  .post(userController.OAuthGoogle);

router.use(auth);

router.route('/articles')
  .get(articleController.getArticles)
  .post(articleController.createArticlePost);
router.route('/articles/:id')
  .get(articleController.getArticle)
  .post(articleController.updateArticle);
router.route('/articles/:id/status')
  .post(articleController.updateStatus);

router.route('/articles/tags/filter')
  .get(articleController.getArticlesByTags);

router.route('/tags')
  .get(tagController.getTagsGet)
  .post(tagController.createTagPost)
  .put(tagController.updateTagPut)
  .delete(tagController.deleteTagsDelete);

module.exports = router;
