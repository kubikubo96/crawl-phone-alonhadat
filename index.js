import puppeteer from "puppeteer";
import axios from "axios";
import "dotenv/config";
// const puppeteer = require('puppeteer');
// const axios = require('axios');
// require("dotenv/config");

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            "--disable-site-isolation-trials",
            "--no-sandbox",
            "--disable-setuid-sandbox",
        ],
    });
    const page = await browser.newPage();

    await page.setViewport({
        width: 1920,
        height: 1080,
    });

    //let ID = 792430;
    let ID = 792420;
    while (1) {
        try {
            const urlCrawl = 'https://alonhadat.com.vn/nha-moi-gioi/079-' + ID + '.html';
            const pageError = [
                'https://alonhadat.com.vn/nha-moi-gioi.html',
                'https://alonhadat.com.vn',
                'https://alonhadat.com.vn/',
                'https://alonhadat.com.vn/error.aspx?aspxerrorpath=/default.aspx',
            ];

            try {
                await page.goto(urlCrawl);
            } catch (error) {
                await sendError(error, page.url())
            }


            //start: kiem tra đã tồn tại
            let currentUrl = page.url();
            let isFail = false;

            pageError.forEach((item) => {
                if (item === currentUrl) {
                    isFail = true;
                }
            });

            if (isFail) {
                continue;
            }
            //end: kiểm tra đã tồn tại

            //start: lấy số điện thoại
            let name = '';
            let phones = [];
            let address = '';
            try {
                name = await page.$eval('.agent-infor .fullname', elm => elm.textContent.trim());
            } catch (error) {
                await sendError(error, currentUrl)
            }
            try {
                address = await page.$eval('.agent-infor .address', elm => elm.textContent.trim());
            } catch (error) {
                await sendError(error, currentUrl)
            }
            try {
                phones = await page.evaluate(() => {
                    let elmPhone = document.querySelectorAll('.agent-infor .phone a');
                    elmPhone = [...elmPhone];

                    let temp = [];

                    elmPhone.forEach((item, key) => {
                        temp.push(item.textContent.replaceAll('.', '').replaceAll(',', '').trim())
                    });

                    return temp;
                },);
            } catch (error) {
                await sendError(error, currentUrl)
            }
            //end: lấy số điện thoại

            //start: Kiểm tra xem url có tồn tại không
            try {
                await sendPhone(ID, name, address, phones, currentUrl);
                ID = ID + 1;
            } catch (error) {
                await sendError(error, currentUrl)
            }
            //end: Kiểm tra xem url có tồn tại không
        } catch (error) {
            await sendError(error)
        }
    }
})();

async function sendPhone(ID = "", name = "", address = "", phones = [], url = "") {
    let html = "";
    html += "<b>[Message] : </b><code>" + "Have a nice day!" + "</code> \n";
    html += "<b>[ID] : </b><code>" + ID + "</code> \n";
    html += "<b>[Name] : </b><code>" + name + "</code> \n";
    html += "<b>[Address] : </b><code>" + address + "</code> \n\n";
    html += "<b>[Phone 1] : </b><b><code><b>" + phones[0] + "</b></code></b>";
    html += phones[1] ? "\n\n<b>[Phone 2] : </b><code>" + phones[1] + "</code>" : "";
    html += "\n\n<b>[URL] : </b><code>" + url + "</code> \n";
    html += "<b>[Timestamp] : </b><code>" + timestamp() + "</code> \n";

    try {
        await axios
            .post(process.env.TELE_URL, {
                chat_id: process.env.TELE_CHAT_ID,
                text: html,
            })
            .then(function (response) {
            });
    } catch (error) {
        //console.log(error);
    }
}

async function sendError(error, url = '') {
    let html = '';
    html += '<b>[Error] : </b><code>' + error + '</code> \n';
    html += '<b>[URL] : </b><code>' + url + '</code> \n';

    await axios.post(process.env.TELE_URL, {
        chat_id: process.env.TELE_CHAT_ID_ERROR,
        text: html,
    }).then(function (response) {
    }).catch(function (error) {
    });
}

function timestamp() {
    return new Date().toLocaleString("en-US", {timeZone: "Asia/Ho_Chi_Minh"});
}