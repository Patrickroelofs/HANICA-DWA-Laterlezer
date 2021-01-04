/**
 * @jest-environment node
 */

const tagController = require('../tagController');

describe('Tag Controller Tests', () => {
  test('Delete tags', async () => {
    const user = {
      deleteTag: jest.fn(async () => null),
      save: jest.fn(async () => null),
    };
    const body = {
      tag: {
        title: 'voetbal',
        color: '#00ff00',
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
