/**
 * @jest-environment node
 */

const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../../app'); // path to app.js
const Tag = require('../../models/tag');
const User = require('../../models/user');
const tagController = require('../tagController');

describe('Tag Controller Tests', () => {
  beforeAll(async () => {
    await mongoose.disconnect();
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
      tags: [
        {
          title: 'javascript',
          color: '#123122',
          children: [],
        },
        {
          title: 'politiek',
          color: '#00ff00',
          children: [],
        },
        {
          children: [],
          _id: '5fdcc504de09ff30845f9f2f',
          title: 'Voetbal',
          color: '#4279a6',
        },
      ],
    });
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async (done) => {
    mongoose.disconnect(done);
  });

  test('updateTag should return 400 status when updating tag because user doesnt exist', async () => {
    const response = await request(app).put('/api/tags').send({
      children: [],
      _id: '5fdcc504de09ff30845f9f2f',
      title: 'Voetballl',
      color: '#4279a6',
    }).set('Accept', 'application/json');
    expect(response.status).toBe(400);
  });

  test('updateTag should return 202 status when updating tag', async () => {
    const response = await request(app).put('/api/tags').send({
      children: [],
      _id: '5fdcc504de09ff30845f9f2f',
      title: 'Voetballl',
      color: '#4279a6',
    }).set('Username', 'stanhan')
      .set('Accept', 'application/json');
    expect(response.status).toBe(202);
    expect(response.body.data).toContainEqual(
      {
        _id: '5fdcc504de09ff30845f9f2f',
        children: [],
        color: '#4279a6',
        title: 'Voetballl',
      },
    );
  });

  test('Delete tags', async () => {
    const user = {
      deleteTag: jest.fn(async () => null),
      save: jest.fn(async () => null),
    };
    const body = {
      tag: {
        color: '#00ff00',
        title: 'voetbal',
      },
    };
    const status = jest.fn(() => ({
      send: jest.fn(() => {}),
    }));
    const next = jest.fn(() => {});
    await tagController.deleteTagsDelete({ user, body }, { status }, next);
    expect(user.deleteTag.mock.calls.length).toBe(1);
    expect(user.deleteTag.mock.calls[0][0]).toMatchObject(body);
    expect(user.save.mock.calls.length).toBe(1);
    expect(status.mock.calls.length).toBe(1);
    expect(status.mock.calls[0][0]).toBe(200);
    expect(next.mock.calls.length).toBe(0);
  });
});
