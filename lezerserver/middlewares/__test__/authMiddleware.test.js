const auth = require('../auth.middleware');

describe('Test auth middleware', () => {
  test('Invalid username in middleware', async () => {
    const findOne = jest.fn(() => {}).mockResolvedValue(undefined);
    const status = jest.fn(() => ({ send: () => {} }));
    const next = jest.fn(() => {});

    auth.setUserModel({ findOne });
    await auth.auth({}, { status }, next);
    expect(findOne.mock.calls.length).toBe(1);

    expect(status.mock.calls.length).toBe(1);
    expect(status.mock.calls[0][0]).toBe(401);
  });

  test('successful username in middleware', async () => {
    const findOne = jest.fn(() => {}).mockResolvedValue({ id: 12 });
    const next = jest.fn(() => {});
    const req = {};

    auth.setUserModel({ findOne });
    await auth.auth(req, null, next);
    expect(findOne.mock.calls.length).toBe(1);
    expect(next.mock.calls.length).toBe(1);
    expect(req.user).toMatchObject({ id: 12 });
  });
});
