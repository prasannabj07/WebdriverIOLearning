import { $, $$, expect, browser, driver } from '@wdio/globals';
import homeWorkSelector from './homeWork.selectors';
import axios from "axios";  // install axios if not already: npm install axios

class homeWorkPage {
    public async switchingWidowsOne(){
        await browser.url("https://opensource-demo.orangehrmlive.com/")
        const OGBrowser  = await browser.getWindowHandle()
        //const twitterTab  = await browser.getWindowHandle()
        await homeWorkSelector.twitterLink.click()
        //await homeWorkSelector.faceBookLink.click()
        const allTab = await browser.getWindowHandles()
        console.log("AAABBBC",allTab)
        const newTab = allTab.find(handle => handle !== OGBrowser);
        if (!newTab) {
            throw new Error('New tab not found');
        }

        // const facebookTab = allTab.find(
        //     handle => handle !== OGBrowser && handle !== twitterTab
        // );
        
        // if (!facebookTab) {
        //     throw new Error('Facebook tab not found');
        // }
        
        //await browser.switchToWindow(facebookTab);

        await browser.switchToWindow(newTab)
        const profileName = await homeWorkSelector.twitterProfileName.getText();
        console.log("aaabbb",profileName)
        expect(profileName).toEqual('OrangeHRM'); // ✅ string compare
        //await expect(profileName).toHaveText('OrangeHRM')
        await browser.switchToWindow(OGBrowser)
        console.log("aaabbb",await browser.getTitle())

    }
    
    public async switchingWindows(){
        await browser.url("https://opensource-demo.orangehrmlive.com/");

        const OGBrowser = await browser.getWindowHandle();

        console.log("AAABBB",OGBrowser)

        await homeWorkSelector.twitterLink.click();

        // Directly switch to Twitter tab by URL
        await browser.switchWindow('x.com');

        await expect(homeWorkSelector.twitterProfileName).toHaveText('OrangeHRM');

        // Switch back to original window
        await browser.switchToWindow(OGBrowser);
        console.log("Back to Original:", await browser.getTitle());
    }

    public async handleNestedShadowDomIframe() {
        await browser.url('https://selectorshub.com/xpath-practice-page/');
        const originalWindow = await browser.getWindowHandle()
        
        const hrefLink = await $('//a[@href="https://selectorshub.com/iframe-scenario/"]');
        await hrefLink.waitForClickable({ timeout: 10000 });
        await hrefLink.click();
        await browser.pause(5000)

        const allWindows = await browser.getWindowHandles();
        const newTab = allWindows.find(handle => handle !== originalWindow);
        if (!newTab) throw new Error('New tab not found');
        await browser.switchToWindow(newTab);

        const iframe1 = await $('//iframe[@id="pact1"]')
        await browser.switchFrame(iframe1)

        const iframe2 = await $('//iframe[@id="pact2"]')
        await browser.switchFrame(iframe2)

        const iframe3 = await $('//iframe[@id="pact3"]')
        await browser.switchFrame(iframe3)
        await browser.switchToParentFrame()
        await browser.switchToParentFrame()
        const input = await $('//input[@placeholder="First Crush"]')
        await input.setValue('I will get placed in a good company')
        await browser.pause(5000)
    }

    public async handleGoogleFormIframe() {
        await browser.url('https://selectorshub.com/xpath-practice-page/');
        const iframe = await $('//iframe[@id="coming google"]');
        await iframe.waitForExist({ timeout: 30000 });
        await iframe.scrollIntoView()
        await browser.switchFrame(iframe);
        const yesButton = await $('//div[@aria-label="Yes"]');
        await yesButton.waitForClickable({ timeout: 30000 });
        await yesButton.click();
        await browser.switchFrame(null);
    }

    public async findBrokenLinks() {
        await browser.url('https://practice-automation.com/broken-links/');
        
        const links = await $$('a');   // get all <a> tags
        console.log(`Total links found: ${links.length}`);

        for (const link of links) {
            const href = await link.getAttribute('href');

            if (href && (href.startsWith('http') || href.startsWith('https'))) {
                try {
                    const response = await axios.head(href);  // make HEAD request
                    if (response.status >= 400) {
                        console.log(`❌ Broken link: ${href} (Status: ${response.status})`);
                    } else {
                        console.log(`✅ Valid link: ${href} (Status: ${response.status})`);
                    }
                } catch (error: any) {
                    console.log(`⚠️ Error checking link: ${href} - ${error.message}`);
                }
            }
        }
    }
}

export default new homeWorkPage()
