const userController = require("../controllers/userController")

const express = require('express')
const router = express();

router.post("/user/:username/tag", userController.createTagPost);

module.exports = router;
