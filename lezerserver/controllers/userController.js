const mongoose = require("mongoose");
const User = require("../models/user");
const response = require("../utils/response");

exports.createTagPost = async (req, res, next) => {
    try {
        const user = await User.getUserByUsername("test");
        user.createTag(req.body);
        user.save();
        res.status(201).send(response("tag created"));
    } catch (error) {
        next(error)
    }
}