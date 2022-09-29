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

    //let ID = 792299;
    let ID = 792430;
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
            let isFail = true;

            pageError.forEach((item) => {
                if (item === currentUrl) {
                    isFail = true;
                }
            });

            if (isFail) {
                continue;
            }
            //end: kiểm tra đã tồn tại

            let name = '';
            let phones = '';
            let address = '';
            try {
                name = await page.$eval('.agent-infor .fullname', elm => elm.textContent.trim());
            } catch (error) {
                await sendError(error, page.url())
            }
            try {
                address = await page.$eval('.agent-infor .address', elm => elm.textContent.trim());
            } catch (error) {
                await sendError(error, page.url())
            }
            try {
                phones = await page.evaluate(() => {
                    let elmPhone = document.querySelectorAll('.agent-infor .phone a');
                    elmPhone = [...elmPhone];

                    let temp = '';

                    elmPhone.forEach((item) => {
                        temp = temp + ' \n ' + item.textContent.replaceAll('.', '').replaceAll(',', '').trim();
                    });

                    return temp;
                },);
            } catch (error) {
                await sendError(error, page.url())
            }

            /**
             * Kiểm tra xem url có tồn tại không
             */
            //await page.waitForTimeout(2000);
            try {
                await sendPhone(ID, name, address, phones, page.url());
                ID = ID + 1;
            } catch (error) {
                await sendError(error, page.url())
            }
        } catch (error) {
            await sendError(error, page.url())
        }
    }
})();

async function sendPhone(ID = "", name = "", address = "", phones = "", url = "") {
    let html = "";
    html += "<b>[Message] : </b><code>" + "Have a nice day!" + "</code> \n";
    html += "<b>[ID] : </b><code>" + ID + "</code> \n";
    html += "<b>[Name] : </b><code>" + name + "</code> \n";
    html += "<b>[Address] : </b><code>" + address + "</code> \n";
    html += "<b>[Phone] : </b><code>" + phones + "</code> \n";
    html += "<b>[URL] : </b><code>" + url + "</code> \n";

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
        chat_id: process.env.TELE_CHAT_ID,
        text: html,
    }).then(function (response) {
    }).catch(function (error) {
    });
}
