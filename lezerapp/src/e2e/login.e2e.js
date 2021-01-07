const puppeteer = require('puppeteer');

let browser;
let page;

jest.setTimeout(30000);

xdescribe('e2e login tests', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false, slowMo: 200 });
    page = await browser.newPage();
    await page.goto('http://localhost:3001');
  });

  test('Login with an existing user', async () => {
    await page.type('#username', 'testuser');
    await page.click('#login');
    expect(page.url()).toEqual('http://localhost:3001/app');
    await page.click('#logout');
  });

  test('Login with an not existing user', async () => {
    await page.type('#username', 'fakeuser');
    await page.click('#login');
    const errorMessage = await page.$eval('#login-error', (element) => element.innerHTML);
    expect(errorMessage).toEqual('User not found');
  });

  afterAll(() => {
    browser.close();
  });
});
