const mongoose = require("mongoose");
const Article = require("./article");
const Tag = require("./tag");

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,
    password: String,
    email: String,
    articles: [Article.schema],
    tags: [Tag.schema]
})

userSchema.methods.getUser = function (userName) {
    return this.model("User").find({userName: userName});
}

userSchema.methods.createTag = function (title, color) {
    this.tags.push({
        title: title,
        color: color
    })
};

const User = mongoose.model("User", userSchema);

module.exports = User;


