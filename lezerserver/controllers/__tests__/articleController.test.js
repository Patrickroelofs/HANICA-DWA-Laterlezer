/**
 * @jest-environment node
 */

const articleController = require('../articleController');

describe('Article Controller Tests', () => {
  test('Get all the articles', async () => {
    const user = { _id: 12 };
    const query = {
      range: 'null',
      tags: '',
      status: 'undefined',
    };
    const json = jest.fn(() => {});
    const articles = [{ title: 'test' }];
    const model = {
      aggregate: jest.fn(() => ({
        exec: () => articles,
      })),
    };
    articleController.setUserModel(model);
    await articleController.getArticles({ user, query }, { json });
    expect(model.aggregate.mock.calls.length).toBe(1);
    expect(model.aggregate.mock.calls[0][0][0].$unwind).toBe('$articles');
    expect(model.aggregate.mock.calls[0][0][1].$match._id).toBe(user._id);
    expect(model.aggregate.mock.calls[0][0][1].$match['articles.archivedAt']).toBe(undefined);
    expect(json.mock.calls.length).toBe(1);
    expect(json.mock.calls[0][0]).toMatchObject(articles);
  });

  test('Get all the archived articles', async () => {
    const user = { _id: 12 };
    const query = {
      range: 'null',
      tags: '',
      status: 'archived',
    };
    const json = jest.fn(() => {});
    const articles = [{ title: 'test' }];
    const model = {
      aggregate: jest.fn(() => ({
        exec: () => articles,
      })),
    };
    articleController.setUserModel(model);
    await articleController.getArticles({ user, query }, { json });
    expect(model.aggregate.mock.calls.length).toBe(1);
    expect(model.aggregate.mock.calls[0][0][0].$unwind).toBe('$articles');
    expect(model.aggregate.mock.calls[0][0][1].$match._id).toBe(user._id);
    expect(model.aggregate.mock.calls[0][0][1].$match['articles.archivedAt'].$lte).toBeInstanceOf(Date);
    expect(json.mock.calls.length).toBe(1);
    expect(json.mock.calls[0][0]).toMatchObject(articles);
  });

  test('Get all the articles in range', async () => {
    const user = { _id: 12 };
    const query = {
      range: 'today',
      tags: '',
      status: 'undefined',
    };
    const json = jest.fn(() => {});
    const articles = [{ title: 'test' }];
    const model = {
      aggregate: jest.fn(() => ({
        exec: () => articles,
      })),
    };
    articleController.setUserModel(model);
    await articleController.getArticles({ user, query }, { json });
    expect(model.aggregate.mock.calls.length).toBe(1);
    expect(model.aggregate.mock.calls[0][0][0].$unwind).toBe('$articles');
    expect(model.aggregate.mock.calls[0][0][1].$match._id).toBe(user._id);
    expect(model.aggregate.mock.calls[0][0][1].$match['articles.createdAt'].$lte).toBeInstanceOf(Date);
    expect(model.aggregate.mock.calls[0][0][1].$match['articles.createdAt'].$gte).toBeInstanceOf(Date);
    expect(json.mock.calls.length).toBe(1);
    expect(json.mock.calls[0][0]).toMatchObject(articles);
  });

  test('Get one article', async () => {
    const user = {
      articles: [
        { _id: 12 },
        { _id: 13 },
      ],
    };
    const json = jest.fn(() => {});
    await articleController.getArticle({ user, params: { id: '12' } }, { json });
    expect(json.mock.calls.length).toBe(1);
    expect(json.mock.calls[0][0]).toMatchObject({ _id: 12 });
  });

  test('Fetches site and saves successfully', async () => {
    const updateOrCreateArticle = jest.fn((html, url) => 1 + 1);
    const user = { updateOrCreateArticle, save: (fn) => fn(false), articles: [{ _id: 't' }] };
    const req = { body: { url: 'https://nl.lipsum.com/' }, user };
    const status = jest.fn(() => ({ send: jest.fn(), json: jest.fn() }));
    const next = jest.fn(() => {});

    await articleController.createArticlePost(req, {
      status,
      send: jest.fn(),
    }, next);
    expect(updateOrCreateArticle.mock.calls.length).toBe(1);
    expect(updateOrCreateArticle.mock.calls[0][0]).toContain('<html>');
    expect(updateOrCreateArticle.mock.calls[0][1]).toBe('https://nl.lipsum.com/');

    expect(status.mock.calls.length).toBe(1);
    expect(status.mock.calls[0][0]).toBe(201);

    expect(next.mock.calls.length).toBe(0);
  });

  test('Did not save', async () => {
    const updateOrCreateArticle = jest.fn((html, url) => 1 + 1);
    const user = { updateOrCreateArticle, save: jest.fn((fn) => fn(true)) };
    const status = jest.fn(() => ({ send: () => {} }));
    const next = jest.fn(() => {});
    const req = { body: { url: 'https://nl.lipsum.com/' }, user };

    await articleController.createArticlePost(req, { status }, next);
    expect(user.save.mock.calls.length).toBe(1);

    expect(updateOrCreateArticle.mock.calls.length).toBe(1);
    expect(updateOrCreateArticle.mock.calls[0][0]).toContain('<html>');
    expect(updateOrCreateArticle.mock.calls[0][1]).toBe('https://nl.lipsum.com/');

    expect(status.mock.calls.length).toBe(1);
    expect(status.mock.calls[0][0]).toBe(400);
    expect(next.mock.calls.length).toBe(0);
  });

  test('Get filtered articles with one tag title', async () => {
    const user = { _id: 12 };
    const query = {
      range: 'null',
      tags: 'Politiek',
      status: 'undefined',
    };
    const json = jest.fn(() => {});
    const articles = [
      {
        title: 'Test article',
        tags: [{ title: 'Politiek' }],
      },
      {
        title: 'Test article 2',
        tags: [{ title: 'Sport' }],
      },
    ];
    const model = {
      aggregate: jest.fn(() => ({
        exec: () => articles,
      })),
    };
    articleController.setUserModel(model);
    await articleController.getArticles({ user, query }, { json });
    expect(model.aggregate.mock.calls.length).toBe(1);
    expect(model.aggregate.mock.calls[0][0][0].$unwind).toBe('$articles');
    expect(model.aggregate.mock.calls[0][0][1].$match._id).toBe(user._id);
    expect(model.aggregate.mock.calls[0][0][1].$match['articles.archivedAt']).toBe(undefined);
    expect(json.mock.calls.length).toBe(1);
    expect(json.mock.calls[0][0]).toMatchObject([
      {
        title: 'Test article',
        tags: [{ title: 'Politiek' }],
      },
    ]);
  });

  test('Get filtered articles with two tag titles', async () => {
    const user = { _id: 12 };
    const query = {
      range: 'null',
      tags: 'Politiek,News',
      status: 'undefined',
    };
    const json = jest.fn(() => {});
    const articles = [
      {
        title: 'Test article',
        tags: [{ title: 'Politiek' }, { title: 'News' }],
      },
      {
        title: 'Test article 2',
        tags: [{ title: 'Sport' }],
      },
    ];
    const model = {
      aggregate: jest.fn(() => ({
        exec: () => articles,
      })),
    };
    articleController.setUserModel(model);
    await articleController.getArticles({ user, query }, { json });
    expect(model.aggregate.mock.calls.length).toBe(1);
    expect(model.aggregate.mock.calls[0][0][0].$unwind).toBe('$articles');
    expect(model.aggregate.mock.calls[0][0][1].$match._id).toBe(user._id);
    expect(model.aggregate.mock.calls[0][0][1].$match['articles.archivedAt']).toBe(undefined);
    expect(json.mock.calls.length).toBe(1);
    expect(json.mock.calls[0][0]).toMatchObject([
      {
        title: 'Test article',
        tags: [{ title: 'Politiek' }, { title: 'News' }],
      },
    ]);
  });

  test('update archived status', async () => {
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
        save: jest.fn(() => {}),
      },
      body: {
        archivedAt: '11-12-2020',
      },
    };
    const res = {
      json: jest.fn(() => {}),
    };
    await articleController.updateStatus(req, res);
    expect(archive.mock.calls.length).toBe(1);
    expect(archive.mock.calls[0][0]).toBe('11-12-2020');
    expect(res.json.mock.calls.length).toBe(1);
    expect(res.json.mock.calls[0][0]).toMatchObject({
      archive,
      read,
    });
    expect(read.mock.calls.length).toBe(0);
  });

  test('update read status', async () => {
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
        save: jest.fn(() => {}),
      },
      body: {
        readAt: '11-12-2020',
      },
    };
    const res = {
      json: jest.fn(() => {}),
    };
    await articleController.updateStatus(req, res);
    expect(read.mock.calls.length).toBe(1);
    expect(read.mock.calls[0][0]).toBe('11-12-2020');
    expect(res.json.mock.calls.length).toBe(1);
    expect(res.json.mock.calls[0][0]).toMatchObject({
      archive,
      read,
    });
    expect(archive.mock.calls.length).toBe(0);
  });

  test('update archived status', async () => {
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
        save: jest.fn(() => {}),
      },
      body: {
        archivedAt: null,
      },
    };
    const res = {
      json: jest.fn(() => {}),
    };
    await articleController.updateStatus(req, res);
    expect(archive.mock.calls.length).toBe(1);
    expect(archive.mock.calls[0][0]).toBe(null);
    expect(res.json.mock.calls.length).toBe(1);
    expect(res.json.mock.calls[0][0]).toMatchObject({
      archive,
      read,
    });
    expect(read.mock.calls.length).toBe(0);
  });

  test('update read status', async () => {
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
        save: jest.fn(() => {}),
      },
      body: {
        readAt: null,
      },
    };
    const res = {
      json: jest.fn(() => {}),
    };
    await articleController.updateStatus(req, res);
    expect(read.mock.calls.length).toBe(1);
    expect(read.mock.calls[0][0]).toBe(null);
    expect(res.json.mock.calls.length).toBe(1);
    expect(res.json.mock.calls[0][0]).toMatchObject({
      archive,
      read,
    });
    expect(archive.mock.calls.length).toBe(0);
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
