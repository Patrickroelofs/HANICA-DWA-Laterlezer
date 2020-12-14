const { parseHTML } = require('../HTMLParser');

describe('Test the HTML Parser utility', () => {
  test('It should parse a url to HTML correctly', async () => {
    const { dom, site } = await parseHTML('https://barackobama.medium.com/how-i-approach-the-toughest-decisions-dc1b165cdf2d');
    expect(site.title).toBeTruthy();
    expect(site.content).toBeTruthy();
    expect(site.url).toBeTruthy();
    expect(/<\/?[a-z][\s\S]*>/i.test(dom)).toBe(true);
  });
  test('It should response with an error if url is not found', async () => {
    const { dom, site } = await parseHTML('localhost');
    expect(site.error).toBe(true);
    expect(site.message).toBeTruthy();
  });
});

// describe('Test the HTML Serializer utility', () => {
//   test('It should serialize HTML correctly', async () => {
//     const serializedHTML = await LazyifyImages('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title></head><body><img src="https://placekitten.com/200/300" alt="random kitten"></body></html>');
//     const expected = '<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title></head><body><img class="lazy" data-src="https://placekitten.com/200/300"></body></html>';
//     expect(serializedHTML).toBe(expected);
//   });
// });
