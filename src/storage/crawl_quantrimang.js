import puppeteer from "puppeteer";
import axios from "axios";
import "dotenv/config";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      "--disable-site-isolation-trials",
      "--window-size=1900,1000",
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

  const listPage = [];
  const startPage = 1;
  const endPage = 47;
  for (let i = startPage; i <= endPage; i++) {
    const itemPage = {
      url: "https://quantrimang.com/suc-khoe?dataType=ajax&p=" + i,
      tag: ["Sức khỏe"],
    };
    listPage.push(itemPage);
  }

  const source_crawl = "https://quantrimang.com";
  const limit_page = listPage.length;
  let number_page = 0;

  /**
   * While list page
   */
  while (1) {
    try {
      console.log(
        "\n Url page: " + listPage[number_page].url + "\n -------- \n"
      );
      try {
        await page.goto(listPage[number_page].url, {
          waitUntil: ["networkidle2"],
        });
      } catch (error) {}

      const listPost = await page.evaluate((source_crawl) => {
        let links = document.querySelectorAll(".listitem a.title");
        links = [...links];
        let slug = links.map((link) => ({
          url: source_crawl + link.getAttribute("href"),
        }));
        return slug;
      }, source_crawl);

      const limit_post = listPost.length;
      let number_post = 0;

      /**
       * While list post
       */
      while (1) {
        try {
          await page.goto(listPost[number_post].url, {
            waitUntil: ["networkidle2"],
          });
        } catch (error) {}
        await page.waitForTimeout(5000);

        await page.evaluate(() => {
          window.scrollTo(0, document.body.scrollHeight);
        });
        await page.waitForTimeout(5000);

        const elmTitle = ".post-detail h1";
        const elmContent = ".post-detail .content-detail";
        page.waitForSelector(elmTitle);
        page.waitForSelector(elmContent);

        const data = {
          title: "",
          content: "",
          source:
            '<p></p><p style="text-align: right;"><strong>Nguồn: </strong> quantrimang.com </p>',
          url_crawl: page.url(),
          tag: listPage[number_page].tag,
          seo_tag_description: "",
        };

        //start: remove trash
        try {
          await page.$$eval(".top-news", (elms) => {
            return elms.map((elm) => {
              elms = [...elms];
              elm.remove();
            });
          });
        } catch (error) {}

        try {
          await page.$$eval(".adsbygoogle", (elms) => {
            return elms.map((elm) => {
              elms = [...elms];
              elm.remove();
            });
          });
        } catch (error) {}

        try {
          await page.$$eval(".adsense", (elms) => {
            return elms.map((elm) => {
              elms = [...elms];
              elm.remove();
            });
          });
        } catch (error) {}

        try {
          await page.$$eval(".in-article", (elms) => {
            return elms.map((elm) => {
              elms = [...elms];
              elm.remove();
            });
          });
        } catch (error) {}

        try {
          await page.$$eval(".adszone", (elms) => {
            return elms.map((elm) => {
              elms = [...elms];
              elm.remove();
            });
          });
        } catch (error) {}

        try {
          await page.$$eval(".adstopimage", (elms) => {
            return elms.map((elm) => {
              elms = [...elms];
              elm.remove();
            });
          });
        } catch (error) {}

        try {
          await page.$$eval(".adsviewed", (elms) => {
            return elms.map((elm) => {
              elms = [...elms];
              elm.remove();
            });
          });
        } catch (error) {}

        try {
          await page.$$eval("div.toc", (elms) => {
            return elms.map((elm) => {
              elms = [...elms];
              elm.remove();
            });
          });
        } catch (error) {}
        //start: remove trash

        //replace src iamge
        await page.waitForTimeout(5000);
        try {
          await page.$$eval(".content-detail img", (elms) => {
            return elms.forEach((elm) => {
              elms = [...elms];
              elm.src = elm.getAttribute("data-src")
                ? elm.getAttribute("data-src")
                : elm.src;
            });
          });
        } catch (error) {}

        //start: remove trash
        try {
          await page.$$eval("iframe.lazy", (elms) => {
            return elms.map((elm) => {
              elms = [...elms];
              elm.remove();
            });
          });
        } catch (error) {}
        //end: remove trash

        data.title = await page.$$eval(elmTitle, (elm) => elm[0].textContent);
        data.content = await page.$$eval(elmContent, (elm) => elm[0].innerHTML);
        data.seo_tag_description = await page.$$eval(
          elmContent,
          (elm) => elm[0].textContent.slice(0, 137) + "..."
        );

        /**
         * Save data
         */
        if (data.content.length > 0) {
          data.content = data.content + data.source;
          console.log(data.title + "\n");
          saveData(data);
        }
        number_post = number_post + 1;
        /**
         * Done 1 page
         */
        if (number_post >= limit_post) {
          number_page = number_page + 1;
          console.log("\n -- DONE 1 PAGE -- \n");
          break;
        }
      }
    } catch (error) {
      console.log(error);
    }

    /**
     * Finish
     */
    if (number_page >= limit_page) {
      console.log("\n************* !!! FINISH ALL !!!! ************* \n");
      break;
    }
  }

  await browser.close();
})();

async function saveData(data) {
  try {
    await axios
      .post(process.env.HOST_API, data)
      .then(function (response) {})
      .catch(function (error) {
        console.log("\n ---  \n ERROR SAVE DATABASE \n ---  \n ");
        console.log(error.response.data);
      });
  } catch (error) {}
}
