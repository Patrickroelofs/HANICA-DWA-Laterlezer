const mongoose = require("mongoose");
const User = require("./models/user")

const user = new User({
    firstName: "test",
    lastName: "test",
    userName: "test",
    password: "test",
    email: "test@test.nl",
    articles: [],
    tags: [],
})
