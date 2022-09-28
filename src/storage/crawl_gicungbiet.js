import puppeteer from "puppeteer";
import axios from "axios";
import "dotenv/config";

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();

  const listPage = [
    {
      url: "https://gicungbiet.net/top-ky-thu/cong-nghe/",
      tag: "Công nghệ",
    },
    {
      url: "https://gicungbiet.net/top-ky-thu/du-lich/",
      tag: "Du lịch",
    },
    {
      url: "https://gicungbiet.net/top-ky-thu/du-lich/page/2/",
      tag: "Du lịch",
    },
    {
      url: "https://gicungbiet.net/top-ky-thu/the-gioi/",
      tag: "Thế giới",
    },
    {
      url: "https://gicungbiet.net/top-ky-thu/the-thao/",
      tag: "Thể thao",
    },
    {
      url: "https://gicungbiet.net/vat-ly/",
      tag: "Vật lý",
    },
    {
      url: "https://gicungbiet.net/vu-tru/",
      tag: "Vũ trụ",
    },
  ];
  const limit_page = listPage.length;
  let number_page = 0;

  /**
   * While list page
   */
  while (1) {
    try {
      console.log(
        "\n url page: " + listPage[number_page].url + "\n -------- \n"
      );
      await page.goto(listPage[number_page].url, {
        waitUntil: ["networkidle2"],
      });

      const listPost = await page.evaluate(() => {
        let links = document.querySelectorAll(
          ".td-main-content .td-module-title a"
        );
        links = [...links];
        let slug = links.map((link) => ({
          url: link.getAttribute("href"),
        }));
        return slug;
      });

      const limit_post = listPost.length;
      let number_post = 0;

      /**
       * While list post
       */
      while (1) {
        await page.waitForTimeout(2000);
        await page.goto(listPost[number_post].url, {
          waitUntil: ["networkidle2"],
        });
        await page.waitForTimeout(1000);

        const elmTitle = ".td-main-content .td-post-title .entry-title";
        const elmContent = ".td-main-content .td-post-content";

        const data = {
          title: "",
          content: "",
          source:
            '<p></p><p style="text-align: right;"><strong>Nguồn: </strong> gicungbiet.net </p>',
          url: page.url(),
          tag: listPage[number_page].tag,
          categories: "",
        };

        //remove menu
        await page.evaluate(() => {
          const elmMenu = document.getElementById("ez-toc-container");
          if (elmMenu) {
            elmMenu.parentNode.removeChild(elmMenu);
          }
        });

        //append break line
        await page.evaluate(() => {
          const elmFeatured = document.querySelectorAll(
            ".td-post-featured-image"
          );
          if (elmFeatured) {
            elmFeatured[0].insertAdjacentHTML("afterbegin", "<p></p><p></p>");
          }
        });

        //get content
        data.title = await page.$$eval(elmTitle, (elm) => elm[0].textContent);
        data.content = await page.$$eval(elmContent, (elm) => elm[0].innerHTML);

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
