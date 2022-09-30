import puppeteer from "puppeteer";
import axios from "axios";
import "dotenv/config";
// const puppeteer = require('puppeteer');
// const axios = require('axios');
// require("dotenv/config");

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--disable-site-isolation-trials", "--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    //let ID = 792430;
    let ID = 792795;
    while (1) {
        console.log("ID:" + ID);
        try {
            const urlCrawl = "https://alonhadat.com.vn/nha-moi-gioi/079-" + ID + ".html";

            await axios
                .get(urlCrawl, {timeout: 500})
                .then(async () => {
                    try {
                        await page.goto(urlCrawl);
                    } catch (error) {
                        sendError(error, page.url());
                    }

                    //start: lấy số điện thoại
                    let currentUrl = page.url();
                    let phones = [];
                    let name = "";
                    let address = "";
                    try {
                        phones = await page.evaluate(() => {
                            let elmPhone = document.querySelectorAll(".agent-infor .phone a");
                            elmPhone = [...elmPhone];

                            let temp = [];

                            elmPhone.forEach((item, key) => {
                                temp.push(item.textContent.replaceAll(".", "").replaceAll(",", "").trim());
                            });

                            return temp;
                        });
                    } catch (error) {
                        sendError(error, currentUrl);
                    }

                    if (phones.length === 0) {
                        return;
                    }

                    try {
                        name = await page.$eval(".agent-infor .fullname", (elm) => elm.textContent.trim());
                    } catch (error) {
                        sendError(error, currentUrl);
                    }

                    try {
                        address = await page.$eval(".agent-infor .address", (elm) => elm.textContent.trim());
                    } catch (error) {
                        sendError(error, currentUrl);
                    }
                    //end: lấy số điện thoại

                    try {
                        sendPhone(ID, name, address, phones, currentUrl);
                        ID = ID + 1;
                    } catch (error) {
                        sendError(error, currentUrl);
                    }
                })
                .catch(() => {
                });
        } catch (error) {
            sendError(error);
        }
    }
})();

function sendPhone(ID = "", name = "", address = "", phones = [], url = "") {
    let html = "";
    html += "<b>[Message] : </b><code>" + "Have a nice day!" + "</code> \n";
    html += "<b>[ID] : </b><code>" + ID + "</code> \n";
    html += "<b>[Name] : </b><code>" + name + "</code> \n";
    html += "<b>[Address] : </b><code>" + address + "</code> \n\n";
    html += "<b>[Phone 1] : </b><b><code><b>" + phones[0] + "</b></code></b>";
    html += phones[1] ? "\n\n<b>[Phone 2] : </b><code>" + phones[1] + "</code>" : "";
    html += "\n\n<b>[URL] : </b><code>" + url + "</code> \n";
    html += "<b>[Timestamp] : </b><code>" + timestamp() + "</code> \n";

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

function checkTime() {
    let start = Date.now();
    axios
        .get("https://alonhadat.com.vn/nha-moi-gioi/nhu-7926699.html", {timeout: 500})
        .then((response) => {
            console.log("OK diff res:" + (Date.now() - start));
        })
        .catch((error) => {
            console.log("TIMEOUT diff res:" + (Date.now() - start));
        });
}

function timestamp() {
    return new Date().toLocaleString("en-US", {timeZone: "Asia/Ho_Chi_Minh"});
}
