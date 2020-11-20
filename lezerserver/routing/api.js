const userController = require("../controllers/userController");
const articleController = require("../controllers/articleController");

const express = require('express')
const router = express();

router.post("/user/:username/tag", userController.createTagPost);

router.use('/articles', articleController.middleware);
router.route('/articles')
    .get(articleController.getArticles)
    .post(articleController.createArticlePost);
router.get("/articles/:id", articleController.getArticle);

router.post("/user/:username/tag", userController.createTagPost);
router.get("/user/:userName", userController.loginUser);
router.post("/user", userController.createUser);
router.post("/tag", userController.createTagPost);

module.exports = router;
