/**
 * @jest-environment node
 */

'use strict';

const mongoose = require('mongoose');
require('../user');

const User = mongoose.model('User');

describe('User Model Tests', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/testUserDB', { useNewUrlParser: true });
    });

    beforeEach(async () => {
        await User.create({
            firstName: "Stan",
            lastName: "Han",
            userName: "stanhan",
            password: "password",
            email: "stanhan@hotmail.com",
            articles: [],
            tags: [],
        });
    });

    afterEach(async () => {
        await User.deleteMany({});

    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    test('User method getUserByUsername should get the user from db', async () => {
        let testUser = await User.getUserByUsername('stanhan');

        expect(testUser.firstName).toEqual('Stan');
        expect(testUser.lastName).toEqual('Han');
        expect(testUser.userName).toEqual('stanhan');
        expect(testUser.password).toEqual('password');
        expect(testUser.email).toEqual('stanhan@hotmail.com');

    });

    test('User method getUserByUsername should throw an error', async () => {
        let thrownError;
        try {
            await User.getUserByUsername('stanhann');
        } catch (error) {
            thrownError = error;
        }
        expect(thrownError.message).toEqual("User does not exists");
    });


    test('User method createTag', async () => {
        let testUser = await User.getUserByUsername('stanhan');
        let newTag = {
            title: "test",
            color: "red"
        }
        testUser.createTag(newTag);

        expect(testUser.tags).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    title: "test",
                    color: "red"
                })
            ])
        );
    });
});