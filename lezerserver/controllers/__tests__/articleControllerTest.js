/**
 * @jest-environment node
 */

'use strict';

const articleController = require('../articleController');

describe('User Model Tests', () => {
    test('Fetches site and saves successfully', async () => {
        const req = {body: {url: 'https://nl.lipsum.com/'}};
        const createArticle = jest.fn((html, url) => 1 + 1);
        const findOne = jest.fn(() => {}).mockResolvedValue({createArticle, save: (fn) => fn(false)});
        const userModel = {findOne: findOne};
        const send = jest.fn(() => 't');

        articleController.setUserModel(userModel);
        articleController.createArticlePost(req, {
            status: jest.fn(() => {return { send: jest.fn(), json: jest.fn() }}),
            send: jest.fn()
        }).then(() => {
            expect(findOne.mock.calls.length).toBe(1);

            expect(createArticle.mock.calls.length).toBe(1);
            expect(createArticle.mock.calls[0][0]).toContain('<!DOCTYPE html>');
            expect(createArticle.mock.calls[0][1]).toBe('https://nl.lipsum.com/');

            expect(send.mock.calls.length).toBe(1);
            expect(send.mock.calls[0][0]).toBe("Article created");
        });
    });

    test('Invalid username', () => {
        const req = {body: {url: 'https://nl.lipsum.com/'}};
        const findOne = jest.fn(() => {}).mockResolvedValue(undefined);
        const status = jest.fn(() => {return {json: () => {}}});

        articleController.setUserModel({findOne: findOne});
        articleController.createArticlePost(req, {status}).then(() => {
            expect(findOne.mock.calls.length).toBe(1);

            expect(status.mock.calls.length).toBe(1);
            expect(status.mock.calls[0][0]).toContain(500);
        });
    })

    test('Did not save', () => {
        const req = {body: {url: 'https://nl.lipsum.com/'}};
        const createArticle = jest.fn((html, url) => 1 + 1);
        const findOne = jest.fn(() => {}).mockResolvedValue({createArticle, save: (fn) => fn(true)});
        const userModel = {findOne: findOne};
        const status = jest.fn(() => {return {send: () => {}}});

        articleController.setUserModel(userModel);
        articleController.createArticlePost(req, {status}).then(() => {
            expect(findOne.mock.calls.length).toBe(1);

            expect(createArticle.mock.calls.length).toBe(1);
            expect(createArticle.mock.calls[0][0]).toContain('<!DOCTYPE html>');
            expect(createArticle.mock.calls[0][1]).toBe('https://nl.lipsum.com/');

            expect(status.mock.calls.length).toBe(400);
        });
    })
});
