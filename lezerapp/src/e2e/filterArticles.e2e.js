const puppeteer = require('puppeteer');

let browser;
let page;

jest.setTimeout(30000);

describe('e2e tests filter articles', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false, slowMo: 350 });
    page = await browser.newPage();
    await page.goto('http://localhost:3001');
    await page.type('#username', 'testuser');
    await page.click('#login');
  });

  test('User (de)selects a tag and library gets filtered', async () => {
    let selectedTagTitle = await page.$eval('#navList > .mx-4 > #compositions-list > .transform:nth-child(1) > .group', (element) => element.innerText);
    await page.click('#navList > .mx-4 > #compositions-list > .transform:nth-child(1) > .group');
    await page.waitFor(3000);
    const data = await page.evaluate(() => {
      const lis = Array.from(document.querySelectorAll('.articleTags span'));
      return lis.map((li) => li.innerText);
    });
    expect(data.includes(selectedTagTitle));
    // After this check, system deselects the current tag and selects another tag
    await page.click('#navList > .mx-4 > #compositions-list > .bg-gray-200 > .group');
    selectedTagTitle = await page.$eval('#navList > .mx-4 > #compositions-list > .transform:nth-child(5) > .group', (element) => element.innerText);
    await page.click('#navList > .mx-4 > #compositions-list > .transform:nth-child(5) > .group');
    await page.waitFor(3000);
    const data2 = await page.evaluate(() => {
      const lis = Array.from(document.querySelectorAll('.articleTags span'));
      return lis.map((li) => li.innerText);
    });
    expect(data2.includes(selectedTagTitle));
  });

  afterAll(() => {
    browser.close();
  });
});
