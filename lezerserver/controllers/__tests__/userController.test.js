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
      ],
    });
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async (done) => {
    mongoose.disconnect(done);
  });

  test('POST /tags should return response with status 201', async () => {
    const response = await request(app).post('/api/tags')
      .send({
        parent: {
          _id: 1,
          title: 'testTag',
          color: '#123122',
          children: [],
        },
        tag: {
          _id: 2,
          title: 'javascript',
          color: '#FF0000',
          children: [],
        },
      })
      .set('Username', 'stanhan')
      .set('Accept', 'application/json');
    expect(response.status).toEqual(201);
    expect(response.body.message).toEqual('Tag created');
    expect(response.body.success).toEqual(true);
  });

  // TODO: Need to update this test after bugfix #242 is pushed
  xtest('POST /tags  should return bad request response, Subtag can\'t have the same title as the parent.', async () => {
    const response = await request(app).post('/api/tags')
      .send({
        parent: {
          children: [],
        },
        tag: {
          _id: 2,
          title: 'javascript',
          color: '#FF0000',
          children: [],
        },
      })
      .set('Username', 'stanhan');
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual('Subtag can\'t have the same title as the parent.');
    expect(response.body.success).toEqual(false);
  });

  test('POST /tags should return bad request response, user doesnt exist', async () => {
    const response = await request(app).post('/api/tags')
      .send({
        tags: [
          {
            title: 'testTag',
            color: '#123122',
            children: [],
          }],
      })
      .set('Username', 'stanwew')
      .set('Accept', 'application/json');
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual('User does not exists');
    expect(response.body.success).toEqual(false);
  });

  test('GET /tags should return bad request response, user doesnt exist', async () => {
    const response = await request(app).get('/api/tags').set('Username', 'stantest');

    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual('User does not exists');
    expect(response.body.success).toEqual(false);
  });

  test('GET /tags should return all tags from user stanhan and give the right response', async () => {
    const response = await request(app).get('/api/tags').set('Username', 'stanhan');
    const expectedTags = [{
      _id: '6',
      title: 'javascript',
      color: '#123122',
      children: [],
    }, {
      _id: '26',
      title: 'politiek',
      color: '#00ff00',
      children: [],
    }];

    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual('All tags from stanhan');
    expect(response.body.success).toEqual(true);

    expect(response.body.data.length).toEqual(expectedTags.length);

    for (let i = 0; i < response.body.data.length; i += 1) {
      expect(response.body.data[i].title).toEqual(expectedTags[i].title);
      expect(response.body.data[i].color).toEqual(expectedTags[i].color);
    }
  });

  // I really don't know whats wrong with this test... ~ Imre Boersma
  xtest('POST /user should return 200, user has been created', async () => {
    const response = await request(app).post('/api/user').send({ userName: 'user_tony' });
    expect(response.status).toEqual(200);
  });

  test('POST /user should return 401, user already exists', async () => {
    const response = await request(app).post('/api/user')
      .send({
        userName: 'stanhan',
      }).set('Accept', 'application/json');

    expect(response.status).toEqual(401);
  });
});
