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

  while (1) {
    /**
     * Get Data Crawl
     */
    const dataResponse = await getData();

    if (!dataResponse) {
      console.log("\n \x1b[45m ---------- FINISH ALL ---------- \x1b[0m \n");
      break;
    }

    const url_crawl = dataResponse.url_crawl;

    //next nếu không có url
    if (!url_crawl) {
      await saveData({ data: [], parent_id: dataResponse.id });
      continue;
    }

    console.log("\n \x1b[33m url_crawl: \x1b[0m" + "\x1b[37m" + url_crawl + "\x1b[0m");
    try {
      // await page.goto(url_crawl, {
      //   waitUntil: ["networkidle2"],
      // });
      await page.goto(url_crawl);
    } catch (error) {}
    await page.waitForTimeout(4000);

    const elementBox = ".content_box #box-content";
    try {
      await page.waitForSelector(elementBox);
    } catch (error) {}
    //start: remove trash
    try {
      await page.evaluate(() => {
        const elements1 = document.querySelectorAll(".content_box .video-container");
        const elements2 = document.querySelectorAll("#box-content > script");
        const elements3 = document.querySelectorAll("#box-content .box-question > div > script");
        const elements4 = document.querySelectorAll("ins");
        const elements5 = document.querySelectorAll(".box_bottom");
        const elements6 = document.querySelectorAll(".Choose-fast");
        const elements7 = document.querySelectorAll(".box_above");
        const elements8 = document.querySelectorAll(".adbro-sm");
        const elements9 = document.querySelectorAll(".adbro-xs");
        const elements10 = document.querySelectorAll("iframe.lazy");
        const elements11 = document.querySelectorAll(".adsviewed");
        const elements12 = document.querySelectorAll(".adstopimage");
        const elements13 = document.querySelectorAll(".adszone");
        const elements14 = document.querySelectorAll(".adsense");
        const elements15 = document.querySelectorAll(".adsbygoogle");
        const elements16 = document.querySelectorAll(".mys-wrapper");
        const elements17 = document.querySelectorAll(".adbro-bottom");
        const elements18 = document.querySelectorAll(".adbro-satellite");
        const elements19 = document.querySelectorAll(".adbro-animated");
        const elements20 = document.querySelectorAll(".content_method_content > script");

        const data = [
          elements1,
          elements2,
          elements3,
          elements4,
          elements5,
          elements6,
          elements7,
          elements8,
          elements9,
          elements10,
          elements11,
          elements12,
          elements13,
          elements14,
          elements15,
          elements16,
          elements17,
          elements18,
          elements19,
          elements20,
        ];

        data.forEach((item) => {
          item.forEach((elm) => {
            elm.remove();
          });
        });
      });
    } catch (error) {}
    //end: remove trash

    const data = await page.evaluate(
      (elementBox, dataResponse) => {
        let elmBox = document.querySelector(elementBox);

        if (!elmBox) {
          return "";
        }

        const nameCrawl = document.querySelector(".content_box h1").textContent;
        let has_image_crawl = 0;
        let has_audio_crawl = 0;

        //lay phuong phap giai
        let elmAnswersolution = elmBox.querySelectorAll(".content_method_container");
        if (elmAnswersolution.length > 0) {
          elmAnswersolution.forEach((item) => {
            item.querySelector(".content_method_header").outerHTML = "<p>" + item.querySelector(".content_method_header").innerHTML + "</p>";
            item.querySelector("img")?.remove();
            item.querySelector("script")?.remove();
          });
        }

        //kiem tra co anh khong
        if (elmBox.querySelector("img")) {
          has_image_crawl = 1;
        }

        //kiem tra co audio khong
        if (elmBox.querySelector("audio")) {
          has_audio_crawl = 1;
        }

        //start: custom tag
        let tagP = elmBox.querySelectorAll("p");
        tagP.forEach((item) => {
          item.insertAdjacentHTML("afterbegin", "P_TEXT_START ");
          item.insertAdjacentHTML("beforeend", " P_TEXT_END ");

          //remove trash
          let contentP = item.textContent;
          if (
            contentP.includes("Xem thêm:") ||
            contentP.includes("Loigiaihay") ||
            contentP.includes("Tuyensinh247") ||
            contentP.includes("Xem chi tiết:") ||
            contentP.includes(">> ")
          ) {
            item.remove();
          }
        });

        let tagStrong = elmBox.querySelectorAll("strong");
        tagStrong.forEach((item) => {
          item.insertAdjacentHTML("afterbegin", "STRONG_TEXT_START ");
          item.insertAdjacentHTML("beforeend", " STRONG_TEXT_END ");
        });

        let tagDiv = elmBox.querySelectorAll("div");
        tagDiv.forEach((item) => {
          item.insertAdjacentHTML("afterbegin", "DIV_TEXT_START ");
          item.insertAdjacentHTML("beforeend", " DIV_TEXT_END ");
        });

        let tagSpan = elmBox.querySelectorAll("div");
        tagSpan.forEach((item) => {
          item.insertAdjacentHTML("afterbegin", "SPAN_TEXT_START ");
          item.insertAdjacentHTML("beforeend", " SPAN_TEXT_END ");
        });
        //end: custom tag

        //start: convert images
        let tagImage = elmBox.querySelectorAll("img");
        tagImage.forEach((item) => {
          let is_get_image = true;
          if (item.src?.includes("base64") || item.src?.includes("speaker.png") || item.src?.includes("speaker_active.gif")) {
            is_get_image = false;
          }
          item.outerHTML = is_get_image ? "BREAKLINE STRONG_TEXT_START [IMAGE:" + item.src + "] STRONG_TEXT_END BREAKLINE" : "";
        });
        //end: convert images

        //start: convert audio
        let tagAudio = elmBox.querySelectorAll("audio");
        tagAudio.forEach((item) => {
          let srcAudio = item.src ? item.src : item.querySelector("source")?.src;
          item.outerHTML = "BREAKLINE STRONG_TEXT_START [AUDIO:" + srcAudio + "] STRONG_TEXT_END BREAKLINE";
        });
        //end: convert audio

        let answer_crawl = elmBox.textContent;
        //xu ly latex
        const isLatex = elmBox.querySelectorAll(".MathJax_Preview");
        if (isLatex.length > 0) {
          let latexHTML = elmBox.querySelectorAll("script");
          latexHTML = [...latexHTML];
          latexHTML.forEach((item) => {
            item.insertAdjacentHTML("afterbegin", " \\( ");
            item.insertAdjacentHTML("beforeend", " \\) ");
          });

          let mathTrash1 = elmBox.querySelectorAll(".MathJax_Preview");
          let mathTrash2 = elmBox.querySelectorAll(".mjx-chtml");
          mathTrash1 = [...mathTrash1];
          for (let i = 0; i < mathTrash1.length; i++) {
            try {
              mathTrash1[i].remove();
            } catch (error) {}
          }
          mathTrash2 = [...mathTrash2];
          for (let i = 0; i < mathTrash2.length; i++) {
            try {
              mathTrash2[i].remove();
            } catch (error) {}
          }

          answer_crawl = elmBox.textContent;
        }

        //replace BREAKLINE to br
        answer_crawl = answer_crawl.replaceAll("BREAKLINE", "<br />");
        answer_crawl = answer_crawl.replaceAll("STRONG_TEXT_START", "<strong>");
        answer_crawl = answer_crawl.replaceAll("STRONG_TEXT_END", "</strong>");
        answer_crawl = answer_crawl.replaceAll("P_TEXT_START", "<p>");
        answer_crawl = answer_crawl.replaceAll("P_TEXT_END", "</p>");
        answer_crawl = answer_crawl.replaceAll("DIV_TEXT_START", "<div>");
        answer_crawl = answer_crawl.replaceAll("DIV_TEXT_END", "</div>");
        answer_crawl = answer_crawl.replaceAll("SPAN_TEXT_START", "<span>");
        answer_crawl = answer_crawl.replaceAll("SPAN_TEXT_END", "</div>");

        //remove string trash
        const stringRemove = [
          "Video hướng dẫn giải",
          "Lựa chọn câu để xem lời giải nhanh hơn",
          "Loigiaihay.com",
          "tại Tuyensinh247.com",
          "Tuyensinh247.com",
          "(adsbygoogle = window.adsbygoogle || []).push({});",
        ];
        stringRemove.forEach((item) => {
          answer_crawl = answer_crawl.replaceAll(item, "");
        });

        let data_temp = {
          id: dataResponse.id,
          parent_id: dataResponse.id,
          url_crawl: dataResponse.url_crawl,
          name: nameCrawl ? nameCrawl.trim() : dataResponse.name,
          class_id: dataResponse.class_id,
          category_id: dataResponse.category_id,
          class_name: dataResponse.class_name,
          category_name: dataResponse.category_name,
          book_id: dataResponse.book_id,
          book_name: dataResponse.book_name,
          level: dataResponse.level == 2 ? 3 : 4,
          has_image_crawl: has_image_crawl,
          has_audio_crawl: has_audio_crawl,
          answer_crawl: answer_crawl,
        };
        return data_temp;
      },
      elementBox,
      dataResponse
    );

    if (!data) {
      console.log("\n \x1b[43m EMPTY DATA \x1b[0m");
      continue;
    }

    //console.log("\n WFITE FILE SUCCESS");
    //fs.writeFileSync("tmp/textbook.json", JSON.stringify(data));
    //await page.waitForTimeout(1000 * 1000);

    await saveData({ data: data, parent_id: dataResponse.id });

    console.log("\n \x1b[44m DONE 1 API \x1b[0m");

    await page.waitForTimeout(1000);
  }

  await browser.close();
})();

async function getData() {
  try {
    return await axios
      .get(process.env.HOST_API_DATA_ANSWER_TYPE_5, {
        params: {
          class_name: "lop-12",
        },
      })
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
      .post(process.env.HOST_API_STORE_ANSWER_TYPE_5, data)
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
