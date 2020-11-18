const mongoose = require("mongoose");
const User = require("../models/user");
const fetch = require('node-fetch');

exports.createArticlePost = async (req, res) => {
    const user = await User.findOne({userName: "test"});

    const response = await fetch(req.body.url);
    const html = await response.text();

    try {
        user.updateOrCreateArticle(html, req.body.url);
    } catch (e) {
        console.log(e)
        res.status(500).json(e.message);
    }
    user.save((err) => {
        if(err) {
            res.status(404).send("User not found");
        } else {
            res.send("Article created");
        }
    });
};
