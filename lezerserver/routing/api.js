const express = require('express');
const userController = require('../controllers/userController');
const articleController = require('../controllers/articleController');

const router = express();

router.post('/articles', articleController.createArticlePost);
router.post('/user/:username/tag', userController.createTagPost);
router.get('/user/:userName', userController.loginUser);
router.post('/user', userController.createUser);
router.post('/tag', userController.createTagPost);

module.exports = router;
