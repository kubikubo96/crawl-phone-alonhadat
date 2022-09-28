import puppeteer from "puppeteer";
import axios from "axios";
import "dotenv/config";
import fs from "fs";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    // args: ['--window-size=1900,1000'],
  });
  const page = await browser.newPage();

  await page.setViewport({
    width: 1920,
    height: 1080,
  });

  const listTopic = [
    { class: "lop-12", url: "https://vungoi.vn/lop-12/bai-tap-mon-toan-s5af3ead5f4ed8c11759c1ade.html", name: "toan-hoc" },
    { class: "lop-12", url: "https://vungoi.vn/lop-12/bai-tap-mon-ly-s5af3ead5f4ed8c11759c1add.html", name: "vat-ly" },
    { class: "lop-12", url: "https://vungoi.vn/lop-12/bai-tap-mon-hoa-s5af3ead5f4ed8c11759c1adc.html", name: "hoa-hoc" },
    { class: "lop-12", url: "https://vungoi.vn/lop-12/bai-tap-mon-sinh-s5af3ead5f4ed8c11759c1adb.html", name: "sinh-hoc" },
    { class: "lop-12", url: "https://vungoi.vn/lop-12/bai-tap-mon-van-s5d14722fbcafcc004810c09f.html", name: "ngu-van" },
    { class: "lop-12", url: "https://vungoi.vn/lop-12/bai-tap-mon-tieng-anh-s5b7f644c5b9305855ffadced.html", name: "tieng-anh" },
    { class: "lop-12", url: "https://vungoi.vn/lop-12/bai-tap-tieng-anh-moi-s5f1e3ac59d96250022154460.html", name: "tieng-anh" },
    { class: "lop-12", url: "https://vungoi.vn/lop-12/bai-tap-mon-su-s5b3d7dd3d9e263cf2e5a16c3.html", name: "lich-su" },
    { class: "lop-12", url: "https://vungoi.vn/lop-12/bai-tap-mon-dia-s5b3d7ddcd9e263cf2e5a16c4.html", name: "dia-ly" },
    { class: "lop-12", url: "https://vungoi.vn/lop-12/bai-tap-mon-gdcd-s5d61eaf3ea5cb900220fa953.html", name: "gdcd" },
    { class: "lop-11", url: "https://vungoi.vn/lop-11/bai-tap-mon-toan-s5af3ead5f4ed8c11759c1ada.html", name: "toan-hoc" },
    { class: "lop-11", url: "https://vungoi.vn/lop-11/bai-tap-mon-ly-s5af3ead5f4ed8c11759c1ad9.html", name: "vat-ly" },
    { class: "lop-11", url: "https://vungoi.vn/lop-11/bai-tap-mon-hoa-s5af3ead5f4ed8c11759c1ad8.html", name: "hoa-hoc" },
    { class: "lop-11", url: "https://vungoi.vn/lop-11/bai-tap-mon-sinh-s5af3ead5f4ed8c11759c1ad7.html", name: "sinh-hoc" },
    { class: "lop-11", url: "https://vungoi.vn/lop-11/bai-tap-mon-van-s5d27f350b61e270022a3de56.html", name: "ngu-van" },
    { class: "lop-11", url: "https://vungoi.vn/lop-11/bai-tap-mon-tieng-anh-s5b973d94f6a5ee7ceb80254d.html", name: "tieng-anh" },
    { class: "lop-11", url: "https://vungoi.vn/lop-11/bai-tap-mon-su-s5b4420e893a762d51f053d0c.html", name: "lich-su" },
    { class: "lop-11", url: "https://vungoi.vn/lop-11/bai-tap-mon-dia-s5b4420df93a762d51f053d0b.html", name: "dia-ly" },
    { class: "lop-11", url: "https://vungoi.vn/lop-11/bai-tap-mon-gdcd-s5d649a38ea5cb900220fb076.html", name: "gdcd" },
    { class: "lop-10", url: "https://vungoi.vn/lop-10/bai-tap-mon-toan-s5af4fb832ad9a772d286b076.html", name: "toan-hoc" },
    { class: "lop-10", url: "https://vungoi.vn/lop-10/bai-tap-mon-ly-s5af4fbb12ad9a772d286b077.html", name: "vat-ly" },
    { class: "lop-10", url: "https://vungoi.vn/lop-10/bai-tap-mon-hoa-s5af4fbbe2ad9a772d286b078.html", name: "hoa-hoc" },
    { class: "lop-10", url: "https://vungoi.vn/lop-10/bai-tap-mon-sinh-s5af4fbc82ad9a772d286b079.html", name: "sinh-hoc" },
    { class: "lop-10", url: "https://vungoi.vn/lop-10/bai-tap-mon-van-s5d27f36ab61e270022a3de67.html", name: "ngu-van" },
    { class: "lop-10", url: "https://vungoi.vn/lop-10/bai-tap-mon-tieng-anh-s5b988fbcf6a5ee7ceb803bee.html", name: "tieng-anh" },
    { class: "lop-10", url: "https://vungoi.vn/lop-10/bai-tap-mon-su-s5b4420ed93a762d51f053d0d.html", name: "lich-su" },
    { class: "lop-10", url: "https://vungoi.vn/lop-10/bai-tap-mon-dia-s5b4420f993a762d51f053d0e.html", name: "dia-ly" },
    { class: "lop-10", url: "https://vungoi.vn/lop-10/bai-tap-mon-gdcd-s5d649a40ea5cb900220fb077.html", name: "gdcd" },
    { class: "lop-9", url: "https://vungoi.vn/lop-9/bai-tap-mon-toan-s5af4fbec2ad9a772d286b07a.html", name: "toan-hoc" },
    { class: "lop-9", url: "https://vungoi.vn/lop-9/bai-tap-mon-ly-s5af4fbf72ad9a772d286b07b.html", name: "vat-ly" },
    { class: "lop-9", url: "https://vungoi.vn/lop-9/bai-tap-mon-hoa-s5af4fbff2ad9a772d286b07c.html", name: "hoa-hoc" },
    { class: "lop-9", url: "https://vungoi.vn/lop-9/bai-tap-mon-van-s5d27f37db61e270022a3de68.html", name: "ngu-van" },
    { class: "lop-9", url: "https://vungoi.vn/lop-9/bai-tap-mon-sinh-s5af4fc072ad9a772d286b07d.html", name: "sinh-hoc" },
    { class: "lop-9", url: "https://vungoi.vn/lop-9/bai-tap-mon-tieng-anh-s5d0b3a877635f40022d87212.html", name: "tieng-anh" },
    { class: "lop-9", url: "https://vungoi.vn/lop-9/bai-tap-mon-su-s5bbda9ae9104c05521d2968d.html", name: "lich-su" },
    { class: "lop-9", url: "https://vungoi.vn/lop-9/bai-tap-mon-dia-s5b44210293a762d51f053d0f.html", name: "dia-ly" },
    { class: "lop-8", url: "https://vungoi.vn/lop-8/bai-tap-mon-toan-s5b163881c2ac60899def12cf.html", name: "toan-hoc" },
    { class: "lop-8", url: "https://vungoi.vn/lop-8/bai-tap-mon-ly-s5b3dc4ded9e263cf2e5a17fb.html", name: "vat-ly" },
    { class: "lop-8", url: "https://vungoi.vn/lop-8/bai-tap-mon-hoa-s5b3dc4f3d9e263cf2e5a17fd.html", name: "hoa-hoc" },
    { class: "lop-8", url: "https://vungoi.vn/lop-8/bai-tap-mon-sinh-s5b3dc4ead9e263cf2e5a17fc.html", name: "sinh-hoc" },
    { class: "lop-8", url: "https://vungoi.vn/lop-8/bai-tap-mon-van-s5d27f38db61e270022a3de69.html", name: "ngu-van" },
    { class: "lop-8", url: "https://vungoi.vn/lop-8/bai-tap-mon-tieng-anh-s5d27f2c9b61e270022a3de36.html", name: "tieng-anh" },
    { class: "lop-8", url: "https://vungoi.vn/lop-8/bai-tap-mon-su-s5bd9664aa3bed83ae090b8b9.html", name: "lich-su" },
    { class: "lop-8", url: "https://vungoi.vn/lop-8/bai-tap-mon-dia-s5bd966aca3bed83ae090b8c4.html", name: "dia-ly" },
    { class: "lop-7", url: "https://vungoi.vn/lop-7/bai-tap-mon-toan-s5b484cb4012b49a67790894a.html", name: "toan-hoc" },
    { class: "lop-7", url: "https://vungoi.vn/lop-7/bai-tap-mon-ly-s5b484ce4012b49a677908950.html", name: "vat-ly" },
    { class: "lop-7", url: "https://vungoi.vn/lop-7/bai-tap-mon-sinh-s5b484ced012b49a677908951.html", name: "sinh-hoc" },
    { class: "lop-7", url: "https://vungoi.vn/lop-7/bai-tap-mon-van-s5d27f39ab61e270022a3de6a.html", name: "ngu-van" },
    { class: "lop-7", url: "https://vungoi.vn/lop-7/bai-tap-mon-tieng-anh-s5d27f2f5b61e270022a3de41.html", name: "tieng-anh" },
    { class: "lop-7", url: "https://vungoi.vn/lop-7/bai-tap-mon-su-s5bd96662a3bed83ae090b8bb.html", name: "lich-su" },
    { class: "lop-7", url: "https://vungoi.vn/lop-7/bai-tap-mon-dia-s5bd966a1a3bed83ae090b8c2.html", name: "dia-ly" },
    {
      class: "lop-6",
      url: "https://vungoi.vn/lop-6/bai-tap-mon-toan-s60f53a74cceecce653496b80.html",
      name: "toan-hoc",
      topic_parent_top: "LUYỆN BTTN MÔN TOÁN - LỚP 6 SÁCH KẾT NỐI TRI THỨC VỚI CUỘC SỐNG",
    },
    {
      class: "lop-6",
      url: "https://vungoi.vn/lop-6/bai-tap-mon-toan-s60f6366ecd894e3bf0fe17e1.html",
      name: "toan-hoc",
      topic_parent_top: "LUYỆN BTTN MÔN TOÁN - LỚP 6 SÁCH CHÂN TRỜI SÁNG TẠO",
    },
    {
      class: "lop-6",
      url: "https://vungoi.vn/lop-6/bai-tap-mon-toan-s60f63675cd894e3bf0fe17e2.html",
      name: "toan-hoc",
      topic_parent_top: "LUYỆN BTTN MÔN TOÁN - LỚP 6 SÁCH CÁNH DIỀU",
    },
    {
      class: "lop-6",
      url: "https://vungoi.vn/lop-6/bai-tap-mon-van-s60f53a81cceecce653496b81.html",
      name: "ngu-van",
      topic_parent_top: "LUYỆN BTTN MÔN VĂN - LỚP 6 SÁCH KẾT NỐI TRI THỨC VỚI CUỘC SỐNG",
    },
    {
      class: "lop-6",
      url: "https://vungoi.vn/lop-6/bai-tap-mon-van-s60f636a6cd894e3bf0fe17e8.html",
      name: "ngu-van",
      topic_parent_top: "LUYỆN BTTN MÔN VĂN - LỚP 6 SÁCH CHÂN TRỜI SÁNG TẠO",
    },
    {
      class: "lop-6",
      url: "https://vungoi.vn/lop-6/bai-tap-mon-van-s60f6369fcd894e3bf0fe17e6.html",
      name: "ngu-van",
      topic_parent_top: "LUYỆN BTTN MÔN VĂN - LỚP 6 SÁCH CÁNH DIỀU",
    },
    {
      class: "lop-6",
      url: "https://vungoi.vn/lop-6/bai-tap-mon-anh-global-success-s60f53a8ecceecce653496b83.html",
      name: "tieng-anh",
      topic_parent_top: "LUYỆN BTTN MÔN ANH(GLOBAL SUCCESS) - LỚP 6 SÁCH KẾT NỐI TRI THỨC VỚI CUỘC SỐNG",
    },
    {
      class: "lop-6",
      url: "https://vungoi.vn/lop-6/bai-tap-mon-anh-friends-plus-s60f636b6cd894e3bf0fe17ee.html",
      name: "tieng-anh",
      topic_parent_top: "LUYỆN BTTN MÔN ANH (FRIENDS PLUS) - LỚP 6 SÁCH CHÂN TRỜI SÁNG TẠO",
    },
    {
      class: "lop-6",
      url: "https://vungoi.vn/lop-6/bai-tap-mon-anh-s6108ba9c48e1702e33f8e3b0.html",
      name: "tieng-anh",
      topic_parent_top: "LUYỆN BTTN MÔN ANH - LỚP 6 SÁCH TIẾNG ANH I-LEARN SMART WORLD",
    },
    {
      class: "lop-6",
      url: "https://vungoi.vn/lop-6/bai-tap-mon-anh-s6142b348aa7ac37e9a7fb029.html",
      name: "tieng-anh",
      topic_parent_top: "LUYỆN BTTN MÔN ANH - LỚP 6 SÁCH TIẾNG ANH RIGHT ON",
    },
    {
      class: "lop-6",
      url: "https://vungoi.vn/lop-6/bai-tap-mon-anh-s615c0ca3d937cde5987d66bb.html",
      name: "tieng-anh",
      topic_parent_top: "LUYỆN BTTN MÔN ANH - LỚP 6 SÁCH TIẾNG ANH ENGLISH DISCOVERY",
    },
    {
      class: "lop-6",
      url: "https://vungoi.vn/lop-6/bai-tap-lich-su-va-dia-li-s60f67035cd894e3bf0fe1925.html",
      name: "su-dia",
      topic_parent_top: "LUYỆN BTTN LỊCH SỬ VÀ ĐỊA LÍ - LỚP 6 SÁCH KẾT NỐI TRI THỨC VỚI CUỘC SỐNG",
    },
    {
      class: "lop-6",
      url: "https://vungoi.vn/lop-6/bai-tap-lich-su-va-dia-li-s60f67040cd894e3bf0fe1926.html",
      name: "su-dia",
      topic_parent_top: "LUYỆN BTTN LỊCH SỬ VÀ ĐỊA LÍ - LỚP 6 SÁCH CHÂN TRỜI SÁNG TẠO",
    },
    {
      class: "lop-6",
      url: "https://vungoi.vn/lop-6/bai-tap-lich-su-va-dia-li-s60f67045cd894e3bf0fe1927.html",
      name: "su-dia",
      topic_parent_top: "LUYỆN BTTN LỊCH SỬ VÀ ĐỊA LÍ - LỚP 6 SÁCH CÁNH DIỀU",
    },
  ];

  var limit_topic = listTopic.length - 1;
  var numberTopic = 0;

  /**
   * While list menu
   */
  while (1) {
    /**
     * B1. Go 1 subject
     */
    try {
      await page.goto(listTopic[numberTopic].url);

      console.log("[Topic] limit:  " + limit_topic + ", number:  " + numberTopic);
      const elmTopics = ".list-chapters .chapter-item";
      await page.waitForSelector(elmTopics);
      await page.waitForTimeout(2000);

      const data_crawl = await page.evaluate(
        (elmTopics, listTopic, numberTopic) => {
          let topicsLink = document.querySelectorAll(elmTopics);
          topicsLink = [...topicsLink];

          const class_name = listTopic[numberTopic].class;
          const category_name = listTopic[numberTopic].name;
          const topic_parent_top = listTopic[numberTopic].topic_parent_top ? listTopic[numberTopic].topic_parent_top : "";

          let data = {
            class_name: "",
            category_name: "",
            topic_name: "",
            child: [],
          };
          if (topic_parent_top) {
            data = {
              class_name: class_name,
              category_name: category_name,
              topic_name: topic_parent_top,
              child: [],
            };
          }

          topicsLink.forEach((item) => {
            let child_1 = {
              class_name: class_name,
              category_name: category_name,
              topic_name: item.querySelector("a").textContent,
              child: [],
            };
            data.child.push(child_1);

            let elmTopicItem = item.querySelectorAll(".sub-string");
            elmTopicItem = [...elmTopicItem];
            elmTopicItem.forEach((item) => {
              let child_2 = {
                class_name: class_name,
                category_name: category_name,
                topic_name: item.getAttribute("title"),
              };
              child_1.child.push(child_2);
            });
          });

          return data;
        },
        elmTopics,
        listTopic,
        numberTopic
      );

      await saveData(data_crawl);

      console.log("\n DONE: " + listTopic[numberTopic].url + "\n");

      if (numberTopic >= limit_topic) {
        console.log("************* !!! FINISH ALL !!!! ************* \n");
        break;
      } else {
        numberTopic = numberTopic + 1;
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
      .post(process.env.HOST_API, data)
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
