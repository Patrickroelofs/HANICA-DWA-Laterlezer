const puppeteer = require('puppeteer');

let browser;
let page;

jest.setTimeout(30000);

xdescribe('e2e register tests', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false, slowMo: 200 });
    page = await browser.newPage();
    await page.goto('http://localhost:3001/register');
  });

  test('Register with an existing user', async () => {
    await page.type('#username', 'testuser');
    await page.click('#register');
    const errorMessage = await page.$eval('#register-error', (element) => element.innerHTML);
    expect(errorMessage).toEqual('User already exists.');
  });

  afterAll(() => {
    browser.close();
  });
});
