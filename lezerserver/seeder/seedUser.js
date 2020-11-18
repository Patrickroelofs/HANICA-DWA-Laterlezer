const mongoose = require("mongoose");
const User = require("../models/user");
const users = require("./dummyUsers");

// make a connection
mongoose.connect("mongodb://localhost:27017/reader");

// get reference to database
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open",  async function () {
    console.log("Connection Successful!");

    // drops the existing collection before making a new one
    await db.dropCollection("users", function (err, result) {
        if (err) {
            console.log("error delete existing collection");
        } else {
            console.log("delete existing collection success");
        }
    });

    // makes a new users collection and fill it with dummyUsers from dummyUsers.js
    users.map(async (u, index) => {
        const user = new User(u);
        await user.save((err, result) => {
            if (index === users.length - 1) {
                console.log("DONE!");
                mongoose.disconnect();
            }
        });
    });
});



