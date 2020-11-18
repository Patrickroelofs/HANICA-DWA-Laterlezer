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

userSchema.methods.createTag = function (data) {
    this.tags.push(data)
};

const User = mongoose.model("User", userSchema);

module.exports = User;


