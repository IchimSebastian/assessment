const puppeteer = require('puppeteer');

const config = require('./config');
const Authenticator = require('./authenticator');

const credentials = config.ieeeCredentials;

async function loginToIeee () {
  const browser = await puppeteer.launch({
    headless: false,
    args: [ '--start-fullscreen' ]
  });

  const pages = await browser.pages();
  const page = pages[0];

  await page.setViewport({
    width: 1920,
    height: 1080,
  });
  
  await page.goto('https://www.ieee.org/');
  await page.click('.sign-in-cls');

  const usernameFieldSelector = '#username';
  const passwordFieldSelector = '#password';
  const signinButtonSelector = '#modalWindowRegisterSignInBtn';

  await page.waitForSelector(usernameFieldSelector, { visible: true });

  const authenticator = new Authenticator(
    page,
    usernameFieldSelector,
    passwordFieldSelector,
    signinButtonSelector,
    credentials.username,
    credentials.password
  );

  await authenticator.login();

  await browser.close();
}

loginToIeee();
