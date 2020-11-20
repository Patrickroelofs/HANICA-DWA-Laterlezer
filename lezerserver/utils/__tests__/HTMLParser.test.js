const HTMLParser = require('../HTMLParser');

describe('Test the HTML Parser utility', () => {
  test('It should parse a url to HTML correctly', async () => {
    const html = await HTMLParser('https://www.nu.nl/');
    expect(html.title).toBeTruthy();
    expect(html.content).toBeTruthy();
    expect(html.url).toBeTruthy();
  });
  test('It should response with an error if url is not found', async () => {
    const html = await HTMLParser('fackeurl.nl');
    expect(html.error).toBe(true);
    expect(html.message).toBeTruthy();
  });
});
