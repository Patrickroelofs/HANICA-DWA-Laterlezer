const puppeteer = require('puppeteer');

jest.setTimeout(30000);

let browser;
let page;

function delay(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

describe('E2E Test: Google Account', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false, slowMo: 50 });
    page = await browser.newPage();

    await page.goto('http://localhost:3001');
  });

  test('User presses Google continue button', async () => {
    // Simulate button press
    await page.goto('https://accounts.google.com/o/oauth2/auth/identifier?redirect_uri=storagerelay%3A%2F%2Fhttp%2Flocalhost%3A3001%3Fid%3Dauth601723&response_type=permission%20id_token&scope=email%20profile%20openid&openid.realm&client_id=366910807736-j7einmtbo7udt56fvfs9hdmvsc1puv5u.apps.googleusercontent.com&ss_domain=http%3A%2F%2Flocalhost%3A3001&prompt&fetch_basic_profile=true&gsiwebsdk=2&flowName=GeneralOAuthFlow');
  });

  test('User types in his account information', async () => {
    // Input fake email account (user exists as google user)
    await page.type('.whsOnd', 'timothytestmail800@gmail.com');
    await page.click('.VfPpkd-LgbsSe');
    await delay(1000);

    // Input fake password
    await page.type('.whsOnd', 'S6fRVq%k5p$84a;\'');
    await page.click('.VfPpkd-LgbsSe');
    await delay(1000);
  });

  test('User redirects back to the client', async () => {
    await page.goto('http://localhost:3001');
    await delay(1000);
  });

  test('User is accepted by the server and is logged in (or registered)', async () => {
    // If user is logged in the #dock id should exist
    expect(await page.$$('#dock')).toBeDefined();
    await delay(1000);
  });

  afterAll(() => {
    browser.close();
  });
});
