/**
 * @jest-environment node
 */

const mongoose = require('mongoose');
const moment = require('moment');
require('../article');

const Article = mongoose.model('Article');
let article;

describe('Article Model Tests', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/testUserDB', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
  });

  beforeEach(async () => {
    article = await Article.create({});
  });

  test('Check if article archived at is now when no date given', () => {
    article.archive();
    expect(article.archivedAt).toBeInstanceOf(Date);
  });

  test('Check if article archived at is now when a date is given', () => {
    const date = moment();
    article.archive(date);
    expect(article.archivedAt.toISOString()).toBe(date.toISOString());
  });

  test('Check if article is unarchived when null is given', () => {
    article.archive(null);
    expect(article.archivedAt).toBe(null);
  });

  test('Check if article archived at is now when no date given', () => {
    article.read();
    expect(article.readAt).toBeInstanceOf(Date);
  });

  test('Check if article archived at is now when a date is given', () => {
    const date = moment();
    article.read(date);
    expect(article.readAt.toISOString()).toBe(date.toISOString());
  });

  test('Check if article is unarchived when null is given', () => {
    article.read(null);
    expect(article.readAt).toBe(null);
  });

  test('Check if tags are deleted from article ', async () => {
    await article.addTag({
      title: 'voetbal',
      color: '#00FF00',
    });
    await article.addTag({
      title: 'ajax',
      color: '#00FF00',
    });

    const tag1 = article.tags[0];
    const tag2 = article.tags[1];
    await article.deleteTags([tag1]);

    expect(article.tags).toContain(tag2);
    expect(article.tags).not.toContain(tag1);
  });

  afterEach(async () => {
    await Article.deleteMany({});
  });

  afterAll(async () => {
    await Article.disconnect();
  });
});
