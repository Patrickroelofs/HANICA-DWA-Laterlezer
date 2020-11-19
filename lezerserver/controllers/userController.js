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

exports.createUser = async (req, res) => {
    try {
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            password: req.body.password,
            email: req.body.email
        })

        user.save((function (err) {
            if(err) {
                res.status(404).send("User creation failed.")
            } else {
                res.send(user)
            }
        }))

    } catch (err) {
        console.log(err)
    }
}

exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({userName: req.params.userName});

        if(user === null) {
            res.status(401).send("User not found")
        } else {
            res.send(user);
        }


    } catch (err) {
        console.log(err)
    }
}