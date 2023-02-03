const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const animalsPath = path.resolve('./animals.json');

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

const main = async () => {
  const browser = await puppeteer.launch({headless: false}); // default is true
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
  );

  await page.goto("https://web.whatsapp.com/");

  // random class of whatsapp web
  await page.waitForSelector("._3gYev");
  await delay(5000);

  // selecting first chat
  await page.click(`div[data-testid='list-item-0']`);

  // selecting text editor
  const editor = await page.$('div[class="_3Uu1_"]');
  await editor.focus();
  const animalsArray = JSON.parse(fs.readFileSync(animalsPath));
  
  for (let i = 0; i < animalsArray.length; i += 1) {
    await page.evaluate((animalName) => {
      const message = `Adilson é um ${animalName}`;
      document.execCommand("insertText", false, message);
    }, animalsArray[i]);
    await page.click("span[data-testid='send']");
    await delay(500);
  }

}

main();
