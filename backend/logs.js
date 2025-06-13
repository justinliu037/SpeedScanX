require("dotenv").config();
const puppeteer = require("puppeteer");

async function getRouterLogs() {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // 1. Routerseite laden
    await page.goto("http://speedport.ip", {
      waitUntil: "domcontentloaded",
      timeout: 20000 // erhöhte Timeout für schwache Router-CPUs
    });

    const password = process.env.ROUTER_PASSWORD;
    if (!password) {
      return { success: false, error: "ROUTER_PASSWORD nicht gesetzt in .env" };
    }

    // 2. Warten auf das Passwortfeld
    await page.waitForSelector("#router_password", { timeout: 15000 });
    await page.type("#router_password", password);

    // 3. Enter drücken oder Login klicken
    await Promise.all([
      page.keyboard.press("Enter"),
      page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 15000 })
    ]);

    // 4. Log-Seite aufrufen
    await page.goto("http://speedport.ip/html/content/overview/log.html", {
      waitUntil: "domcontentloaded",
      timeout: 10000
    });

    // 5. Logs extrahieren
    const logs = await page.evaluate(() => {
      return Array.from(document.querySelectorAll(".logTable tr"))
        .map(row => row.innerText.trim())
        .filter(line => line.length > 0);
    });

    await browser.close();
    return { success: true, logs };

  } catch (error) {
    return { success: false, error: error.message };
  }
}

module.exports = { getRouterLogs };
