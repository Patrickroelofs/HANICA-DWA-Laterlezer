/**
 * @jest-environment node
 */

const mongoose = require('mongoose');
require('../user');

const User = mongoose.model('User');

describe('User Model Tests', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/testUserDB', { useNewUrlParser: true });
  });

  beforeEach(async () => {
    await User.create({
      firstName: 'Stan',
      lastName: 'Han',
      userName: 'stanhan',
      password: 'password',
      email: 'stanhan@hotmail.com',
      articles: [],
      tags: [{
        title: 'javascript',
        color: 'blue',
      }],
    });
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
            },
                {
                    title: "javascript2",
                    color: "blue2"
                },
                {
                    title: "javascript3",
                    color: "blue2"
                }],
        });
    });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test('User method getUserByUsername should get the user from db', async () => {
    const testUser = await User.getUserByUsername('stanhan');

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
    expect(thrownError.message).toEqual('User does not exists');
    expect(thrownError.status).toEqual(400);
  });

  test('User method createTag should add a new tag to the tags list', async () => {
    const testUser = await User.getUserByUsername('stanhan');
    const newTag = {
      title: 'test',
      color: 'red',
    };
    testUser.createTag(newTag);

    expect(testUser.tags).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'test',
          color: 'red',
        }),
      ]),
    );
  });

    test("User method getUserByUsername should throw an error", async () => {
        let thrownError;
        try {
            await User.getUserByUsername("stanhann");
        } catch (error) {
            thrownError = error;
        }
        expect(thrownError.message).toEqual("User does not exists");
        expect(thrownError.status).toEqual(400);
    });


    test("User method createTag should add a new tag to the tags list", async () => {
        let testUser = await User.getUserByUsername("stanhan");
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

    test("User method createTag should throw an error", async () => {
        let thrownError;
        try {
            let testUser = await User.getUserByUsername("stanhan");
            let newTag = {
                title: "javascript",
                color: "blue"
            }
            testUser.createTag(newTag);
        } catch (error) {
            thrownError = error;
        }
        expect(thrownError.message).toEqual("Tag already exists");
        expect(thrownError.status).toEqual(400);
    });

    test("User method getTags should return all user tags", async () => {
        let testUser = await User.getUserByUsername("stanhan");
        let tags = testUser.getTags();
        let expectedTags = [
            {
                title: "javascript",
                color: "blue"
            },
            {
                title: "javascript2",
                color: "blue2"
            },
            {
                title: "javascript3",
                color: "blue2"
            }]

        expect(tags.length).toEqual(expectedTags.length);

        for(let i = 0; i < tags.length; i++) {
            expect(tags[i].title).toEqual(expectedTags[i].title);
            expect(tags[i].color).toEqual(expectedTags[i].color);
        }
    });
});
