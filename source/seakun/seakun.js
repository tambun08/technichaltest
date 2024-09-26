const puppeteer = require('puppeteer');

const delay = (time) => new Promise(resolve => setTimeout(resolve, time));

const randomDelay = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const MAX_ATTEMPTS = 3;

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    let loginSuccess = false;
    let attempts = 0;

    while (!loginSuccess && attempts < MAX_ATTEMPTS) {
        try {
            attempts += 1;
            console.log(`Attempt to log in to-${attempts}`);

            await page.goto('https://www.tiktok.com/login', { waitUntil: 'networkidle2' });
            await delay(randomDelay(5000, 8000));

            await page.waitForSelector('#loginContainer > div > div > div > div:nth-child(3) > div.tiktok-17hparj-DivBoxContainer.e1cgu1qo0');
            await page.click('#loginContainer > div > div > div > div:nth-child(3) > div.tiktok-17hparj-DivBoxContainer.e1cgu1qo0');
            await delay(randomDelay(5000, 8000));

            await page.waitForSelector('#loginContainer > div.tiktok-aa97el-DivLoginContainer.exd0a430 > form > div.tiktok-1usm4ad-DivDescription.e1521l5b3 > a');
            await page.click('#loginContainer > div.tiktok-aa97el-DivLoginContainer.exd0a430 > form > div.tiktok-1usm4ad-DivDescription.e1521l5b3 > a');
            await delay(randomDelay(5000, 8000));

            await page.waitForSelector('input[name="username"]');
            await page.type('input[name="username"]', 'projectkerja0812@gmail.com');
            await delay(randomDelay(2000, 4000));

            await page.type('input[type="password"]', 'natan0812@');
            await delay(randomDelay(2000, 4000));

            await page.click('button[type="submit"]');
            await delay(randomDelay(5000, 10000));

            console.log("CAPTCHA appears");
            await page.waitForSelector('#secsdk-captcha-drag-wrapper', { timeout: 0 });

            console.log("Selesaikan CAPTCHA dan tekan Enter di terminal untuk melanjutkan.");
            await new Promise(resolve => process.stdin.once('data', resolve));

            await page.waitForNavigation({ waitUntil: 'networkidle2' });

            const errorMessage = await page.$('div[class*="error"]');
            if (errorMessage) {
                console.log("Login Failed");
                await delay(60000);
                continue;
            }

            console.log("Login Succes!");
            loginSuccess = true;

        } catch (error) {
            console.log(`Login failed on first try${attempts}: ${error.message}`);
            if (attempts >= MAX_ATTEMPTS) {
                console.log("Login failed after reaching the maximum attempt limit.");
                break;
            }
        }
    }

    if (loginSuccess) {
        await page.goto('https://www.tiktok.com/foryou?lang=en');
        await delay(randomDelay(5000, 8000));

        for (let i = 1; i <= 10; i++) {
            const postSelector = `#main-content-homepage_hot > div.css-tbc3le-DivOneColumnContainer.e108hwin1 > div > article:nth-child(${i}) > div`;
            const likeButtonSelector = `${postSelector} > section.css-1avy7g5-SectionActionBarContainer.ees02z00 > button:nth-child(2)`;

            try {
                await page.waitForSelector(postSelector);
                
                const likeButton = await page.$(likeButtonSelector);
                if (likeButton) {
                    await likeButton.click();
                    console.log(`Liked post ${i}`);
                } else {
                    console.log(`No like button found on post ${i}`);
                }

                await page.evaluate(() => window.scrollBy(0, window.innerHeight));

            } catch (error) {
                console.log(`Failed to like post to-${i}: ${error.message}`);
            }

            await delay(randomDelay(4000, 6000)); 
        }

        console.log('Successfully liked 10 posts!');
    } else {
        console.log('Login unsuccessful, script terminated.');
    }

    await browser.close();
})();
