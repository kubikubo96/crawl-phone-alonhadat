import puppeteer from "puppeteer";
import axios from "axios";
import "dotenv/config";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--disable-site-isolation-trials", "--window-size=1900,1000", "--lang=en-US,en", "--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  await page.setViewport({
    width: 1920,
    height: 1080,
  });

  const listPage = [];
  const startPage = 1;
  const endPage = 30;
  for (let i = endPage; i >= startPage; i--) {
    const itemPage = {
      url: "https://surfacepro.vn/tin-tuc/thu-thuat-su-dung.html?p=" + i,
      tag: ["Thủ Thuật & Ứng Dụng"],
    };
    listPage.push(itemPage);
  }

  const source_crawl = "https://surfacepro.vn";
  const limit_page = listPage.length;
  let number_page = 0;

  /**
   * While list page
   */
  while (1) {
    try {
      console.log("\n Url page: " + listPage[number_page].url + "\n -------- \n");
      try {
        await page.goto(listPage[number_page].url, {
          waitUntil: ["networkidle2"],
        });
      } catch (error) {}

      const listPost = await page.evaluate((source_crawl) => {
        let links = document.querySelectorAll(".main-news-left .info h3 a");
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

        const elmTitle = ".block-info h1";
        const elmContent = ".news-block .asset-content";
        const elmLink = ".news-block .asset-content a";
        page.waitForSelector(elmTitle);
        page.waitForSelector(elmContent);

        const data = {
          title: "",
          content: "",
          source: '<p></p><p style="text-align: right;color: #909090;font-style: italic;"><strong>Nguồn: </strong> ' + source_crawl + " </p>",
          url_crawl: page.url(),
          tag: listPage[number_page].tag,
          seo_tag_description: "",
        };

        //start: remove trash
        try {
          await page.$$eval(".asset-content > p > strong", (elms) => {
            elms = [...elms];
            return elms.map((elm) => {
              elm.remove();
            });
          });
        } catch (error) {}

        try {
          await page.$$eval(".top-news", (elms) => {
            elms = [...elms];
            return elms.map((elm) => {
              elm.remove();
            });
          });
        } catch (error) {}

        try {
          await page.$$eval(".adsbygoogle", (elms) => {
            elms = [...elms];
            return elms.map((elm) => {
              elm.remove();
            });
          });
        } catch (error) {}

        try {
          await page.$$eval(".adsense", (elms) => {
            elms = [...elms];
            return elms.map((elm) => {
              elm.remove();
            });
          });
        } catch (error) {}

        try {
          await page.$$eval(".in-article", (elms) => {
            elms = [...elms];
            return elms.map((elm) => {
              elm.remove();
            });
          });
        } catch (error) {}

        try {
          await page.$$eval(".adszone", (elms) => {
            elms = [...elms];
            return elms.map((elm) => {
              elm.remove();
            });
          });
        } catch (error) {}

        try {
          await page.$$eval(".adstopimage", (elms) => {
            elms = [...elms];
            return elms.map((elm) => {
              elm.remove();
            });
          });
        } catch (error) {}

        try {
          await page.$$eval(".adsviewed", (elms) => {
            elms = [...elms];
            return elms.map((elm) => {
              elm.remove();
            });
          });
        } catch (error) {}

        try {
          await page.$$eval("div.toc", (elms) => {
            elms = [...elms];
            return elms.map((elm) => {
              elm.remove();
            });
          });
        } catch (error) {}

        try {
          await page.$$eval(
            elmLink,
            (elms) => {
              elms = [...elms];
              return elms.map((elm, source_crawl) => {
                if (elm.href.indexOf("http") !== -1 || elm.href.indexOf(source_crawl) !== -1) {
                  elm.outerHTML = elm.textContent;
                }
              });
            },
            source_crawl
          );
        } catch (error) {}

        try {
          await page.$$eval("iframe.lazy", (elms) => {
            return elms.map((elm) => {
              elms = [...elms];
              elm.remove();
            });
          });
        } catch (error) {}
        //start: remove trash

        //start: replace src iamge
        await page.waitForTimeout(5000);
        try {
          await page.$$eval(
            ".asset-content .__wimage img",
            (elms, source_crawl) => {
              return elms.forEach((elm) => {
                elms = [...elms];
                elm.src = elm.src.replace("..", source_crawl);
              });
            },
            source_crawl
          );
        } catch (error) {}
        //end: replace src iamge

        data.title = await page.$$eval(elmTitle, (elm) => elm[0].textContent);
        data.content = await page.$$eval(elmContent, (elm) => elm[0].innerHTML);
        data.seo_tag_description = await page.$$eval(elmContent, (elm) => elm[0].textContent.slice(0, 137) + "...");

        /**
         * Save data
         */
        if (data.content.length > 0) {
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
