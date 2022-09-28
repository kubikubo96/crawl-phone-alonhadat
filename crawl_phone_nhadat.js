import puppeteer from "puppeteer";
import axios from "axios";
import "dotenv/config";

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            "--disable-site-isolation-trials",
            "--window-size=1900,1000",
            "--window-position=3000,0",
            "--lang=en-US,en",
            "--no-sandbox",
            "--disable-setuid-sandbox",
        ],
    });
    const page = await browser.newPage();

    await page.setViewport({
        width: 1920,
        height: 1080,
    });

    let ID = 792280;
    while (1) {
        try {
            const urlCrawl = 'https://alonhadat.com.vn/nha-moi-gioi/079-' + ID + '.html';
            const pageOrigin = [
                'https://alonhadat.com.vn/nha-moi-gioi.html',
                'https://alonhadat.com.vn',
                'https://alonhadat.com.vn/',
            ];

            try {
                //await page.waitForTimeout(2000);
                await page.goto(urlCrawl, {
                    //waitUntil: ["networkidle2"],
                });
            } catch (error) {
                await sendTele(error, page.url())
            }


            let currentUrl = page.url();
            const hasPage = currentUrl !== pageOrigin[0] && currentUrl !== pageOrigin[1] && currentUrl !== pageOrigin[2];

            if (!hasPage) {
                continue;
            }

            const name = await page.$eval('.agent-infor .fullname', elm => elm.textContent.trim());
            const address = await page.$eval('.agent-infor .address', elm => elm.textContent.trim());
            let phones = '';
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
                await sendTele(error, page.url())
            }

            /**
             * Kiểm tra xem url có tồn tại không
             */
            //await page.waitForTimeout(2000);
            try {
                await sendPhone(ID, name, address, phones, page.url());
                ID = ID + 1;
            } catch (error) {
                await sendTele(error, page.url())
            }
        } catch (error) {
            await sendTele(error, page.url())
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
                chat_id: '-815598226',
                text: html,
            })
            .then(function (response) {
            });
    } catch (error) {
        //console.log(error);
    }
}

async function sendTele(error, url = '') {
    let html = '';
    html += '<b>[Error] : </b><code>' + error + '</code> \n';
    html += '<b>[URL] : </b><code>' + url + '</code> \n';

    await axios.post(process.env.TELE_URL, {
        chat_id: '-815598226',
        text: html,
    }).then(function (response) {
    }).catch(function (error) {
    });
}
