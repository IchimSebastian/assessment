const puppeteer = require('puppeteer');

async function clear (elementHandle) {
  await elementHandle.evaluate(
    element => { element.value = '' },
    elementHandle
  );
}

async function init () {
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
  
  await page.goto('https://www.rapidtables.com/convert/number/binary-to-decimal.html');

  const testValue = '253';

  console.log('Test value: ' + testValue);

  async function convert (inputValue, inputFieldSelector, convertButtonSelector, resultFieldSelector) {
    const inputElementHandle = await page.$(inputFieldSelector);
    await clear(inputElementHandle);
    await inputElementHandle.type(inputValue);
    await page.click(convertButtonSelector);
    const resultFieldElementHandle = await page.$(resultFieldSelector);
    const resultFieldElementValueJsHandle = await page.waitForFunction(
      element => element.value,
      {},
      resultFieldElementHandle
    );
    return await resultFieldElementValueJsHandle.jsonValue();
  }

  page.select('#unit1', 'Decimal');
  page.select('#unit2', 'Binary');

  await page.waitForNavigation({ waitUntil: 'load' });

  const binaryConversionResult = await convert(
    testValue,
    '#x',
    'button[title=Convert]',
    '#y'
  );

  console.log('Binary conversion result: ' + binaryConversionResult);

  page.select('#unit1', 'Binary');
  page.select('#unit2', 'Decimal');

  await page.waitForNavigation({ waitUntil: 'load' });

  const decimalConversionResult = await convert(
    binaryConversionResult,
    '#x',
    'button[title=Convert]',
    '#y'
  );

  console.log('Decimal conversion result: ' + decimalConversionResult);
  
  await page.screenshot({ path: 'decimal-conversion.png' });
  
  await page.goto('https://www.binaryhexconverter.com/decimal-to-hex-converter');

  const hexadecimalConversionResult = await convert(
    testValue,
    '#tabin',
    'input[value=Convert]',
    '#resulttxt'
  );

  console.log('Hexadecimal conversion result: ' + hexadecimalConversionResult);

  await browser.close();
}

init();
