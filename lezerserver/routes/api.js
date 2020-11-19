const express = require('express');
const userController = require('../controllers/userController');
const articleController = require('../controllers/articleController');

const router = express();

router.post('/tag', userController.createTagPost);
router.put('/article/tags', articleController.addTagPut);
module.exports = router;
