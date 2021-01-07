const { parseHTML } = require('../HTMLParser');

describe('Test the HTML Parser utility', () => {
  test('It should parse a url to HTML correctly', async () => {
    try {
      const { dom, site } = await parseHTML('https://barackobama.medium.com/how-i-approach-the-toughest-decisions-dc1b165cdf2d');
      expect(site.title).toBeTruthy();
      expect(site.content).toBeTruthy();
      expect(site.url).toBeTruthy();
      expect(/<\/?[a-z][\s\S]*>/i.test(dom)).toBe(true);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  test('It should response with an error if url is not found', async () => {
    try {
      const { dom, site } = await parseHTML('ws://localhost:1337/fakeurl');
      expect(dom).toBeDefined();
      expect(site.error).toBe(true);
      expect(site.message).toBeTruthy();
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
