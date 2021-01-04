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
      articles: [{
        title: 'article 1',
        tags: [{
          _id: '5fdcc504de09ff30845f9f2f',
          title: 'Politiek',
          color: '#00FF00',
          children: [],
        },
        {
          title: 'Buitenland',
          color: '#00FF00',
          children: [],
        }],
      },
      {
        title: 'article 2',
        tags: [{
          title: 'Politiek',
          color: '#00FF00',
          children: [],
        },
        {
          title: 'Fun',
          color: '#00FF00',
          children: [],
        }],
      },
      {
        title: 'article 3',
        tags: [],
      }],
      tags: [{
        title: 'javascript',
        color: '#00FF00',
        children: [],
      },
      {
        children: [],
        _id: '5fdcc504de09ff30845f9f2f',
        title: 'Voetbal',
        color: '#4279a6',
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
    const newTag = {
      parent: {
        _id: '4',
        title: 'javascript',
        color: '#00FF00',
        children: [],
      },
      tag: {
        _id: '44',
        title: 'testchild',
        color: '#00FF00',
        children: [],
      },
    };
    testUser.createTag(newTag);

    expect(testUser.tags[0]).toBeDefined();
    expect(testUser.tags[0].children).toBeDefined();
    expect(testUser.tags[0].title).toBe('javascript');
  });

  test('User method createTag should throw an error', async () => {
    try {
      const testUser = await User.getUserByUsername('stanhan');
      const newTag = {
        tag: {
          _id: 32,
          title: 'javascript',
          color: '#00FF00',
          children: [],
        },
        parent: {
          _id: 0,
          title: '',
          children: [],
        },
      };
      testUser.createTag(newTag);
    } catch (error) {
      expect(error.message).toEqual('Tag already exists');
      expect(error.status).toEqual(400);
    }
  });
  test('User method getTags should return all user tags', async () => {
    const testUser = await User.getUserByUsername('stanhan');
    const tags = testUser.getTags();
    const expectedTags = [{
      title: 'javascript',
      color: '#00FF00',
      children: [],
    },
    {
      children: [],
      _id: '5fdcc504de09ff30845f9f2f',
      title: 'Voetbal',
      color: '#4279a6',
    }];

    expect(tags.length).toEqual(expectedTags.length);

    for (let i = 0; i < tags.length; i += 1) {
      expect(tags[i].title).toEqual(expectedTags[i].title);
      expect(tags[i].color).toEqual(expectedTags[i].color);
    }
  });

  test('User method getArticlesByTags should return all articles with the Poltiek tag', async () => {
    const testUser = await User.getUserByUsername('stanhan');
    const articles = await testUser.getArticlesByTags(['Politiek']);
    expect(articles.length).toEqual(2);
    articles.forEach((a) => {
      expect(a.tags).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            title: 'Politiek',
          }),
        ]),
      );
    });
  });

  test('User method getArticlesByTags should return all articles with the Poltiek and Fun tag', async () => {
    const testUser = await User.getUserByUsername('stanhan');
    const articles = await testUser.getArticlesByTags(['Politiek', 'Fun']);
    expect(articles.length).toEqual(1);

    articles.forEach((a) => {
      expect(a.tags).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            title: 'Fun',
          }),
          expect.objectContaining({
            title: 'Politiek',
          }),
        ]),
      );
    });
  });

  test('Delete tag function should delete given tag that has a parent and all subtags and delete all tags from the articles.', async () => {
    const testUser = await User.getUserByUsername('stanhan');

    await testUser.createTag({
      tag: {
        title: 'sport',
        color: '#00FF00',
      },
    });
    await testUser.createTag({
      parent: testUser.tags[1],
      tag: {
        title: 'voetbal',
        color: '#00FF00',
      },
    });
    await testUser.createTag({
      parent: testUser.tags[1].children[0],
      tag: {
        title: 'ajax',
        color: '#00FF00',
      },
    });

    await testUser.articles[2].addTag(testUser.tags[1]);
    await testUser.articles[2].addTag(testUser.tags[1].children[0]);
    await testUser.articles[2].addTag(testUser.tags[1].children[0].children[0]);

    const tagToDelete = {
      tag: testUser.tags[1].children[0],
    };

    await testUser.deleteTag(tagToDelete);

    expect(testUser.tags[1].children).not.toContain(tagToDelete.tag);
    expect(testUser.articles[2].tags).not.toContain(tagToDelete.tag);
  });

  test('Delete tag function should delete given tag that has no parent tag and all subtags and delete all tags from the articles.', async () => {
    const testUser = await User.getUserByUsername('stanhan');

    await testUser.createTag({
      tag: {
        title: 'sport',
        color: '#00FF00',
      },
    });
    await testUser.createTag({
      parent: testUser.tags[1],
      tag: {
        title: 'voetbal',
        color: '#00FF00',
      },
    });

    await testUser.articles[2].addTag(testUser.tags[1]);
    await testUser.articles[2].addTag(testUser.tags[1].children[0]);

    const tagToDelete = {
      tag: testUser.tags[1],
    };

    await testUser.deleteTag(tagToDelete);

    expect(testUser.tags).not.toContain(tagToDelete.tag);
    expect(testUser.articles[2].tags).not.toContain(tagToDelete.tag);
    expect(testUser.articles[2].tags).not.toContain(tagToDelete.tag.children[0]);
  });

  test('User method updateTag should update the tag', async () => {
    const testUser = await User.getUserByUsername('stanhan');

    await testUser.updateTag({
      children: [],
      _id: '5fdcc504de09ff30845f9f2f',
      title: 'Voetballl',
      color: '#4279a6',
    });

    const updatedTag = testUser.tags.find((tag) => tag._id == '5fdcc504de09ff30845f9f2f');
    expect(updatedTag.title).toBe('Voetballl');
    expect(updatedTag.color).toBe('#4279a6');
  });
});
