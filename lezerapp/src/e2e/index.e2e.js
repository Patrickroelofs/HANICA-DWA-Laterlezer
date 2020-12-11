const puppeteer = require('puppeteer');

let browser;
let page;

const DELETE_ALL_TAGS_BUTTON = '.css-tlfecz-indicatorContainer:nth-of-type(1)';
const OPEN_ADD_TAGS_DROPDOWN = '.css-tlfecz-indicatorContainer';

jest.setTimeout(30000);

xdescribe('e2e tests', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false, slowMo: 50 });
    page = await browser.newPage();
    await page.goto('http://localhost:3001');
    await page.type('#username', 'testuser');
    await page.click('#login');
  });

  test('User opens article', async () => {
    await page.click('article:first-child');
    expect(await page.$$('#center')).toBeDefined();
  });

  test('User removes all tags from article', async () => {
    await page.click('#addTagsToArticle');
    expect(await page.$$('#tagSelectPopup')).toBeDefined();
    // if statement if articleTags is defined
    // if (await page.$$(DELETE_ALL_TAGS_BUTTON)) {
    await page.click(DELETE_ALL_TAGS_BUTTON);
    // }
    await page.click('#saveTagsToArticle');
    expect(await page.$$('.articleTags:first-child')).toStrictEqual([]);
    await page.click('#addTagsToArticle');
  });

  test('User adds tag to article', async () => {
    await page.click('#addTagsToArticle');
    expect(await page.$$('#tagSelectPopup')).toBeDefined();
    await page.waitForSelector(OPEN_ADD_TAGS_DROPDOWN);
    if (await page.$$(OPEN_ADD_TAGS_DROPDOWN)) {
      await page.click(OPEN_ADD_TAGS_DROPDOWN);
    }
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.click('#saveTagsToArticle');
    expect(await page.$$('.articleTags:first-child')).toBeDefined();
  });

  afterAll(() => {
    browser.close();
  });
});
