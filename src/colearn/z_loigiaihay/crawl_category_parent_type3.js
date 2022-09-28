import puppeteer from "puppeteer";
import axios from "axios";
import "dotenv/config";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    // args: ['--window-size=1900,1000'],
  });
  const page = await browser.newPage();

  // 3 cap
  const listPage = [
    {
      url: "https://loigiaihay.com/soan-van-6-ket-noi-tri-thuc-voi-cuoc-song-sieu-ngan-c632.html",
      class: "lop-6",
      category: "ngu-van",
      book: "ket-noi-tri-thuc",
      name: "Soạn văn siêu ngắn - KNTT",
      title: "soan-van-6-ket-noi-tri-thuc-voi-cuoc-song-sieu-ngan-c632",
    },
    {
      url: "https://loigiaihay.com/soan-van-6-ket-noi-tri-thuc-voi-cuoc-song-chi-tiet-c630.html",
      class: "lop-6",
      category: "ngu-van",
      book: "ket-noi-tri-thuc",
      name: "Soạn văn chi tiết - KNTT",
      title: "soan-van-6-ket-noi-tri-thuc-voi-cuoc-song-chi-tiet-c630",
    },
    {
      url: "https://loigiaihay.com/soan-van-6-chan-troi-sang-tao-sieu-ngan-c627.html",
      class: "lop-6",
      category: "ngu-van",
      book: "chan-troi-sang-tao",
      name: "Soạn văn siêu ngắn - CTST",
      title: "soan-van-6-chan-troi-sang-tao-sieu-ngan-c627",
    },
    {
      url: "https://loigiaihay.com/soan-van-6-chan-troi-sang-tao-chi-tiet-c629.html",
      class: "lop-6",
      category: "ngu-van",
      book: "chan-troi-sang-tao",
      name: "Soạn văn chi tiết - KNTT",
      title: "soan-van-6-chan-troi-sang-tao-chi-tiet-c629",
    },
    {
      url: "https://loigiaihay.com/soan-van-6-canh-dieu-sieu-ngan-c633.html",
      class: "lop-6",
      category: "ngu-van",
      book: "canh-dieu",
      name: "Soạn văn siêu ngắn - Cánh diều",
      title: "soan-van-6-canh-dieu-sieu-ngan-c633",
    },
    {
      url: "https://loigiaihay.com/soan-van-6-canh-dieu-chi-tiet-c635.html",
      class: "lop-6",
      category: "ngu-van",
      book: "canh-dieu",
      name: "Soạn văn chi tiết - Cánh diều",
      title: "soan-van-6-canh-dieu-chi-tiet-c635",
    },
    {
      url: "https://loigiaihay.com/tieng-anh-6-chan-troi-sang-tao-friends-plus-c644.html",
      class: "lop-6",
      category: "tieng-anh",
      book: "chan-troi-sang-tao",
      name: "Tiếng anh 6 - Friends plus",
      title: "tieng-anh-6-chan-troi-sang-tao-friends-plus-c644",
    },
    {
      url: "https://loigiaihay.com/tieng-anh-6-ilearn-smart-world-c647.html",
      class: "lop-6",
      category: "tieng-anh",
      book: "",
      name: "Tiếng anh 6 - iLearn Smart World",
      title: "tieng-anh-6-ilearn-smart-world-c647.html",
    },
    {
      url: "https://loigiaihay.com/tieng-anh-6-right-on-c649.html",
      class: "lop-6",
      category: "tieng-anh",
      book: "",
      name: "Giải tiếng Anh 6 Right on",
      title: "tieng-anh-6-right-on-c649",
    },
    {
      url: "https://loigiaihay.com/tieng-anh-6-english-discovery-c648.html",
      class: "lop-6",
      category: "tieng-anh",
      book: "",
      name: " Giải tiếng Anh 6 English Discovery",
      title: "tieng-anh-6-english-discovery-c648.html",
    },
    {
      url: "https://loigiaihay.com/tieng-anh-6-canh-dieu-explore-english-c646.html",
      class: "lop-6",
      category: "tieng-anh",
      book: "",
      name: "Tiếng anh 6 - Explore English",
      title: "tieng-anh-6-canh-dieu-explore-english-c646",
    },
    {
      url: "https://loigiaihay.com/soan-van-7-ket-noi-tri-thuc-sieu-ngan-c830.html",
      class: "lop-7",
      category: "ngu-van",
      book: "ket-noi-tri-thuc",
      name: "Soạn Văn siêu ngắn - Kết nối tri thức",
      title: "",
    },
    {
      url: "https://loigiaihay.com/soan-van-7-ket-noi-tri-thuc-chi-tiet-c839.html",
      class: "lop-7",
      category: "ngu-van",
      book: "ket-noi-tri-thuc",
      name: "Soạn Văn chi tiết - Kết nối tri thức",
      title: "",
    },
    {
      url: "https://loigiaihay.com/soan-van-7-canh-dieu-sieu-ngan-c835.html",
      class: "lop-7",
      category: "ngu-van",
      book: "canh-dieu",
      name: "Soạn Văn siêu ngắn - Cánh diều",
      title: "",
    },
    {
      url: "https://loigiaihay.com/soan-van-7-canh-dieu-chi-tiet-c836.html",
      class: "lop-7",
      category: "ngu-van",
      book: "canh-dieu",
      name: "Soạn Văn chi tiết - Cánh diều",
      title: "",
    },
    {
      url: "https://loigiaihay.com/soan-van-7-chan-troi-sang-tao-sieu-ngan-c832.html",
      class: "lop-7",
      category: "ngu-van",
      book: "chan-troi-sang-tao",
      name: "Soạn Văn siêu ngắn - Chân trời sáng tạo",
      title: "",
    },
    {
      url: "https://loigiaihay.com/soan-van-7-chan-troi-sang-tao-chi-tiet-c843.html",
      class: "lop-7",
      category: "ngu-van",
      book: "chan-troi-sang-tao",
      name: "Soạn Văn chi tiết - Chân trời sáng tạo",
      title: "",
    },
    {
      url: "https://loigiaihay.com/tieng-anh-lop-7-global-success-c139.html",
      class: "lop-7",
      category: "tieng-anh",
      book: "",
      name: "Tiếng Anh - Global Success",
      title: "tieng-anh-lop-7-global-success-c139",
    },
    {
      url: "https://loigiaihay.com/tieng-anh-7-friends-plus-c866.html",
      class: "lop-7",
      category: "tieng-anh",
      book: "",
      name: "Tiếng Anh - Friends plus",
      title: "tieng-anh-7-friends-plus-c866",
    },
    {
      url: "https://loigiaihay.com/tieng-anh-7-ilearn-smart-world-c903.html",
      class: "lop-7",
      category: "tieng-anh",
      book: "",
      name: "Tiếng Anh - iLearn Smart World",
      title: "tieng-anh-7-ilearn-smart-world-c903",
    },
    {
      url: "https://loigiaihay.com/tieng-anh-7-right-on-c916.html",
      class: "lop-7",
      category: "tieng-anh",
      book: "",
      name: "Tiếng Anh - Right on",
      title: "tieng-anh-7-right-on-c916",
    },
    {
      url: "https://loigiaihay.com/tieng-anh-7-english-discovery-c909.html",
      class: "lop-7",
      category: "tieng-anh",
      book: "",
      name: "Tiếng Anh - English Discovery",
      title: "tieng-anh-7-english-discovery-c909",
    },
    {
      url: "https://loigiaihay.com/soan-van-9-sieu-ngan-c441.html",
      class: "lop-9",
      category: "ngu-van",
      book: "",
      name: "Soạn văn siêu ngắn",
      title: "soan-van-9-sieu-ngan-c441",
    },
    {
      url: "https://loigiaihay.com/ngu-van-lop-9-c36.html",
      class: "lop-9",
      category: "ngu-van",
      book: "",
      name: "Soạn văn chi tiết",
      title: "ngu-van-lop-9-c36.html",
    },
    {
      url: "https://loigiaihay.com/tieng-anh-lop-9-c76.html",
      class: "lop-9",
      category: "tieng-anh",
      book: "",
      name: "SGK Tiếng Anh lớp 9",
      title: "tieng-anh-lop-9-c76",
    },
    {
      url: "https://loigiaihay.com/tieng-anh-lop-9-moi-c141.html",
      class: "lop-9",
      category: "tieng-anh",
      book: "",
      name: "SGK Tiếng Anh lớp 9 mới",
      title: "tieng-anh-lop-9-moi-c141",
    },
    {
      url: "https://loigiaihay.com/soan-van-10-kntt-sieu-ngan-c812.html",
      class: "lop-10",
      category: "ngu-van",
      book: "ket-noi-tri-thuc",
      name: "Soạn Văn siêu ngắn - Kết nối tri thức",
      title: "soan-van-10-kntt-sieu-ngan-c812",
    },
    {
      url: "https://loigiaihay.com/soan-van-10-ket-noi-tri-thuc-chi-tiet-c851.html",
      class: "lop-10",
      category: "ngu-van",
      book: "ket-noi-tri-thuc",
      name: "Soạn Văn chi tiết - Kết nối tri thức",
      title: "soan-van-10-ket-noi-tri-thuc-chi-tiet-c851",
    },
    {
      url: "https://loigiaihay.com/soan-van-10-canh-dieu-sieu-ngan-c852.html",
      class: "lop-10",
      category: "ngu-van",
      book: "canh-dieu",
      name: "Soạn Văn siêu ngắn - Cánh diều",
      title: "soan-van-10-canh-dieu-sieu-ngan-c852",
    },
    {
      url: "https://loigiaihay.com/soan-van-10-canh-dieu-chi-tiet-c853.html",
      class: "lop-10",
      category: "ngu-van",
      book: "canh-dieu",
      name: "Soạn Văn chi tiết - Cánh diều",
      title: "soan-van-10-canh-dieu-chi-tiet-c853",
    },
    {
      url: "https://loigiaihay.com/soan-van-10-chan-troi-sang-tao-sieu-ngan-c886.html",
      class: "lop-10",
      category: "ngu-van",
      book: "chan-troi-sang-tao",
      name: "Soạn Văn siêu ngắn - Chân trời sáng tạo",
      title: "soan-van-10-chan-troi-sang-tao-sieu-ngan-c886",
    },
    {
      url: "https://loigiaihay.com/soan-van-10-chan-troi-sang-tao-chi-tiet-c887.html",
      class: "lop-10",
      category: "ngu-van",
      book: "chan-troi-sang-tao",
      name: "Soạn Văn chi tiết - Chân trời sáng tạo",
      title: "soan-van-10-chan-troi-sang-tao-chi-tiet-c887",
    },
    {
      url: "https://loigiaihay.com/tieng-anh-10-global-success-c818.html",
      class: "lop-10",
      category: "tieng-anh",
      book: "",
      name: "Tiếng Anh - Global Success",
      title: "tieng-anh-10-global-success-c818",
    },
    {
      url: "https://loigiaihay.com/tieng-anh-10-friends-global-c867.html",
      class: "lop-10",
      category: "tieng-anh",
      book: "",
      name: "Tiếng Anh - Friends plus",
      title: "tieng-anh-10-friends-global-c867",
    },
    {
      url: "https://loigiaihay.com/tieng-anh-10-ilearn-smart-world-c934.html",
      class: "lop-10",
      category: "tieng-anh",
      book: "",
      name: "Tiếng Anh - iLearn Smart World",
      title: "tieng-anh-10-ilearn-smart-world-c934",
    },
    {
      url: "https://loigiaihay.com/tieng-anh-10-english-discovery-c946.html",
      class: "lop-10",
      category: "tieng-anh",
      book: "",
      name: "Tiếng Anh - English Discovery",
      title: "tieng-anh-10-english-discovery-c946",
    },
    {
      url: "https://loigiaihay.com/tieng-anh-10-bright-c1014.html",
      class: "lop-10",
      category: "tieng-anh",
      book: "",
      name: "Tiếng Anh - Bright",
      title: "tieng-anh-10-bright-c1014",
    },
    {
      url: "https://loigiaihay.com/tieng-anh-10-explore-new-worlds-c947.html",
      class: "lop-10",
      category: "tieng-anh",
      book: "",
      name: "Tiếng Anh - Explore New Worlds",
      title: "tieng-anh-10-explore-new-worlds-c947",
    },
    {
      url: "https://loigiaihay.com/soan-van-11-sieu-ngan-c215.html",
      class: "lop-11",
      category: "ngu-van",
      book: "",
      name: "Soạn Văn siêu ngắn",
      title: "soan-van-11-sieu-ngan-c215",
    },
    {
      url: "https://loigiaihay.com/ngu-van-lop-11-c38.html",
      class: "lop-11",
      category: "ngu-van",
      book: "",
      name: "Soạn Văn chi tiết",
      title: "ngu-van-lop-11-c38",
    },
    {
      url: "https://loigiaihay.com/tieng-anh-lop-11-c78.html",
      class: "lop-11",
      category: "tieng-anh",
      book: "",
      name: "SGK Tiếng Anh",
      title: "tieng-anh-lop-11-c78",
    },
    {
      url: "https://loigiaihay.com/tieng-anh-lop-11-moi-c142.html",
      class: "lop-11",
      category: "tieng-anh",
      book: "",
      name: "SGK Tiếng Anh mới",
      title: "tieng-anh-lop-11-moi-c142",
    },
    {
      url: "https://loigiaihay.com/soan-van-12-sieu-ngan-c214.html",
      class: "lop-12",
      category: "ngu-van",
      book: "",
      name: "Soạn Văn siêu ngắn",
      title: "soan-van-12-sieu-ngan-c214",
    },
    {
      url: "https://loigiaihay.com/ngu-van-lop-12-c30.html",
      class: "lop-12",
      category: "ngu-van",
      book: "",
      name: "Soạn Văn chi tiết",
      title: "ngu-van-lop-12-c30",
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
      .post(process.env.HOST_API_CRAWL_PARENT_TYPE_3, data)
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
