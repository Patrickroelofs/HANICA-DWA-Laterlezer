/**
 * @jest-environment node
 */

const request = require('supertest');
const app = require('../../app');
const articleController = require('../articleController');

describe('Article Model Tests', () => {
  test('Returns error when invalid URL is supplied', async () => {
    const response = await request(app).post('/api/articles').send({ url: 'fackeurl.nl', tags: [] }).set('Username', 'stanhan');
    expect(response.status).toBe(406);
  });

  test('')

  test('Get all the articles', () => {
    const user = {
      articles: [
        {},
        {},
      ],
    };
    const json = jest.fn(() => {});
    articleController.getArticles({ user }, { json }).then(() => {
      expect(json.mock.calls.length).toBe(1);
      expect(json.mock.calls[0][0]).toMatchObject([
        { },
        { },
      ]);
    });
  });

  test('Get one article', () => {
    const user = {
      articles: [
        { _id: 12 },
        { _id: 13 },
      ],
    };
    const json = jest.fn(() => {});
    articleController.getArticle({ user, params: { id: '12' } }, { json }).then(() => {
      expect(json.mock.calls.length).toBe(1);
      expect(json.mock.calls[0][0]).toMatchObject({ _id: 12 });
    });
  });

  test('Fetches site and saves successfully', async () => {
    const createArticle = jest.fn((html, url) => 1 + 1);
    const user = { createArticle, save: (fn) => fn(false) };
    const req = { body: { url: 'https://nl.lipsum.com/' }, user };
    const send = jest.fn(() => 't');

    articleController.createArticlePost(req, {
      status: jest.fn(() => ({ send: jest.fn(), json: jest.fn() })),
      send: jest.fn(),
    }).then(() => {
      expect(createArticle.mock.calls.length).toBe(1);
      expect(createArticle.mock.calls[0][0]).toContain('<!DOCTYPE html>');
      expect(createArticle.mock.calls[0][1]).toBe('https://nl.lipsum.com/');

      expect(send.mock.calls.length).toBe(1);
      expect(send.mock.calls[0][0]).toBe('Article created');
    });
  });

  test('Did not save', () => {
    const req = { body: { url: 'https://nl.lipsum.com/' } };
    const createArticle = jest.fn((html, url) => 1 + 1);
    const findOne = jest.fn(() => {}).mockResolvedValue({ createArticle, save: (fn) => fn(true) });
    const userModel = { findOne };
    const status = jest.fn(() => ({ send: () => {} }));

    articleController.createArticlePost(req, { status }).then(() => {
      expect(findOne.mock.calls.length).toBe(1);

      expect(createArticle.mock.calls.length).toBe(1);
      expect(createArticle.mock.calls[0][0]).toContain('<!DOCTYPE html>');
      expect(createArticle.mock.calls[0][1]).toBe('https://nl.lipsum.com/');

      expect(status.mock.calls.length).toBe(400);
    });
  });

  test('Get filtered articles with one tag title', () => {
    const req = { query: { title: 'Politiek' }, user: { getArticlesByTags: jest.fn(() => []) } };
    const res = { json: jest.fn(() => {}) };
    articleController.getArticlesByTags(req, res).then(() => {
      expect(req.user.getArticlesByTags.mock.calls.length).toBe(1);
      expect(req.user.getArticlesByTags.mock.calls[0][0]).toEqual(['Politiek']);
    });
  });

  test('Get filtered articles with multiple tag titles', () => {
    const req = { query: { title: ['Politiek', 'Fun'] }, user: { getArticlesByTags: jest.fn(() => []) } };
    const res = { json: jest.fn(() => {}) };
    articleController.getArticlesByTags(req, res).then(() => {
      expect(req.user.getArticlesByTags.mock.calls.length).toBe(1);
      expect(req.user.getArticlesByTags.mock.calls[0][0]).toEqual(['Politiek', 'Fun']);
    });
  });
});
