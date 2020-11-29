/**
 * @jest-environment node
 */

const mongoose = require('mongoose');
require('../user');

const User = mongoose.model('User');

describe('User Model Tests', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/testUserDB', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
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
        color: '#00FF00',
      }],
    });
  });

  afterEach(async () => {
    await User.deleteMany({});
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
    const newTag = [{
      title: 'test',
      color: '#00FF00',
    }];
    testUser.createTag(newTag);

    expect(testUser.tags).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'test',
          color: '#00FF00',
        }),
      ]),
    );
  });

  test('User method createTag should throw an error', async () => {
    let thrownError;
    try {
      const testUser = await User.getUserByUsername('stanhan');
      const newTag = [{
        title: 'javascript',
        color: '#00FF00',
      }];
      testUser.createTag(newTag);
    } catch (error) {
      thrownError = error;
    }
    expect(thrownError.message).toEqual('Tag already exists');
    expect(thrownError.status).toEqual(400);
  });
  test('User method getTags should return all user tags', async () => {
    const testUser = await User.getUserByUsername('stanhan');
    const tags = testUser.getTags();
    const expectedTags = [
      {
        title: 'javascript',
        color: '#00FF00',
      }];

    expect(tags.length).toEqual(expectedTags.length);

    for (let i = 0; i < tags.length; i += 1) {
      expect(tags[i].title).toEqual(expectedTags[i].title);
      expect(tags[i].color).toEqual(expectedTags[i].color);
    }
  });
});
