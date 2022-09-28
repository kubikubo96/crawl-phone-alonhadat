import puppeteer from "puppeteer";
import axios from "axios";
import "dotenv/config";

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--disable-site-isolation-trials", "--window-size=1900,1000", "--lang=en-US,en", "--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  await page.setViewport({
    width: 1920,
    height: 1080,
  });

  while (1) {
    /**
     * Get Data Crawl
     */
    const dataResponse = await getData();

    if (!dataResponse) {
      console.log("\n \x1b[45m FINISH ALL \x1b[0m \n");
      break;
    }

    const url_crawl = dataResponse.url_crawl;

    console.log("\n \x1b[33m url_crawl: \x1b[0m" + "\x1b[37m" + url_crawl + "\x1b[0m");
    try {
      await page.goto(url_crawl, {
        waitUntil: ["networkidle2"],
      });
    } catch (error) {}
    await page.waitForTimeout(2000);

    const elementBox = ".content_box .n-form-exercise";
    try {
      await page.waitForSelector(elementBox);
    } catch (error) {}

    const data = await page.evaluate(
      (elementBox, dataResponse) => {
        let elmBox = document.querySelector(elementBox).querySelectorAll("a.n-exercise");

        if (elmBox.length <= 0) {
          return [];
        } else {
          let data_temp = [];
          elmBox.forEach((itemBox, keyBox) => {
            data_temp.push({
              parent_id: dataResponse.id,
              url_crawl: itemBox.href,
              name: itemBox.querySelector(".n-content-exercise > span").textContent,
              class_id: dataResponse.class_id,
              category_id: dataResponse.category_id,
              class_name: dataResponse.class_name,
              category_name: dataResponse.category_name,
              book_id: dataResponse.book_id,
              book_name: dataResponse.book_name,
              level: dataResponse.level == 2 ? 3 : 4,
            });
          });
          return data_temp;
        }
      },
      elementBox,
      dataResponse
    );

    if (data.length == 0) {
      console.log("\n \x1b[43m EMPTY DATA \x1b[0m");
    }
    await saveData({ data: data, parent_id: dataResponse.id });

    console.log("\n \x1b[44m DONE 1 API \x1b[0m");

    await page.waitForTimeout(2000);
  }
})();

async function getData() {
  try {
    return await axios
      .get(process.env.HOST_API_DATA_CRAWL_QUESTION_T4)
      .then(function (response) {
        return response.data.data.data;
      })
      .catch(async function (error) {
        console.log("\x1b[31m CMS LOG: error get data crawl \x1b[0m");
        console.log(error.response.data);
      });
  } catch (error) {}
}

async function saveData(data) {
  try {
    await axios
      .post(process.env.HOST_API_STORE_DATA_CRAWL_QUESTION_T4, data)
      .then(function (response) {})
      .catch(async function (error) {
        console.log("\n \x1b[31m ERROR: catch axios saveData \x1b[0m \n");
        console.log(error.response.data);
        sendTele(error.response.data);
      });
  } catch (error) {
    console.log("\n \x1b[31m ERROR: try catch saveData \x1b[0m \n");
    console.log(error.response.data);
    sendTele(error.response.data);
  }
}

async function sendTele(error, data_tpm = [], note = "", url = "", line = 0) {
  let html = "";
  html += "<b>[Error] : </b><code>" + JSON.stringify(error) + "</code> \n";
  html += "<b>[Message] : </b><code>" + note + "</code> \n";
  html += "<b>[URL] : </b><code>" + url + "</code> \n";
  html += "<b>[Line] : </b><code>" + line + "</code> \n";
  html += "<b>[Data] : </b><code>" + JSON.stringify(data_tpm) + "</code> \n";

  try {
    await axios
      .post(process.env.TELE_URL, {
        chat_id: process.env.TELE_CHAT_ID,
        text: html,
      })
      .then(function (response) {})
      .catch(function (error) {
        console.log("\n \x1b[31m ERROR: catch axios sendTele \x1b[0m \n");
        console.log(error.response.data);
      });
  } catch (error) {
    console.log("\n \x1b[31m ERROR: try catch sendTele \x1b[0m \n");
    console.log(error.response.data);
  }
}
