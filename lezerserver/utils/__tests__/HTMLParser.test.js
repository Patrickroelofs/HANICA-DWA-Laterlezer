const { parseHTML, serializeHTML } = require('../HTMLParser');

describe('Test the HTML Parser utility', () => {
  test('It should parse a url to HTML correctly', async () => {
    const html = await parseHTML('https://www.nu.nl/');
    expect(html.title).toBeTruthy();
    expect(html.content).toBeTruthy();
    expect(html.url).toBeTruthy();
  });
  test('It should response with an error if url is not found', async () => {
    const html = await parseHTML('fackeurl.nl');
    expect(html.error).toBe(true);
    expect(html.message).toBeTruthy();
  });
});

describe('Test the HTML Serializer utility', () => {
  test('It should serialize HTML correctly', async () => {
    const serializedHTML = await serializeHTML('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title></head><body><img src="https://placekitten.com/200/300" alt="random kitten"></body></html>');
    const expected = '<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title></head><body><img class="lazy" data-src="https://placekitten.com/200/300"></body></html>';
    expect(serializedHTML).toBe(expected);
  });
});
