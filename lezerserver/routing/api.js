const express = require('express');
const userController = require('../controllers/userController');
const articleController = require('../controllers/articleController');

const router = express();

router.post('/articles', articleController.createArticlePost);
router.post('/user/:username/tag', userController.createTagPost);
router.get('/user/:userName', userController.loginUser);
router.post('/user', userController.createUser);

module.exports = router;
