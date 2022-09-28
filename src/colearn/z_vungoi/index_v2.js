import puppeteer from 'puppeteer'
import axios from 'axios'
import 'dotenv/config'


(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    // args: ['--window-size=1900,1000'],
  });
  const page = await browser.newPage();

  const TIME_OUT = 2000;
  const TIME_OUT_LONG = 5000;

  const listCategory = [
    { 'class': 'lop-12', 'url': 'https://vungoi.vn/lop-12/bai-tap-mon-toan-s5af3ead5f4ed8c11759c1ade.html', 'name': 'toan' },
    { 'class': 'lop-12', 'url': 'https://vungoi.vn/lop-12/bai-tap-mon-ly-s5af3ead5f4ed8c11759c1add.html', 'name': 'ly' },
    { 'class': 'lop-12', 'url': 'https://vungoi.vn/lop-12/bai-tap-mon-hoa-s5af3ead5f4ed8c11759c1adc.html', 'name': 'hoa' },
    { 'class': 'lop-12', 'url': 'https://vungoi.vn/lop-12/bai-tap-mon-sinh-s5af3ead5f4ed8c11759c1adb.html', 'name': 'sinh' },
    { 'class': 'lop-12', 'url': 'https://vungoi.vn/lop-12/bai-tap-mon-van-s5d14722fbcafcc004810c09f.html', 'name': 'van' },
    { 'class': 'lop-12', 'url': 'https://vungoi.vn/lop-12/bai-tap-mon-tieng-anh-s5b7f644c5b9305855ffadced.html', 'name': 'anh' },
    { 'class': 'lop-12', 'url': 'https://vungoi.vn/lop-12/bai-tap-tieng-anh-moi-s5f1e3ac59d96250022154460.html', 'name': 'anh' },
    { 'class': 'lop-12', 'url': 'https://vungoi.vn/lop-12/bai-tap-mon-su-s5b3d7dd3d9e263cf2e5a16c3.html', 'name': 'su' },
    { 'class': 'lop-12', 'url': 'https://vungoi.vn/lop-12/bai-tap-mon-dia-s5b3d7ddcd9e263cf2e5a16c4.html', 'name': 'dia' },
    { 'class': 'lop-12', 'url': 'https://vungoi.vn/lop-12/bai-tap-mon-gdcd-s5d61eaf3ea5cb900220fa953.html', 'name': 'gdcd' },
    { 'class': 'lop-11', 'url': 'https://vungoi.vn/lop-11/bai-tap-mon-toan-s5af3ead5f4ed8c11759c1ada.html', 'name': 'toan' },
    { 'class': 'lop-11', 'url': 'https://vungoi.vn/lop-11/bai-tap-mon-ly-s5af3ead5f4ed8c11759c1ad9.html', 'name': 'ly' },
    { 'class': 'lop-11', 'url': 'https://vungoi.vn/lop-11/bai-tap-mon-hoa-s5af3ead5f4ed8c11759c1ad8.html', 'name': 'hoa' },
    { 'class': 'lop-11', 'url': 'https://vungoi.vn/lop-11/bai-tap-mon-sinh-s5af3ead5f4ed8c11759c1ad7.html', 'name': 'sinh' },
    { 'class': 'lop-11', 'url': 'https://vungoi.vn/lop-11/bai-tap-mon-van-s5d27f350b61e270022a3de56.html', 'name': 'van' },
    { 'class': 'lop-11', 'url': 'https://vungoi.vn/lop-11/bai-tap-mon-tieng-anh-s5b973d94f6a5ee7ceb80254d.html', 'name': 'anh' },
    { 'class': 'lop-11', 'url': 'https://vungoi.vn/lop-11/bai-tap-mon-su-s5b4420e893a762d51f053d0c.html', 'name': 'su' },
    { 'class': 'lop-11', 'url': 'https://vungoi.vn/lop-11/bai-tap-mon-dia-s5b4420df93a762d51f053d0b.html', 'name': 'dia' },
    { 'class': 'lop-11', 'url': 'https://vungoi.vn/lop-11/bai-tap-mon-gdcd-s5d649a38ea5cb900220fb076.html', 'name': 'gdcd' },
    { 'class': 'lop-10', 'url': 'https://vungoi.vn/lop-10/bai-tap-mon-toan-s5af4fb832ad9a772d286b076.html', 'name': 'toan' },
    { 'class': 'lop-10', 'url': 'https://vungoi.vn/lop-10/bai-tap-mon-ly-s5af4fbb12ad9a772d286b077.html', 'name': 'ly' },
    { 'class': 'lop-10', 'url': 'https://vungoi.vn/lop-10/bai-tap-mon-hoa-s5af4fbbe2ad9a772d286b078.html', 'name': 'hoa' },
    { 'class': 'lop-10', 'url': 'https://vungoi.vn/lop-10/bai-tap-mon-sinh-s5af4fbc82ad9a772d286b079.html', 'name': 'sinh' },
    { 'class': 'lop-10', 'url': 'https://vungoi.vn/lop-10/bai-tap-mon-van-s5d27f36ab61e270022a3de67.html', 'name': 'van' },
    { 'class': 'lop-10', 'url': 'https://vungoi.vn/lop-10/bai-tap-mon-tieng-anh-s5b988fbcf6a5ee7ceb803bee.html', 'name': 'anh' },
    { 'class': 'lop-10', 'url': 'https://vungoi.vn/lop-10/bai-tap-mon-su-s5b4420ed93a762d51f053d0d.html', 'name': 'su' },
    { 'class': 'lop-10', 'url': 'https://vungoi.vn/lop-10/bai-tap-mon-dia-s5b4420f993a762d51f053d0e.html', 'name': 'dia' },
    { 'class': 'lop-10', 'url': 'https://vungoi.vn/lop-10/bai-tap-mon-gdcd-s5d649a40ea5cb900220fb077.html', 'name': 'gdcd' },
    { 'class': 'lop-9', 'url': 'https://vungoi.vn/lop-9/bai-tap-mon-toan-s5af4fbec2ad9a772d286b07a.html', 'name': 'toan' },
    { 'class': 'lop-9', 'url': 'https://vungoi.vn/lop-9/bai-tap-mon-ly-s5af4fbf72ad9a772d286b07b.html', 'name': 'ly' },
    { 'class': 'lop-9', 'url': 'https://vungoi.vn/lop-9/bai-tap-mon-hoa-s5af4fbff2ad9a772d286b07c.html', 'name': 'hoa' },
    { 'class': 'lop-9', 'url': 'https://vungoi.vn/lop-9/bai-tap-mon-van-s5d27f37db61e270022a3de68.html', 'name': 'van' },
    { 'class': 'lop-9', 'url': 'https://vungoi.vn/lop-9/bai-tap-mon-sinh-s5af4fc072ad9a772d286b07d.html', 'name': 'sinh' },
    { 'class': 'lop-9', 'url': 'https://vungoi.vn/lop-9/bai-tap-mon-tieng-anh-s5d0b3a877635f40022d87212.html', 'name': 'anh' },
    { 'class': 'lop-9', 'url': 'https://vungoi.vn/lop-9/bai-tap-mon-su-s5bbda9ae9104c05521d2968d.html', 'name': 'su' },
    { 'class': 'lop-9', 'url': 'https://vungoi.vn/lop-9/bai-tap-mon-dia-s5b44210293a762d51f053d0f.html', 'name': 'dia' },
    { 'class': 'lop-8', 'url': 'https://vungoi.vn/lop-8/bai-tap-mon-toan-s5b163881c2ac60899def12cf.html', 'name': 'toan' },
    { 'class': 'lop-8', 'url': 'https://vungoi.vn/lop-8/bai-tap-mon-ly-s5b3dc4ded9e263cf2e5a17fb.html', 'name': 'ly' },
    { 'class': 'lop-8', 'url': 'https://vungoi.vn/lop-8/bai-tap-mon-hoa-s5b3dc4f3d9e263cf2e5a17fd.html', 'name': 'hoa' },
    { 'class': 'lop-8', 'url': 'https://vungoi.vn/lop-8/bai-tap-mon-sinh-s5b3dc4ead9e263cf2e5a17fc.html', 'name': 'sinh' },
    { 'class': 'lop-8', 'url': 'https://vungoi.vn/lop-8/bai-tap-mon-van-s5d27f38db61e270022a3de69.html', 'name': 'van' },
    { 'class': 'lop-8', 'url': 'https://vungoi.vn/lop-8/bai-tap-mon-tieng-anh-s5d27f2c9b61e270022a3de36.html', 'name': 'anh' },
    { 'class': 'lop-8', 'url': 'https://vungoi.vn/lop-8/bai-tap-mon-su-s5bd9664aa3bed83ae090b8b9.html', 'name': 'su' },
    { 'class': 'lop-8', 'url': 'https://vungoi.vn/lop-8/bai-tap-mon-dia-s5bd966aca3bed83ae090b8c4.html', 'name': 'dia' },
    { 'class': 'lop-7', 'url': 'https://vungoi.vn/lop-7/bai-tap-mon-toan-s5b484cb4012b49a67790894a.html', 'name': 'toan' },
    { 'class': 'lop-7', 'url': 'https://vungoi.vn/lop-7/bai-tap-mon-ly-s5b484ce4012b49a677908950.html', 'name': 'ly' },
    { 'class': 'lop-7', 'url': 'https://vungoi.vn/lop-7/bai-tap-mon-sinh-s5b484ced012b49a677908951.html', 'name': 'sinh' },
    { 'class': 'lop-7', 'url': 'https://vungoi.vn/lop-7/bai-tap-mon-van-s5d27f39ab61e270022a3de6a.html', 'name': 'van' },
    { 'class': 'lop-7', 'url': 'https://vungoi.vn/lop-7/bai-tap-mon-tieng-anh-s5d27f2f5b61e270022a3de41.html', 'name': 'anh' },
    { 'class': 'lop-7', 'url': 'https://vungoi.vn/lop-7/bai-tap-mon-su-s5bd96662a3bed83ae090b8bb.html', 'name': 'su' },
    { 'class': 'lop-7', 'url': 'https://vungoi.vn/lop-7/bai-tap-mon-dia-s5bd966a1a3bed83ae090b8c2.html', 'name': 'dia' },
    { 'class': 'lop-6', 'url': 'https://vungoi.vn/lop-6/bai-tap-mon-toan-s60f53a74cceecce653496b80.html', 'name': 'toan', 'topic_parent_top': 'LUYỆN BTTN MÔN TOÁN - LỚP 6 SÁCH KẾT NỐI TRI THỨC VỚI CUỘC SỐNG' },
    { 'class': 'lop-6', 'url': 'https://vungoi.vn/lop-6/bai-tap-mon-toan-s60f6366ecd894e3bf0fe17e1.html', 'name': 'toan', 'topic_parent_top': 'LUYỆN BTTN MÔN TOÁN - LỚP 6 SÁCH CHÂN TRỜI SÁNG TẠO' },
    { 'class': 'lop-6', 'url': 'https://vungoi.vn/lop-6/bai-tap-mon-toan-s60f63675cd894e3bf0fe17e2.html', 'name': 'toan', 'topic_parent_top': 'LUYỆN BTTN MÔN TOÁN - LỚP 6 SÁCH CÁNH DIỀU' },
    { 'class': 'lop-6', 'url': 'https://vungoi.vn/lop-6/bai-tap-mon-van-s60f53a81cceecce653496b81.html', 'name': 'van', 'topic_parent_top': 'LUYỆN BTTN MÔN VĂN - LỚP 6 SÁCH KẾT NỐI TRI THỨC VỚI CUỘC SỐNG' },
    { 'class': 'lop-6', 'url': 'https://vungoi.vn/lop-6/bai-tap-mon-van-s60f636a6cd894e3bf0fe17e8.html', 'name': 'van', 'topic_parent_top': 'LUYỆN BTTN MÔN VĂN - LỚP 6 SÁCH CHÂN TRỜI SÁNG TẠO' },
    { 'class': 'lop-6', 'url': 'https://vungoi.vn/lop-6/bai-tap-mon-van-s60f6369fcd894e3bf0fe17e6.html', 'name': 'van', 'topic_parent_top': 'LUYỆN BTTN MÔN VĂN - LỚP 6 SÁCH CÁNH DIỀU' },
    { 'class': 'lop-6', 'url': 'https://vungoi.vn/lop-6/bai-tap-mon-anh-global-success-s60f53a8ecceecce653496b83.html', 'name': 'anh', 'topic_parent_top': 'LUYỆN BTTN MÔN ANH(GLOBAL SUCCESS) - LỚP 6 SÁCH KẾT NỐI TRI THỨC VỚI CUỘC SỐNG' },
    { 'class': 'lop-6', 'url': 'https://vungoi.vn/lop-6/bai-tap-mon-anh-friends-plus-s60f636b6cd894e3bf0fe17ee.html', 'name': 'anh', 'topic_parent_top': 'LUYỆN BTTN MÔN ANH (FRIENDS PLUS) - LỚP 6 SÁCH CHÂN TRỜI SÁNG TẠO' },
    { 'class': 'lop-6', 'url': 'https://vungoi.vn/lop-6/bai-tap-mon-anh-s6108ba9c48e1702e33f8e3b0.html', 'name': 'anh', 'topic_parent_top': 'LUYỆN BTTN MÔN ANH - LỚP 6 SÁCH TIẾNG ANH I-LEARN SMART WORLD' },
    { 'class': 'lop-6', 'url': 'https://vungoi.vn/lop-6/bai-tap-mon-anh-s6142b348aa7ac37e9a7fb029.html', 'name': 'anh', 'topic_parent_top': 'LUYỆN BTTN MÔN ANH - LỚP 6 SÁCH TIẾNG ANH RIGHT ON' },
    { 'class': 'lop-6', 'url': 'https://vungoi.vn/lop-6/bai-tap-mon-anh-s615c0ca3d937cde5987d66bb.html', 'name': 'anh', 'topic_parent_top': 'LUYỆN BTTN MÔN ANH - LỚP 6 SÁCH TIẾNG ANH ENGLISH DISCOVERY' },
    { 'class': 'lop-6', 'url': 'https://vungoi.vn/lop-6/bai-tap-lich-su-va-dia-li-s60f67035cd894e3bf0fe1925.html', 'name': 'su-dia', 'topic_parent_top': 'LUYỆN BTTN LỊCH SỬ VÀ ĐỊA LÍ - LỚP 6 SÁCH KẾT NỐI TRI THỨC VỚI CUỘC SỐNG' },
    { 'class': 'lop-6', 'url': 'https://vungoi.vn/lop-6/bai-tap-lich-su-va-dia-li-s60f67040cd894e3bf0fe1926.html', 'name': 'su-dia', 'topic_parent_top': 'LUYỆN BTTN LỊCH SỬ VÀ ĐỊA LÍ - LỚP 6 SÁCH CHÂN TRỜI SÁNG TẠO' },
    { 'class': 'lop-6', 'url': 'https://vungoi.vn/lop-6/bai-tap-lich-su-va-dia-li-s60f67045cd894e3bf0fe1927.html', 'name': 'su-dia', 'topic_parent_top': 'LUYỆN BTTN LỊCH SỬ VÀ ĐỊA LÍ - LỚP 6 SÁCH CÁNH DIỀU' },
  ];
  var total = 0;

  var limit_subjects = listCategory.length;
  var limit_topics = parseInt(process.env.LIMIT_TOPICS);
  var limit_questions = parseInt(process.env.LIMIT_QUESTIONS);

  var number_subjects = parseInt(process.env.NUMBER_SUBJECTS);
  var number_topics = parseInt(process.env.NUMBER_TOPICS);
  var number_questions = parseInt(process.env.NUMBER_QUESTIONS);

  var topic_parent_name = '';
  var topic_name = '';

  /**
   * While list menu
   */
  while (1) {
    /**
     * B1. Go 1 subject
     */
    try {
      console.log("STEP 1: Go to 1 Subject  \n");
      try {
        await page.goto(listCategory[number_subjects].url, { waitUntil: ['networkidle2'] })
      } catch (error) {
        console.log("-- CATCH STEP 1: Go to 1 Subject -- [page.goto] \n");
        setTimeout(async () => {
          try {
            await page.goto(listCategory[number_subjects].url, { waitUntil: ['networkidle2'] })
            await page.waitForNavigation()
          } catch (error) {
            console.log("-- CATCH STEP 1: Go to 1 Subject -- [page.goto] \n");
          }
        }, TIME_OUT_LONG);
      }

      /**
       * break subjects: Finish
       */
      if (number_subjects >= limit_subjects) {
        console.log("************* !!! FINISH ALL !!!! ************* \n");
        break;
      }
    } catch (error) {
      console.log("-- CATCH STEP 1: Go to 1 Subject -- [page.goto] \n");
      try {
        try {
          await page.goto(listCategory[number_subjects].url, { waitUntil: ['networkidle2'] })
        } catch (error) { break }
      } catch (error) {
        await sendTele(error, [], 'CATCH STEP 1: Go to 1 Subject -- [page.goto]', page.url(), 132);
        break;
      }
    }

    console.log("STEP 2: Go 1 Topic  \n");
    /**
     * While list topic
     */
    while (1) {
      /**
       * B2. Go 1 topic
       */
      try {
        const elmTopics = '.list-chapters .sub-string';
        try {
          await page.waitForSelector(elmTopics);
        } catch (error) {
          console.log("-- CATCH Go 1 Topic [waitForSelector( elmTopics )] --  \n");
          number_topics = number_topics + 1
          number_questions = 0
          break
        }

        try {
          limit_topics = await page.$$eval(elmTopics, (elm) => elm.length);
        } catch (error) {
          console.log("-- CATCH Get limit_topics --  \n");
        }

        try {
          topic_name = await page.$$eval(elmTopics, (elm, number_topics) => {
            return elm[number_topics].getAttribute('title')
          }, number_topics);
        } catch (error) {
          console.log("-- CATCH Get number_topics -- \n");
        }

        try {
          topic_parent_name = await page.evaluate(async (elmTopics, number_topics) => {
            let elm = document.querySelectorAll(elmTopics)[number_topics]
            let elmParent = elm.closest('.chapter-item').querySelectorAll('a')[0];
            return elmParent.textContent;
          }, elmTopics, number_topics)
        } catch (error) {
          console.log("-- CATCH Get topic_parent_name -- \n");
        }

        try {
          const listTopics = await page.$$(elmTopics)
          await listTopics[number_topics].click() //Click vào 1 topic

        } catch (error) {
          console.log("-- CATCH Action click to 1 topic -- \n");
          number_subjects = number_subjects + 1
          number_topics = 0
          number_questions = 0
          break
        }

      } catch (error) {
        console.log("-- CATCH STEP 2: Go To 1 Topic -- \n");
        try {
          await page.goto(listCategory[number_subjects].url, { waitUntil: ['networkidle2'] })
          break
        } catch (error) {
          await sendTele(error, [], '-- CATCH STEP 2: Go To 1 Topic --', page.url(), 198);
          break
        }
      }

      console.log("STEP 3: Go to 1 Question \n");
      /**
     * While list question
     */
      while (1) {
        /**
         * B3. Go 1 question
         */
        try {
          const elmQuestions = '#list_relate-quiz .quiz-relate-item a';
          try {
            await page.waitForSelector(elmQuestions)
          } catch (error) {
            console.log("-- CATCH Go to 1 Question [waitForSelector( elmQuestions )] -- \n");
            number_questions = number_questions + 1
            break
          }

          try {
            limit_questions = await page.$$eval(elmQuestions, (elm) => elm.length);
          } catch (error) {
            console.log("-- CATCH Get limit_questions -- \n");
          }

          try {
            const listQuestions = await page.$$(elmQuestions)
            await listQuestions[number_questions].click() //Click vào 1 question
          } catch (error) {
            console.log("-- CATCH Action click to 1 quesion -- \n");
          }

          console.log("STEP 3.1: Wait Nivigation... \n");
          try {
            await page.waitForNavigation()
          } catch (error) {
            console.log("CATCH STEP 3.1: Wait Nivigation... \n");
          }

          /**
           * Log Number Running In Progress
           */
          console.log('-                                           -')
          console.log('---------------------------------------------')
          console.log("[subjects] limit:  " + limit_subjects + ", number:  " + number_subjects)
          console.log("[topics] limit:    " + limit_topics + ", number:  " + number_topics)
          console.log("[questions] limit: " + limit_questions + ", number:  " + number_questions)
          console.log("[timestamps]: " + timestamps());
          console.log("[url question]: " + page.url());
          console.log('---------------------------------------------')
          console.log('-                                           -')

          /**
         * B4. Get data questions
         */
          const elmName = '#quiz-single .vn-tit-question strong';
          const elmTag = '#quiz-single .vn-tit-question .clf';
          const elmQuestion = '#quiz-single .content-quiz';
          const elmImageQuestion = '#quiz-single img';
          const elmQuestionLatex = '#quiz-single .content-quiz .mjx-math';
          const elmOption = '.vn-box-answer .row > div';
          const elmCorrectAnswer = '.anwsers-correct span span';
          const elmSolution = '.content-solution .solution-item div';
          const elmImageSolution = '.content-solution .solution-item div img';
          const elmAnswer = '#quiz-solution .solution-item div';
          const elmImageAnswer = '#quiz-solution .solution-item div img';
          const elmNote = '.content-solution .note';

          let default_data = {
            'url_question': '',
            'topic_parent_top': listCategory[number_subjects].topic_parent_top,
            'category_id': '',
            'category_name': listCategory[number_subjects].name,
            'topic_id': '',
            'topic_name': topic_name,
            'topic_parent_name': topic_parent_name,
            'topic_parent_name_no_accents': removeAccents(topic_parent_name),
            'class_id': '',
            'class_name': listCategory[number_subjects].class,
            'name': '',
            'tag': '',
            'content': '',
            'images': [],
            'option': [],
            'solution': '',
            'images_solution': [],
            'answer': '',
            'images_answer': [],
            'correct_answer': '',
            'note': ''
          };
          let temp_data = { ...default_data };


          /**
           * Get Data Question
           */
          console.log("STEP 4: Get Data Question \n");

          /**
           * GET Option
           */
          try {
            await page.waitForSelector(elmOption, { timeout: TIME_OUT }).then(async () => {
              temp_data.url_question = page.url();
              const option = await page.evaluate(async (elmOption) => {
                let elm = document.querySelectorAll(elmOption)
                elm = [...elm]
                let data = elm.map(item => ({
                  title: item.textContent.charAt(0),
                  content: item.textContent.slice(2),
                  image: item.querySelectorAll('img')[0] ? item.querySelectorAll('img')[0].getAttribute('src') : []
                }));
                return data;
              }, elmOption)
              temp_data.option = option;
            }).catch(() => {
              console.log("-- CATCH Get Option -- \n");
            })
          } catch (error) { }


          /**
          * Get URL Question
          */
          try {
            await page.waitForSelector('#quiz-single', { timeout: TIME_OUT }).then(() => {
              temp_data.url_question = page.url();
            }).catch(() => {
              console.log("-- CATCH Get Url Question -- \n");
            })
          } catch (error) { }

          /**
           * GET Name
           */
          try {
            await page.waitForSelector(elmName, { timeout: TIME_OUT }).then(async () => {
              temp_data.name = await page.$$eval(elmName, (elm) => elm[0].textContent);
            }).catch(() => {
              console.log("-- CATCH Get Name -- \n");
            })
          } catch (error) { }

          /**
           * GET Tag
           */
          try {
            await page.waitForSelector(elmTag, { timeout: TIME_OUT }).then(async () => {
              temp_data.tag = await page.$$eval(elmTag, (elm) => elm[0].textContent);
            }).catch(() => {
              console.log("-- CATCH Get Tag -- \n");
            })
          } catch (error) { }

          /**
           * GET Content
           */
          // try {
          //   await page.waitForSelector(elmQuestion, { timeout: TIME_OUT }).then(async () => {
          //     temp_data.content = await page.$$eval(elmQuestion, (elm) => elm[0].textContent);

          //   }).catch(() => {
          //     console.log("-- CATCH Get Content -- \n");
          //   })
          // } catch (error) { }

          try {
            await page.waitForSelector(elmQuestion, { timeout: TIME_OUT }).then(async () => {
              temp_data.content = await page.evaluate(async (elmQuestion, elmQuestionLatex) => {
                let contentHTML = document.querySelectorAll(elmQuestion)[0].outerHTML;
                let latexHTML = document.querySelectorAll(elmQuestionLatex);
                latexHTML = [...latexHTML]
                latexHTML.forEach(item => {
                  contentHTML = contentHTML.replace(item.outerHTML, '<span> \\( </span>' + item.outerHTML + '<span> \\) </span>')
                });
                document.querySelectorAll(elmQuestion)[0].outerHTML = contentHTML;
                let tagScript = document.querySelectorAll(elmQuestion)[0].querySelectorAll("script");
                tagScript = [...tagScript]
                for (let i = 0; i < tagScript.length; i++) {
                  try {
                    tagScript[i].remove();
                  } catch (error) {

                  }
                }
                let mathTrash = document.querySelectorAll(".MJX_Assistive_MathML");
                mathTrash = [...mathTrash]
                for (let i = 0; i < mathTrash.length; i++) {
                  try {
                    mathTrash[i].remove();
                  } catch (error) {

                  }
                }
                return document.querySelectorAll(elmQuestion)[0].textContent;
              }, elmQuestion, elmQuestionLatex)
            }).catch(() => {
              console.log("-- CATCH Get Content -- \n");
            })
          } catch (error) { }

          /**
           * GET Image question
           */
          try {
            await page.waitForSelector(elmImageQuestion, { timeout: TIME_OUT }).then(async () => {
              const images = await page.evaluate(async (elmImageQuestion) => {
                let elm = document.querySelectorAll(elmImageQuestion)
                elm = [...elm]
                let data = elm.map(item => ({
                  src: item.getAttribute('src'),
                  title: item.getAttribute('title')
                }));
                return data;
              }, elmImageQuestion)
              temp_data.images = images;
            }).catch(() => {
              console.log("-- CATCH Get Image Question -- \n");
            })
          } catch (error) { }

          /**
           * GET Solution
           */
          try {
            await page.waitForSelector(elmSolution, { timeout: TIME_OUT }).then(async () => {
              temp_data.solution = await page.$$eval(elmSolution, (elm) => elm[0].textContent.replace('Xem chi tiết', '').replace('---', '').trim());
            }).catch(() => {
              console.log("-- CATCH Get Solution -- \n");
            })
          } catch (error) { }

          /**
           * GET Image Solution
           */
          try {
            await page.waitForSelector(elmImageSolution, { timeout: TIME_OUT }).then(async () => {
              const images = await page.evaluate(async (elmImageSolution) => {
                let elm = document.querySelectorAll(elmImageSolution)
                elm = [...elm]
                let data = elm.map(item => ({
                  src: item.getAttribute('src'),
                  title: item.getAttribute('title')
                }));
                return data;
              }, elmImageSolution)
              temp_data.images_solution = images;

            }).catch(() => {
              console.log("-- CATCH Get Image Solution -- \n");
            })
          } catch (error) { }

          /**
           * GET Answer
           */
          try {
            await page.waitForSelector(elmAnswer, { timeout: TIME_OUT }).then(async () => {
              temp_data.answer = await page.$$eval(elmAnswer, (elm) => elm[0].textContent);
            }).catch(() => {
              console.log("-- CATCH Get Answer -- \n");
            })
          } catch (error) { }

          /**
           * GET Image answer
           */
          try {
            await page.waitForSelector(elmImageAnswer, { timeout: TIME_OUT }).then(async () => {
              const images = await page.evaluate(async (elmImageAnswer) => {
                let elm = document.querySelectorAll(elmImageAnswer)
                elm = [...elm]
                let data = elm.map(item => ({
                  src: item.getAttribute('src'),
                  title: item.getAttribute('title')
                }));
                return data;
              }, elmImageAnswer)
              temp_data.images_answer = images;
            }).catch(() => {
              console.log("-- CATCH Image Answer -- \n");
            })
          } catch (error) { }

          /**
           * GET Correct answer
           */
          try {
            await page.waitForSelector(elmCorrectAnswer, { timeout: TIME_OUT }).then(async () => {
              temp_data.correct_answer = await page.$$eval(elmCorrectAnswer, (elm) => elm[0].textContent);
            }).catch(() => {
              console.log("-- CATCH Get Correct Answer -- \n");
            })
          } catch (error) { }

          /**
           * GET Note
           */
          try {
            await page.waitForSelector(elmNote, { timeout: TIME_OUT }).then(async () => {
              temp_data.note = await page.$$eval(elmNote, (elm) => elm[0].textContent);
            }).catch(() => {
              console.log("-- CATCH Get Note -- \n");
            })
          } catch (error) { }


          /**
           * push data
           */
          console.log("STEP 5: Push Data To API \n");
          try {
            if (number_questions < limit_questions) {
              if (temp_data.option.length > 0) {
                total = total + 1
                console.log("--- !!! PUSH SUCCESS !!!! ---")
                console.log("")
                console.log("=================================")
                console.log("|             " + total + "     |")
                console.log("=================================")
                console.log("");
              } else {
                console.log("********************************")
                console.log("||          EMPTY OPTION       ||")
                console.log("********************************")
                console.log('')
                console.log("[URL EMPTY]: " + page.url());
                console.log('')
                /**
                 * Log Number Running In Progress
                 */
              }
              await saveData(temp_data)

              temp_data = { ...default_data }
              number_questions = number_questions + 1
              try {
                console.log("STEP 6: Back To List Question ======> STEP 1,2,3 \n")
                await page.goBack({ waitUntil: ['networkidle2'] })
              } catch (error) {
                console.log("CATCH STEP 6: Goto List Page Category -- ERROR [ page.goback() ]")
                try {
                  await page.goto(listCategory[number_subjects].url, { waitUntil: ['networkidle2'] })
                  await sendTele(error, [], 'CATCH STEP 6 Back To List Question', page.url(), 505)
                } catch (error) {
                  break
                }
              }
            }
          } catch (error) {
            console.log("--- CATCH STEP 5: Push Data To API -- \n");
            break
          }


          /**
           * break questions
           */
          if (number_questions >= limit_questions) {
            number_topics = number_topics + 1;
            number_questions = 0;
            try {
              await page.goto(listCategory[number_subjects].url, { waitUntil: ['networkidle2'] })
            } catch (error) {
              try {
                console.log("--- CATCH Break Question, Go to New Topic -- \n");
                await page.goto(listCategory[number_subjects].url, { waitUntil: ['networkidle2'] })
                break
              } catch (error) {
                await sendTele(error, [], 'CATCH Break Question, Go to New Topic', page.url(), 532)
                break
              }
            }
            console.log("**********  DONE 1 STEP TOPIC *********** \n")
            break
          }
        } catch (error) {
          console.log("--- CATCH STEP 2: Go To 1 Topic [waitForSelector( elmTopics) ] [ LAST ] --- \n");
          break
        }

        /**
        * break topic
        */
        if (number_topics >= limit_topics) {
          number_subjects = number_subjects + 1
          number_topics = 0
          number_questions = 0
          console.log("**********  DONE 1 STEP SUBJECT *********** \n")
          try {
            await page.goto(listCategory[number_subjects].url, { waitUntil: ['networkidle2'] })
          } catch (error) {
            console.log("--- CATCH Break Topic, Go to New Subjects -- \n");
            try {
              await page.goto(listCategory[number_subjects].url, { waitUntil: ['networkidle2'] })
            } catch (error) {
              await sendTele(error, [], 'CATCH Break Topic, Go to New Subjects', page.url(), 560)
              break
            }
          }
          break
        }
      }
    }
  }
  await browser.close();
})();


