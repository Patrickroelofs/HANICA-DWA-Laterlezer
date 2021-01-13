const puppeteer = require('puppeteer');

let browser;
let page;

jest.setTimeout(30000);

describe('e2e tests filter articles', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false, slowMo: 350 });
    page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto('http://localhost:3001');
    await page.type('#username', 'testuser');
    await page.click('#login');
  });

  test('User (de)selects a tag and library gets filtered', async () => {
    let selectedTagTitle = '#compositions-list > .relative:nth-child(1) > .group > .py-2 > .w-6';
    let selectedTagTitleText = await page.$eval(selectedTagTitle.toString(), (element) => element.innerText);
    await page.click(selectedTagTitle);

    const data = await page.evaluate(() => {
      const lis = Array.from(document.querySelectorAll('.articleTags span'));
      return lis.map((li) => li.innerText);
    });
    expect(data.includes(selectedTagTitleText));

    // After this check, system deselects the current tag and selects another tag
    await page.click(selectedTagTitle);

    selectedTagTitle = 'li:nth-child(6) > .border-l-2 > .relative:nth-child(1) > .group > .py-2 > .w-6';
    await page.click(selectedTagTitle);
    selectedTagTitleText = await page.$eval(selectedTagTitle, (element) => element.innerText);

    const data2 = await page.evaluate(() => {
      const lis = Array.from(document.querySelectorAll('.articleTags span'));
      return lis.map((li) => li.innerText);
    });
    expect(data2.includes(selectedTagTitleText));
  });

  afterAll(() => {
    browser.close();
  });
});
