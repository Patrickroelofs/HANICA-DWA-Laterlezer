const puppeteer = require('puppeteer');

let browser;
let page;

jest.setTimeout(30000);

describe('e2e application flow', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false, slowMo: 200 });
    page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
  });

  test('Register with an existing user', async () => {
    await page.goto('http://localhost:3001/register');
    await page.type('#username', 'testuser');
    await page.click('#register');
    const errorMessage = await page.$eval('#register-error', (element) => element.innerHTML);
    expect(errorMessage).toEqual('User already exists.');
  });

  test('Register a new user', async () => {
    await page.goto('http://localhost:3001/register');
    await page.type('#username', 'newUser');
    await page.click('#register');
    expect(page.url()).toEqual('http://localhost:3001/app');
    await page.click('#logOut');
    expect(page.url()).toEqual('http://localhost:3001/login');
  });

  test('Login with an not existing user', async () => {
    await page.goto('http://localhost:3001/login');
    await page.type('#username', 'fakeuser');
    await page.click('#login');
    const errorMessage = await page.$eval('#login-error', (element) => element.innerHTML);
    expect(errorMessage).toEqual('User does not exists');
  });

  test('Login with an existing user', async () => {
    await page.goto('http://localhost:3001/login');
    await page.type('#username', 'testuser');
    await page.click('#login');
    expect(page.url()).toEqual('http://localhost:3001/app');
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
    await page.click(selectedTagTitle);
  });

  test('User opens article', async () => {
    await page.click('article:first-child');
    expect(await page.$$('#center')).toBeDefined();
  });

  test('User adds tag to article', async () => {
    await page.click('#addTagsToArticle');
    expect(await page.$$('#tagSelectPopup')).toBeDefined();

    await page.click('#tagSelectPopup > .mx-3 > .inline-block:nth-child(3)');
    const selectedTags = await page.$eval('#tagSelectPopup > .mx-3 > .inline-block:nth-child(3)', (element) => element.innerText);

    await page.waitForSelector('.min-h-screen #saveTagsToArticle');
    await page.click('.min-h-screen #saveTagsToArticle');

    await page.waitForSelector('body > #root > .min-h-screen > .min-h-full > .min-h-screen');
    await page.click('body > #root > .min-h-screen > .min-h-full > .min-h-screen');
    const tag = await page.$eval('.articleTags > [type="button"]:first-child', (element) => element.innerText);

    expect(selectedTags).toContain(tag);
    await page.click('#backButton');
    expect(page.url()).toEqual('http://localhost:3001/app');
  });
});
