import puppeteer from "puppeteer";
import axios from "axios";
import "dotenv/config";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    // args: ['--window-size=1900,1000'],
  });
  const page = await browser.newPage();

  // 4 cap
  const listPage = [
    {
      url: "https://loigiaihay.com/sgk-toan-7-ket-noi-tri-thuc-c807.html",
      class: "lop-7",
      category: "toan-hoc",
      book: "ket-noi-tri-thuc",
      name: "SGK Toán - Kết nối tri thức",
      title: "sgk-toan-7-ket-noi-tri-thuc-c807",
    },
    {
      url: "https://loigiaihay.com/sgk-toan-7-chan-troi-sang-tao-c808.html",
      class: "lop-7",
      category: "toan-hoc",
      book: "chan-troi-sang-tao",
      name: "SGK Toán - Chân trời sáng tạo",
      title: "sgk-toan-7-chan-troi-sang-tao-c808",
    },
    {
      url: "https://loigiaihay.com/sgk-toan-7-canh-dieu-c809.html",
      class: "lop-7",
      category: "toan-hoc",
      book: "canh-dieu",
      name: "SGK Toán - Cánh diều",
      title: "sgk-toan-7-canh-dieu-c809",
    },
    {
      url: "https://loigiaihay.com/sgk-toan-10-ket-noi-tri-thuc-c811.html",
      class: "lop-10",
      category: "toan-hoc",
      book: "ket-noi-tri-thuc",
      name: "SGK Toán - Kết nối tri thức",
      title: "sgk-toan-10-ket-noi-tri-thuc-c811",
    },
    {
      url: "https://loigiaihay.com/sgk-toan-10-chan-troi-sang-tao-c868.html",
      class: "lop-10",
      category: "toan-hoc",
      book: "chan-troi-sang-tao",
      name: "SGK Toán - Chân trời sáng tạo",
      title: "sgk-toan-10-chan-troi-sang-tao-c868",
    },
    {
      url: "https://loigiaihay.com/sgk-toan-10-canh-dieu-c859.html",
      class: "lop-10",
      category: "toan-hoc",
      book: "canh-dieu",
      name: "SGK Toán - Cánh diều",
      title: "sgk-toan-10-canh-dieu-c859",
    },
    {
      url: "https://loigiaihay.com/toan-lop-11-nang-cao-c202.html",
      class: "lop-11",
      category: "toan-hoc",
      book: "",
      name: "SGK Toán Nâng cao",
      title: "toan-lop-11-nang-cao-c202",
    },
    {
      url: "https://loigiaihay.com/toan-lop-12-nang-cao-c201.html",
      class: "lop-12",
      category: "toan-hoc",
      book: "",
      name: "SGK Toán 12 nâng cao",
      title: "toan-lop-12-nang-cao-c201",
    },
  ];

  const limitPage = listPage.length;
  let numberPage = 0;

  /**
   * While list data
   */
  while (1) {
    try {
      console.log("\n Url page: " + listPage[numberPage].url + "\n -------- \n");
      try {
        await page.goto(listPage[numberPage].url, {
          // waitUntil: ["networkidle2"],
        });
      } catch (error) {
        console.log(error);
      }
      await page.waitForSelector(".box.clearfix.font-opensans-b > div");
      await page.waitForTimeout(3000);

      let data_category = [];

      let _url_crawl = page.url();

      data_category = await page.evaluate(
        (listPage, numberPage, _url_crawl) => {
          let elementDiv = document.querySelectorAll(".box.clearfix.font-opensans-b > div");
          let elementH2 = document.querySelectorAll(".box.clearfix.font-opensans-b h2.title-event-parent");
          let element_t1 = document.querySelectorAll(".box.clearfix.font-opensans-b div.subject-item");
          let element_t2 = document.querySelectorAll(".box.clearfix.font-opensans-b ul.clearfix.font-16 > li");

          let data = [
            {
              name: listPage[numberPage].name,
              title: listPage[numberPage].name,
              parent_title: listPage[numberPage].title,
              class: listPage[numberPage].class,
              category: listPage[numberPage].category,
              book: listPage[numberPage].book,
              url_crawl: _url_crawl,
              has_sub_category: 1,
              order: 1,
              child: [],
            },
          ];

          if (elementH2[0] && elementH2[0].textContent) {
            data.forEach((item, key) => {
              let key_child_data = 1;
              elementDiv.forEach((item, key) => {
                let element_t1 = item.querySelectorAll("div.subject-item");
                let element_t2 = item.querySelectorAll("ul.clearfix.font-16 > li");
                if (element_t1.length) {
                  //loai 1
                  element_t1.forEach((item_c1, key_c1) => {
                    let temp_child_1 = {
                      name: item_c1.querySelector("h2 > a > strong").textContent.trim() + " - " + elementH2[key].textContent.trim(),
                      title: item_c1.querySelector("h2 > a > strong").textContent.trim() + " - " + elementH2[key].textContent.trim(),
                      parent_title: data[0].title,
                      class: listPage[numberPage].class,
                      category: listPage[numberPage].category,
                      book: listPage[numberPage].book,
                      url_crawl: item_c1.querySelector("h2 > a").href,
                      has_sub_category: 1,
                      order: key_child_data,
                      child: [],
                    };
                    key_child_data++;

                    let element_child_2 = item_c1.querySelectorAll("ul li a span");
                    if (element_child_2.length) {
                      element_child_2.forEach((item_c2, key_c2) => {
                        let temp_child_2 = {
                          name: item_c2.textContent.trim(),
                          title: item_c2.textContent.trim(),
                          parent_title: temp_child_1.title,
                          class: listPage[numberPage].class,
                          category: listPage[numberPage].category,
                          book: listPage[numberPage].book,
                          url_crawl: item_c2.closest("a").href,
                          has_sub_category: 1,
                          order: key_c2 + 1,
                        };

                        temp_child_1.child.push(temp_child_2);
                      });
                    }

                    data[0].child.push(temp_child_1);
                  });
                } else {
                  //loai 2
                  if (element_t2.length) {
                    element_t2.forEach((item_c1, key_c1) => {
                      let temp_child_1 = {
                        name: item_c1.querySelector("a").textContent.trim() + " - " + elementH2[key].textContent.trim(),
                        title: item_c1.querySelector("a").textContent.trim() + " - " + elementH2[key].textContent.trim(),
                        parent_title: data[0].title,
                        class: listPage[numberPage].class,
                        category: listPage[numberPage].category,
                        book: listPage[numberPage].book,
                        url_crawl: item_c1.querySelector("a").href,
                        has_sub_category: 1,
                        order: key_child_data,
                        child: [],
                      };
                      key_child_data++;

                      let element_child_2 = item_c1.querySelectorAll("ul.list-posts.clearfix li");
                      if (element_child_2.length) {
                        element_child_2.forEach((item_c2, key_c2) => {
                          let temp_child_2 = {
                            name: item_c2.querySelector("a").textContent.trim(),
                            title: item_c2.querySelector("a").textContent.trim(),
                            parent_title: temp_child_1.title,
                            class: listPage[numberPage].class,
                            category: listPage[numberPage].category,
                            book: listPage[numberPage].book,
                            url_crawl: item_c2.querySelector("a").href,
                            has_sub_category: 1,
                            order: key_c2 + 1,
                          };

                          temp_child_1.child.push(temp_child_2);
                        });
                      }

                      data[0].child.push(temp_child_1);
                    });
                  }
                }
              });
            });
          } else {
            data.forEach((item, key) => {
              //loai 1
              if (element_t1.length) {
                element_t1.forEach((item_c1, key_c1) => {
                  let temp_child_1 = {
                    name: item_c1.querySelector("h2 > a > strong").textContent.trim(),
                    title: item_c1.querySelector("h2 > a > strong").textContent.trim(),
                    parent_title: data[0].title,
                    class: listPage[numberPage].class,
                    category: listPage[numberPage].category,
                    book: listPage[numberPage].book,
                    url_crawl: "",
                    has_sub_category: 1,
                    order: key_c1 + 1,
                    child: [],
                  };

                  let element_child_2 = item_c1.querySelectorAll("ul li a span");
                  if (element_child_2.length) {
                    element_child_2.forEach((item_c2, key_c2) => {
                      let temp_child_2 = {
                        name: item_c2.textContent.trim(),
                        title: item_c2.textContent.trim(),
                        parent_title: temp_child_1.title,
                        class: listPage[numberPage].class,
                        category: listPage[numberPage].category,
                        book: listPage[numberPage].book,
                        url_crawl: item_c2.closest("a").href,
                        has_sub_category: 1,
                        order: key_c2 + 1,
                      };

                      temp_child_1.child.push(temp_child_2);
                    });
                  }

                  data[0].child.push(temp_child_1);
                });
              }

              //loai 2
              if (element_t2.length) {
                element_t2.forEach((item_c1, key_c1) => {
                  let temp_child_1 = {
                    name: item_c1.querySelector("a").textContent.trim(),
                    title: item_c1.querySelector("a").textContent.trim(),
                    parent_title: data[0].title,
                    class: listPage[numberPage].class,
                    category: listPage[numberPage].category,
                    book: listPage[numberPage].book,
                    url_crawl: "",
                    has_sub_category: 1,
                    order: key_c1 + 1,
                    child: [],
                  };

                  let element_child_2 = item_c1.querySelectorAll("ul.list-posts.clearfix li");
                  if (element_child_2.length) {
                    element_child_2.forEach((item_c2, key_c2) => {
                      let temp_child_2 = {
                        name: item_c2.querySelector("a").textContent.trim(),
                        title: item_c2.querySelector("a").textContent.trim(),
                        parent_title: temp_child_1.title,
                        class: listPage[numberPage].class,
                        category: listPage[numberPage].category,
                        book: listPage[numberPage].book,
                        url_crawl: item_c2.querySelector("a").href,
                        has_sub_category: 1,
                        order: key_c2 + 1,
                      };

                      temp_child_1.child.push(temp_child_2);
                    });
                  }

                  data[0].child.push(temp_child_1);
                });
              }
            });
          }

          return data;
        },
        listPage,
        numberPage,
        _url_crawl
      );

      await saveData({ data: data_category });

      console.log("\n DONE: " + listPage[numberPage].url);

      numberPage = numberPage + 1;

      /**
       * Finish
       */
      if (numberPage >= limitPage) {
        console.log("\n************* !!! FINISH ALL !!!! ************* \n");
        break;
      }
    } catch (error) {
      console.log(error);
    }
  }

  await browser.close();
})();

async function saveData(data) {
  try {
    await axios
      .post(process.env.HOST_API_CRAWL_PARENT_TYPE_4, data)
      .then(function (response) {})
      .catch(function (error) {
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
