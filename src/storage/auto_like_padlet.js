import puppeteer from "puppeteer";

(async () => {
  while (1) {
    const browser = await puppeteer.launch({
      headless: false,
      args: [
        "--disable-site-isolation-trials",
        "--window-size=1900,1000",
        "--window-position=3000,0",
        "--lang=en-US,en",
        "--no-sandbox",
        "--disable-setuid-sandbox",
      ],
    });
    const page = await browser.newPage();

    await page.setViewport({
      width: 1920,
      height: 1080,
    });

    await page.goto("https://padlet.com/quangcanh118/8dnpcryokze8yx3r/wish/2315285614", {
      waitUntil: ["networkidle2"],
    });

    await page.waitForTimeout(15000);

    let elm = ".cursor-pointer.flex.flex-row.items-center.text-light-text-200";

    try {
      await page.click(elm);
    } catch (error) {
      console.log(error);
    }

    await browser.close();
  }
})();
