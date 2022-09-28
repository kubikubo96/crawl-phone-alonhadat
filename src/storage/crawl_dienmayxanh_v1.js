import puppeteer from "puppeteer";
import axios from "axios";
import "dotenv/config";

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--disable-site-isolation-trials", "--window-size=1900,1000", "--lang=en-US,en", "--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    await page.setViewport({
        width: 1920,
        height: 1080,
    });

    const listPage = [];
    const startPage = 1;
    const endPage = 2;
    for (let i = endPage; i >= startPage; i--) {
        const itemPage = {
            url: "https://www.dienmayxanh.com/kinh-nghiem-hay/aj/CategoryV2/LoadNewsNext?url=huong-dan-su-dung-laptop&hotSorting=true&pageSize=200&pageIndex=" + i,
            tag: ["Laptop"],
        };
        listPage.push(itemPage);
    }

    const sourceCrawl = "dienmayxanh.com";
    const limitPage = listPage.length;
    let numberPage = 0;

    /**
     * Vòng lặp danh sách trang
     */
    while (1) {
        try {
            console.log("\n Url page: " + listPage[numberPage].url + "\n -------- \n");
            try {
                await page.goto(listPage[numberPage].url, {
                    waitUntil: ["networkidle2"],
                });
            } catch (error) {
                console.log(error)
            }

            /**
             * Get danh sách bài viết
             *
             * @type {{url}[]}
             */
            const listPost = await page.evaluate((sourceCrawl) => {
                let links = document.querySelectorAll("a.linktitle");
                links = [...links];
                return links.map((link) => ({
                    url: 'https://' + sourceCrawl + link.getAttribute("href"),
                }));
            }, sourceCrawl);


            let numberPost = listPost.length - 1;
            let minPost = 0;

            /**
             * Lặp danh sách bài viết
             */
            while (1) {
                try {
                    await page.goto(listPost[numberPost].url, {
                        waitUntil: ["networkidle2"],
                    });
                } catch (error) {
                    console.log(error)
                }
                await page.waitForTimeout(2000);

                await page.evaluate(() => {
                    window.scrollTo(0, document.body.scrollHeight);
                });
                await page.waitForTimeout(2000);
                await page.evaluate(() => {
                    window.scrollTo(0, 0);
                });
                await page.waitForTimeout(2000);

                const elmTitle = ".article h1";
                const elmContent = ".bxcontentnews";
                const elmLink = ".bxcontentnews a";
                const elmImage = ".bxcontentnews img";
                const elmSortContent = ".bxcontentnews h2";
                await page.waitForSelector(elmTitle);
                await page.waitForSelector(elmContent);

                //Khởi tạo Data
                const data = {
                    title: "",
                    content: "",
                    source: "",
                    url_crawl: page.url(),
                    tag: listPage[numberPage].tag,
                    seo_tag_description: "",
                };

                //start: replace src image
                try {
                    await page.$$eval(elmImage, (elms) => {
                        return elms.forEach((elm) => {
                            elms = [...elms];
                            elm.src = elm.getAttribute("data-src")
                                ? elm.getAttribute("data-src")
                                : elm.src;
                        });
                    });
                } catch (error) {
                    console.log(error)
                }
                //end: replace src image

                //start: replace sort content
                try {
                    await page.$eval(elmSortContent, (elm) => {
                        if (elm) {
                            elm.outerHTML = '<p><strong>' + elm.textContent + '</strong></p>'
                        }
                    });
                } catch (error) {
                    console.log(error)
                }
                //end: replace sort content

                //start: remove trash
                const elmTrash = [
                    '.top-news', '.adsbygoogle', '.adsense', '.in-article', '.adszone', '.adstopimage', '.adsviewed', '.generate-promotion-products',
                    'div.toc', 'iframe.lazy', '.bannerAdNews', '.clrindexknh', '.bxindexknh', '#QuickViewId', '.owl-carousel', '.infobox', '.TitleBoxSp',
                    '.HideBox', '.generate-promotion-products', '.wrap_relate', '.interested', '.tags', '.comment', '.fh3menu', '#hmenuid4', '.btn__noibat'
                ];

                await page.evaluate((elmTrash) => {
                    elmTrash.forEach((item) => {
                        try {
                            let queryTrash = document.querySelectorAll(item);
                            queryTrash.forEach((elm) => {
                                elm.remove();
                            });
                        } catch (error) {
                            console.log(error)
                        }
                    });
                }, elmTrash);
                //end: remove trash

                //start: remove trash tag a
                const listTrashTag = [
                    'điện máy xanh', 'Điện máy XANH', 'Điện máy xanh', 'Điện Máy Xanh', 'ĐIỆN MÁY XANH',
                    'Mọi thắc mắc vui lòng để lại câu hỏi ngay bên dưới để Điện máy XANH hỗ trợ cho bạn nhé'
                ];

                try {
                    await page.$$eval(
                        elmLink,
                        (elms, listTrashTag) => {
                            elms = [...elms];
                            return elms.forEach((elm) => {
                                let content = elm.textContent?.toLowerCase();
                                listTrashTag.forEach(itemTrash => {
                                    if (
                                        content.includes(itemTrash)
                                    ) {
                                        elm.remove();
                                    }
                                });
                            });
                        },
                        listTrashTag
                    );
                } catch (error) {
                    console.log(error)
                }
                //end: remove trash tag a

                //start: convert link thành text cho link crawl
                try {
                    await page.$$eval(
                        elmLink,
                        (elms, sourceCrawl) => {
                            elms = [...elms];
                            return elms.map((elm) => {
                                if (elm.href && elm.href.toLowerCase().search(sourceCrawl) !== -1) {
                                    elm.outerHTML = elm.textContent;
                                }
                            });
                        },
                        sourceCrawl
                    );
                } catch (error) {
                    console.log(error)
                }
                //end: convert link thành text cho link crawl

                //start: replace src image
                // try {
                //     await page.$$eval(
                //         elmImage,
                //         (elms, sourceCrawl) => {
                //             return elms.forEach((elm) => {
                //                 elms = [...elms];
                //                 elm.src = elm.src.replace("..", sourceCrawl);
                //             });
                //         },
                //         sourceCrawl
                //     );
                // } catch (error) {
                //     console.log(error)
                // }
                //end: replace src image

                data.title = await page.$$eval(elmTitle, (elm) => elm[0].textContent);
                data.content = await page.$$eval(elmContent, (elm) => elm[0].innerHTML);

                const lengthTitle = data.title.length;
                const lengthDescription = 145 - lengthTitle;

                data.seo_tag_description = data.title;
                if (lengthDescription > 0) {
                    data.seo_tag_description = data.seo_tag_description + '. ' + await page.$$eval(elmContent, (elm, lengthDescription) => {
                        return elm[0].textContent.slice(0, Number(lengthDescription)).trim() + "..."
                    }, lengthDescription);
                }

                //start: replace Tên trang
                const listTrashText = [
                    'Điện máy XANH',
                    'Điện máy xanh',
                    'Điện Máy Xanh',
                    'DienmayXANH.com',
                ]

                listTrashText.forEach((item) => {
                    data.content = data.content.replaceAll(item, "KungFuCongNghe.Com");
                });
                //end: replace Tên trang

                // fs.writeFileSync('data.json', JSON.stringify(data));
                // await page.waitForTimeout(1000 * 1000)

                /**
                 * Save data
                 */
                if (data.content.length > 0) {
                    data.content = data.content + '<p>Vậy là bạn đã cùng KungFuCongNghe.Com tìm hiểu cách thực hiện. Chúc bạn thành công nhé!</p>';

                    /**
                     * dùng cho trường hợp auto save images
                     */
                    //data.content = data.content.replaceAll('\\', '\\\\');

                    await saveData(data);

                    console.log('\n \x1b[32m DONE: ' + data.title + ' \x1b[0m \n');
                }
                numberPost = numberPost - 1;
                /**
                 * Done 1 page
                 */
                if (numberPost < minPost) {
                    numberPage = numberPage + 1;
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
        if (numberPage >= limitPage) {
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
            .then(function (response) {
            })
            .catch(function (error) {
                console.log("\n ---  \n ERROR SAVE DATABASE \n ---  \n ");
                console.log(error.response.data);
            });
    } catch (error) {
        console.log(error)
    }
}
