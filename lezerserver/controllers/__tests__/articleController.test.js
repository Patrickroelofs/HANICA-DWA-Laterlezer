/**
 * @jest-environment node
 */

const articleController = require('../articleController');

describe('Article Controller Tests', () => {
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
    const req = {
      query: { tags: 'Politiek' },
      user: {
        articles: [
          {
            title: 'Test article',
            tags: [{ title: 'Politiek' }],
          },
          {
            title: 'Test article 2',
            tags: [{ title: 'Sport' }],
          },
        ],
      },
    };
    const res = { json: jest.fn(() => {}) };
    articleController.getArticles(req, res).then(() => {
      expect(res.json.mock.calls.length).toBe(1);
      expect(res.json.mock.calls[0][0].length).toEqual(1);
      expect(res.json.mock.calls[0][0][0].title).toEqual('Test article');
    });
  });

  test('Get filtered articles with two tag titles', () => {
    const req = {
      query: { tags: 'Sport,Nieuws' },
      user: {
        articles: [
          {
            title: 'Test article',
            tags: [{ title: 'Politiek' }],
          },
          {
            title: 'Test article 2',
            tags: [{ title: 'Sport' }, { title: 'Nieuws' }],
          },
        ],
      },
    };
    const res = { json: jest.fn(() => {}) };
    articleController.getArticles(req, res).then(() => {
      expect(res.json.mock.calls.length).toBe(1);
      expect(res.json.mock.calls[0][0].length).toEqual(1);
      expect(res.json.mock.calls[0][0][0].title).toEqual('Test article 2');
    });
  });

  test('update archived status', () => {
    const archive = jest.fn(() => {});
    const read = jest.fn(() => {});

    const req = {
      user: {
        articles: {
          find: () => ({
            archive,
            read,
          }),
        },
      },
      body: {
        archivedAt: '11-12-2020',
      },
    };
    const res = {
      json: jest.fn(() => {}),
    };
    articleController.updateStatus(req, res).then(() => {
      expect(archive.mock.calls.length).toBe(1);
      expect(archive.mock.calls[0][0]).toBe('11-12-2020');
      expect(res.json.mock.calls.length).toBe(1);
      expect(res.json.mock.calls[0][0]).toBe({
        archive,
        read,
      });
      expect(read.mock.calls.length).toBe(0);
    });
  });

  test('update read status', () => {
    const archive = jest.fn(() => {});
    const read = jest.fn(() => {});

    const req = {
      user: {
        articles: {
          find: () => ({
            archive,
            read,
          }),
        },
      },
      body: {
        readAt: '11-12-2020',
      },
    };
    const res = {
      json: jest.fn(() => {}),
    };
    articleController.updateStatus(req, res).then(() => {
      expect(read.mock.calls.length).toBe(1);
      expect(read.mock.calls[0][0]).toBe('11-12-2020');
      expect(res.json.mock.calls.length).toBe(1);
      expect(res.json.mock.calls[0][0]).toBe({
        archive,
        read,
      });
      expect(archive.mock.calls.length).toBe(0);
    });
  });

  test('update archived status', () => {
    const archive = jest.fn(() => {});
    const read = jest.fn(() => {});

    const req = {
      user: {
        articles: {
          find: () => ({
            archive,
            read,
          }),
        },
      },
      body: {
        archivedAt: null,
      },
    };
    const res = {
      json: jest.fn(() => {}),
    };
    articleController.updateStatus(req, res).then(() => {
      expect(archive.mock.calls.length).toBe(1);
      expect(archive.mock.calls[0][0]).toBe(null);
      expect(res.json.mock.calls.length).toBe(1);
      expect(res.json.mock.calls[0][0]).toBe({
        archive,
        read,
      });
      expect(read.mock.calls.length).toBe(0);
    });
  });

  test('update read status', () => {
    const archive = jest.fn(() => {});
    const read = jest.fn(() => {});

    const req = {
      user: {
        articles: {
          find: () => ({
            archive,
            read,
          }),
        },
      },
      body: {
        readAt: null,
      },
    };
    const res = {
      json: jest.fn(() => {}),
    };
    articleController.updateStatus(req, res).then(() => {
      expect(read.mock.calls.length).toBe(1);
      expect(read.mock.calls[0][0]).toBe(null);
      expect(res.json.mock.calls.length).toBe(1);
      expect(res.json.mock.calls[0][0]).toBe({
        archive,
        read,
      });
      expect(archive.mock.calls.length).toBe(0);
    });
  });

  test('update priority status', () => {
    const priority = jest.fn(() => {});
    const read = jest.fn(() => {});

    const req = {
      user: {
        articles: {
          find: () => ({
            priority,
            read,
          }),
        },
      },
      body: {
        prioritizedAt: '11-12-2020',
      },
    };
    const res = {
      json: jest.fn(() => {}),
    };
    articleController.updateStatus(req, res).then(() => {
      expect(priority.mock.calls.length).toBe(1);
      expect(priority.mock.calls[0][0]).toBe('11-12-2020');
      expect(res.json.mock.calls.length).toBe(1);
      expect(res.json.mock.calls[0][0]).toBe({
        priority,
        read,
      });
      expect(read.mock.calls.length).toBe(0);
    });
  });

  test('update priority status', () => {
    const priority = jest.fn(() => {});
    const read = jest.fn(() => {});

    const req = {
      user: {
        articles: {
          find: () => ({
            priority,
            read,
          }),
        },
      },
      body: {
        prioritizedAt: null,
      },
    };
    const res = {
      json: jest.fn(() => {}),
    };
    articleController.updateStatus(req, res).then(() => {
      expect(priority.mock.calls.length).toBe(1);
      expect(priority.mock.calls[0][0]).toBe('11-12-2020');
      expect(res.json.mock.calls.length).toBe(1);
      expect(res.json.mock.calls[0][0]).toBe({
        priority,
        read,
      });
      expect(read.mock.calls.length).toBe(0);
    });
  });
});
