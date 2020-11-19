/**
 * @jest-environment node
 */

"use strict";
const userController = require("../userController");
const app = require('../../app') //path to app.js
const request = require('supertest')
const mongoose = require("mongoose");
const User = require("../../models/user")

describe("User Controller Tests", () => {
    beforeAll(async () => {
        await mongoose.disconnect();
        await mongoose.connect("mongodb://localhost:27017/testUserDB", { useNewUrlParser: true });
    });

    beforeEach(async () => {
        await User.create({
            firstName: "Stan",
            lastName: "Han",
            userName: "stanhan",
            password: "password",
            email: "stanhan@hotmail.com",
            articles: [],
            tags: [{
                title: "javascript",
                color: "blue"
            }],
        });
    });

    afterEach(async () => {
        await User.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    test("POST /user/:username/tag should return response with status 201", async () => {
        let response = await request(app).post("/api/user/stanhan/tag")
            .send({
                title: "testTag",
                color: "testColor"
            })
            .set("Accept", "application/json")
        expect(response.status).toEqual(201);
        expect(response.body.message).toEqual("Tag created");
        expect(response.body.success).toEqual(true);
    });

    test("POST /user/:username/tag  should return bad request response, tag already exists", async () => {
        let response = await request(app).post("/api/user/stanhan/tag")
            .send({
                title: "javascript",
                color: "blue"
            })
            .set("Accept", "application/json")
        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual("Tag already exists");
        expect(response.body.success).toEqual(false);
    });

    test("POST /user/:username/tag should return bad request response, user doesnt exist", async () => {
        let response = await request(app).post("/api/user/stanwew/tag")
            .send({
                title: "javascript",
                color: "blue"
            })
            .set("Accept", "application/json");
        expect(response.status).toEqual(400)
        expect(response.body.message).toEqual("User does not exists");
        expect(response.body.success).toEqual(false);
    });
});