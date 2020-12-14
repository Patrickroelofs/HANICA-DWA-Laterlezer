const puppeteer = require('puppeteer');

let browser;
let page;

jest.setTimeout(30000);

describe('e2e tests', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false, slowMo: 50 });
    page = await browser.newPage();
    await page.goto('http://localhost:3001');
    await page.type('#username', 'testuser');
    await page.click('#login');
  });

  test('User selects a tag and library gets filtered', async () => {
    const selectedTagTitle = await page.$eval('#compositions-list li:nth-child(2) label', (element) => element.innerText);
    await page.click('#compositions-list li:nth-child(2)');
    await page.waitFor(3000);
    const data = await page.evaluate(() => {
      const lis = Array.from(document.querySelectorAll('.articleTags span'));
      return lis.map((li) => li.innerText);
    });
    expect(data.includes(selectedTagTitle));
  });

  afterAll(() => {
    browser.close();
  });
});
