const mongoose = require("mongoose");
const User = require("../models/user")

exports.createTagPost = async (req, res) => {
    // ToDo users maken in de database en deze ophalen ipv hier een test user te maken
    // const user = await User.find({userName: "test"});
    const user = new User({
        firstName: "test",
        lastName: "test",
        userName: "test",
        password: "test",
        email: "test@test.nl",
        articles: [],
        tags: [],
    })
    user.createTag(req.body.title, req.body.color);
    user.save((err) => {
        if(err) {
            res.status(404).send("User not found");
        } else {
            res.send("Tag created");
        }
    });
}