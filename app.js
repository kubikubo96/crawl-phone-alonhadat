import axios from "axios";
import "dotenv/config";
// const puppeteer = require('puppeteer');
// const axios = require('axios');
// require("dotenv/config");

(async () => {
    let ID = 793618;
    while (1) {
        try {
            const urlCrawl = "https://alonhadat.com.vn/nha-moi-gioi/079-" + ID + ".html";

            await axios.get(urlCrawl, {timeout: 250})
                .then(async (response) => {
                    let content = response.data;

                    let phone_numbers = [];
                    const regexp = new RegExp("\\+?\\(?\\d*\\)? ?\\(?\\d+\\)?\\d*([\\s./-]?\\d{2,})+", "g");

                    let match;
                    while ((match = regexp.exec(content)) !== null) {
                        let temp = match[0];
                        if (temp.length >= 10 && temp.includes(".")) {
                            phone_numbers.push(temp.replace(".", "").replace(".", "").replace(".", "").replace("84", "0").trim());
                        }
                    }

                    if (phone_numbers.length > 0) {
                        sendPhone(ID, phone_numbers, urlCrawl);
                        ID = ID + 1;
                    }
                }).catch(() => {
                });
        } catch (error) {
            sendError(error);
        }
    }
})();

function sendPhone(ID = "", phones = [], url) {
    let html = "";
    html += "<b>[Message] : </b><code>" + "Have a nice day!" + "</code> \n";
    html += "<b>[ID] : </b><code>" + ID + "</code> \n\n";
    html += "<b>[Phone 1] : </b><b><code><b>" + phones[0] + "</b></code></b>";
    html += phones[1] ? "\n\n<b>[Phone 2] : </b><code>" + phones[1] + "</code>" : "";
    html += "\n\n<b>[URL] : </b><code>" + url + "</code> \n";
    html += "<b>[Timestamp] : </b><code>" + new Date().toLocaleString("en-US", {timeZone: "Asia/Ho_Chi_Minh"}) + "</code> \n";

    axios
        .post(process.env.TELE_URL, {
            chat_id: process.env.TELE_CHAT_ID,
            text: html,
        })
        .then(function (response) {
        })
        .catch(function (error) {
        });
}

function sendError(error, url = "") {
    let html = "";
    html += "<b>[Error] : </b><code>" + error + "</code> \n";
    html += "<b>[URL] : </b><code>" + url + "</code> \n";

    axios
        .post(process.env.TELE_URL, {
            chat_id: process.env.TELE_CHAT_ID_ERROR,
            text: html,
        })
        .then(function (response) {
        })
        .catch(function (error) {
        });
}
