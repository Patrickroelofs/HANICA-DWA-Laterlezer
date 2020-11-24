/**
 * @jest-environment node
 */

const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../../app'); // path to app.js
const User = require('../../models/user');

describe('User Controller Tests', () => {
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
      tags: [{
        title: 'javascript',
        color: '#123122',
      }],
    });
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test('POST /user/:username/tag should return response with status 201', async () => {
    const response = await request(app).post('/api/user/stanhan/tag')
      .send({
        tags: [
          {
            title: 'testTag',
            color: '#123122',
          }],
      })
      .set('Username', 'stanhan')
      .set('Accept', 'application/json');
    expect(response.status).toEqual(201);
    expect(response.body.message).toEqual('Tag created');
    expect(response.body.success).toEqual(true);
  });

  test('POST /user/:username/tag  should return bad request response, tag already exists', async () => {
    const response = await request(app).post('/api/user/stanhan/tag')
      .send({
        tags: [
          {
            title: 'javascript',
            color: '#123122',
          }],
      })
      .set('Username', 'stanhan')
      .set('Accept', 'application/json');
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual('Tag already exists');
    expect(response.body.success).toEqual(false);
  });

  test('POST /user/:username/tag should return bad request response, user doesnt exist', async () => {
    const response = await request(app).post('/api/user/stanwew/tag')
      .send({
        tags: [
          {
            title: 'testTag',
            color: '#123122',
          }],
      })
      .set('Username', 'stanwew')
      .set('Accept', 'application/json');
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual('User does not exists');
    expect(response.body.success).toEqual(false);
  });

  test('GET /user/:username/tag should return bad request response, user doesnt exist', async () => {
    const response = await request(app).get('/api/user/stantest/tag').set('Username', 'stantest');

    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual('User does not exists');
    expect(response.body.success).toEqual(false);
  });

  test('GET /user/:username/tag should return all tags from user stanhan and give the right response', async () => {
    const response = await request(app).get('/api/user/stanhan/tag').set('Username', 'stanhan');
    const expectedTags = [{
      title: 'javascript',
      color: '#123122',
    }];

    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual('All tags from stanhan');
    expect(response.body.success).toEqual(true);

    expect(response.body.data.length).toEqual(expectedTags.length);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < response.body.data.length; i++) {
      expect(response.body.data[i].title).toEqual(expectedTags[i].title);
      expect(response.body.data[i].color).toEqual(expectedTags[i].color);
    }
  });

  test('POST /user should return 200, user has been created', async () => {
    const response = await request(app).post('/api/user', {
      userName: 'chef_tony',
    }).set('Accept', 'application/json');

    expect(response.status).toEqual(200);
  });

  test('POST /user should return 401, user already exists', async () => {
    const createUserOne = await request(app).post('/api/user')
      .send({
        userName: 'stanhan',
      }).set('Accept', 'application/json');

    expect(createUserOne.status).toEqual(401);
  });
});
