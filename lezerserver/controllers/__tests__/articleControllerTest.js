/**
 * @jest-environment node
 */

'use strict';

const articleController = require('../articleController');

describe('User Model Tests', () => {
    test('Invalid username in middleware', () => {
        const findOne = jest.fn(() => {}).mockResolvedValue(undefined);
        const status = jest.fn(() => {return {send: () => {}}});
        const next = jest.fn(() => {});

        articleController.setUserModel({findOne: findOne});
        articleController.middleware({}, {status}, next).then(() => {
            expect(findOne.mock.calls.length).toBe(1);

            expect(status.mock.calls.length).toBe(1);
            expect(status.mock.calls[0][0]).toBe(401);
        });
    });

    test('successful username in middleware', () => {
        const findOne = jest.fn(() => {}).mockResolvedValue({id: 12});
        const next = jest.fn(() => {});
        const req = {};

        articleController.setUserModel({findOne: findOne});
        articleController.middleware(req, null, next).then(() => {
            expect(findOne.mock.calls.length).toBe(1);
            expect(next.mock.calls.length).toBe(1);
            expect(req.user).toMatchObject({id: 12});
        });
    });

    test('Get all the articles', () => {
        const user = {
            articles: [
                {},
                {}
            ]
        };
        const json = jest.fn(() => {});
        articleController.getArticles({user}, {json}).then(() => {
            expect(json.mock.calls.length).toBe(1);
            expect(json.mock.calls[0][0]).toMatchObject([
                {"html": null},
                {"html": null}
            ]);
        })
    });

    test('Get one article', () => {
        const user = {
            articles: [
                {_id: 12},
                {_id: 13},
            ]
        };
        const json = jest.fn(() => {});
        articleController.getArticle({user, params: {id: '12'}}, {json}).then(() => {
            expect(json.mock.calls.length).toBe(1);
            expect(json.mock.calls[0][0]).toMatchObject({_id: 12});
        })
    });

    test('Fetches site and saves successfully', async () => {
        const createArticle = jest.fn((html, url) => 1 + 1);
        const user = {createArticle, save: (fn) => fn(false)};
        const req = {body: {url: 'https://nl.lipsum.com/'}, user};
        const userModel = {findOne: user};
        const send = jest.fn(() => 't');

        articleController.createArticlePost(req, {
            status: jest.fn(() => {return { send: jest.fn(), json: jest.fn() }}),
            send: jest.fn()
        }).then(() => {
            expect(createArticle.mock.calls.length).toBe(1);
            expect(createArticle.mock.calls[0][0]).toContain('<!DOCTYPE html>');
            expect(createArticle.mock.calls[0][1]).toBe('https://nl.lipsum.com/');

            expect(send.mock.calls.length).toBe(1);
            expect(send.mock.calls[0][0]).toBe("Article created");
        });
    });

    test('Did not save', () => {
        const createArticle = jest.fn((html, url) => 1 + 1);
        const user = {createArticle, save: (fn) => fn(true)};
        const req = {body: {url: 'https://nl.lipsum.com/'}, user};
        const status = jest.fn(() => {return {send: () => {}}});

        articleController.createArticlePost(req, {status}).then(() => {
            expect(createArticle.mock.calls.length).toBe(1);
            expect(createArticle.mock.calls[0][0]).toContain('<!DOCTYPE html>');
            expect(createArticle.mock.calls[0][1]).toBe('https://nl.lipsum.com/');

            expect(status.mock.calls.length).toBe(400);
        });
    });
});
