const mongoose = require("mongoose");
const Article = require("./article");
const Tag = require("./tag");
const CustomError = require("../utils/custom-error");

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,
    password: String,
    email: String,
    articles: [Article.schema],
    tags: [Tag.schema]
})

userSchema.statics.getUserByUsername = async function (userName) {
    const user = await this.model("User").findOne({userName: userName});
    if (!user) throw new CustomError("User does not exists", 400);
    return user;
}

userSchema.methods.getTags = function () {
    return this.tags;
}

userSchema.methods.createTag = function (data) {
    for(let tag of this.tags) {
        if(tag.title === data.title) throw new CustomError("Tag already exists", 400);
    }
    this.tags.push(data);
};

userSchema.methods.updateOrCreateArticle = function (html, source, data = {}) {
    const key = Object.keys(this.articles).find(key => this.articles[key].source === source);

    if (key) {
        this.articles[key] = {...this.articles[key], ...data, html, source}
    } else {
        this.articles.push({
            html: html,
            source: source,
            ...data
        })
    }
};

const User = mongoose.model("User", userSchema);

module.exports = User;


