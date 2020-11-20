const mongoose = require("mongoose");
const User = require("../models/user");
const response = require("../utils/response");

exports.createTagPost = async (req, res, next) => {
    try {
        const user = await User.getUserByUsername(req.params.username);
        user.createTag(req.body);
        user.save();
        res.status(201).send(response("tag created", user.tags, true));
    } catch (error) {
        next(error)
    }
}

exports.getTagsGet = async (req, res, next) => {
    try {
        const user = await User.getUserByUsername(req.params.username);
        const tags = await user.getTags();
        res.status(200).send(response(`all tags from ${user.userName}`, tags, true ));
    } catch (error) {
        next(error);
    }
}