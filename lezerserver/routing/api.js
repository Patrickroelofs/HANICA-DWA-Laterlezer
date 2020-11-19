const userController = require("../controllers/userController");
const articleController = require("../controllers/articleController");

const express = require('express')
const router = express();

router.post("/user/:username/tag", userController.createTagPost);

router.get("/articles", articleController.getArticles);
router.get("/articles/:id", articleController.getArticle);
router.post("/articles", articleController.createArticlePost);

module.exports = router;
