const puppeteer = require('puppeteer');
const axios = require('axios');

let browser;
let page;
let id;

jest.setTimeout(30000);

xdescribe('e2e tests filter articles', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false, slowMo: 350 });
    page = await browser.newPage();
    await page.goto('http://localhost:3001');
    await page.type('#username', 'testuser');
    await page.click('#login');
  });

  test('Check if extension adds article site will automatically update', async () => {
    await page.waitForSelector('.container > .mt-12');
    const res = await axios.post('http://localhost:3000/api/articles', { url: 'http://www.loremipsum.nl/' }, {
      headers: {
        Username: 'testuser',
      },
    });
    id = res.data.data;
    await page.waitForSelector('.container > .mt-12 > a:nth-child(1) > .grid > .col-span-3');
    const isExistend = await page.evaluate(() => {
      const titles = Array.from(document.querySelectorAll('.container > .mt-12 > a:nth-child(1) > .grid > .col-span-3 strong'));
      console.log(titles);
      return titles.filter((title) => title.innerText === 'Lorem ipsum').length;
    });
    expect(isExistend).toBe(1);
  });

  afterAll(async () => {
    await axios.delete(`http://localhost:3000/api/articles/${id}`, {
      headers: {
        Username: 'testuser',
      },
    });
    browser.close();
  });
});
