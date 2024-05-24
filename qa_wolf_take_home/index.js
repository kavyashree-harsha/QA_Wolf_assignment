// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");
const ExcelJs = require('exceljs');

async function saveHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com");

  //Create Excel sheet to update result
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile("./OutputExcel.xlsx");
  const worksheet = workbook.getWorksheet('Sheet1');
  let articleNumber = 10;
  
  //Iterate and fetch the title and the url of first 10 articles
  for(let i=0, rowcount=2; i<(articleNumber*2); i=i+2, rowcount++){
    
      const title = await page.locator(".title a").nth(i).textContent();
      const url = await page.locator(".title a").nth(i+1).textContent();
      let cellTitle = await worksheet.getCell(rowcount, 1);
      let cellUrl = await worksheet.getCell(rowcount, 2);
      //Fetch rows and update the cell values with title and url fetch from website
      cellTitle.value = title;
      cellUrl.value = url;
      //write values to excel sheet and update
      await workbook.xlsx.writeFile("./OutputExcel.xlsx");
  }
  await page.close();
}

(async () => {
  await saveHackerNewsArticles();
})();
