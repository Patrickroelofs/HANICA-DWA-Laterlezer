const mongoose = require("mongoose");
const fetch = require('node-fetch');
let _User;

exports.createArticlePost = async (req, res) => {
    const user = await _User.findOne({userName: "test"});
    const response = await fetch(req.body.url);
    const html = await response.text();

    try {
        user.updateOrCreateArticle(html, req.body.url);
    } catch (e) {
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

exports.setUserModel = (userModel) => _User = userModel;

exports.setUserModel(require('../models/user'))
