const userController = require("../controllers/userController")

const express = require('express')
const router = express();

router.post("/tag", userController.createTagPost);
router.post("/user", userController.createUser);
router.get("/user/:userName", userController.loginUser);

module.exports = router;
