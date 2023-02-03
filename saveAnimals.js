const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const animalsPath = path.resolve('./animals.json');

const main = async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.goto('https://www.peritoanimal.com.br/nomes-de-animais-de-a-a-z-23628.html');

  const textos = await page.$$eval("li", (el) => {
    return el.map(e => e.innerText.replace(/\ \(.*/g, ''));
  });

  fs.writeFileSync(animalsPath, JSON.stringify(textos));
  console.log('fim');
}

main();
