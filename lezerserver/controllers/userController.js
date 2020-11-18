const mongoose = require("mongoose");
const User = require("../models/user");

exports.createTagPost = async (req, res, next) => {
    try {
        const user = await User.getUser("tesyt");
        user.createTag(req.body);
        user.save();
        res.send("tag created");
    } catch (error) {
        next(error)
    }
}