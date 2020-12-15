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

  afterEach(async () => {
    await Article.deleteMany({});
  });

  afterAll(async () => {
    await Article.disconnect();
  });
});