async function sendTele(error, data_tpm = [], note = '', url = '', line = 0) {
  let html = '';
  html += '<b>[Error] : </b><code>' + JSON.stringify(error) + '</code> \n';
  html += '<b>[Message] : </b><code>' + note + '</code> \n';
  html += '<b>[URL] : </b><code>' + url + '</code> \n';
  html += '<b>[Line] : </b><code>' + line + '</code> \n';
  html += '<b>[Data] : </b><code>' + JSON.stringify(data_tpm) + '</code> \n';

  try {
    await axios.post(process.env.TELE_URL, {
      chat_id: process.env.TELE_CHAT_ID,
      text: html,
    }).then(function (response) {
    });
  } catch (error) {
    console.log("LOCAL LOG: ERROR SEND TELEGRAM");
  }
}

async function saveData(data) {
  try {
    await axios.post(process.env.HOST_API, data)
      .then(function (response) {

      })
      .catch(function (error) {
        sendTele(error, data, 'Error Saved Database');
      });
  } catch (error) {
    console.log('LOCAL LOG: ERROR SAVE DATABASE');
  }
}

function removeAccents(str) {
  var AccentsMap = [
    "aàảãáạăằẳẵắặâầẩẫấậ",
    "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
    "dđ", "DĐ",
    "eèẻẽéẹêềểễếệ",
    "EÈẺẼÉẸÊỀỂỄẾỆ",
    "iìỉĩíị",
    "IÌỈĨÍỊ",
    "oòỏõóọôồổỗốộơờởỡớợ",
    "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
    "uùủũúụưừửữứự",
    "UÙỦŨÚỤƯỪỬỮỨỰ",
    "yỳỷỹýỵ",
    "YỲỶỸÝỴ"
  ];
  for (var i = 0; i < AccentsMap.length; i++) {
    var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
    var char = AccentsMap[i][0];
    str = str.replace(re, char);
  }
  return str.trim().replace(/\s/g, '-').replaceAll(':', '').replaceAll(',', '').replaceAll('.', '').toLowerCase();
}

function timestamps() {
  return new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
}