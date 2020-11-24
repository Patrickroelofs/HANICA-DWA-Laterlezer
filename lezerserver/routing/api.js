const express = require('express');
const userController = require('../controllers/userController');
const articleController = require('../controllers/articleController');
const { auth } = require('../middlewares/auth.middleware');

const router = express();

router.get('/user/:userName', userController.loginUser);
router.post('/user', userController.createUser);

router.use(auth);

router.route('/articles')
  .get(articleController.getArticles)
  .post(articleController.createArticlePost);
router.get('/articles/:id', articleController.getArticle);

router.route('/tags')
  .get(userController.getTagsGet)
  .post(userController.createTagPost);

module.exports = router;
