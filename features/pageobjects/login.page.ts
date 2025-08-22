import { $ , expect} from '@wdio/globals'
import Page from './page';
import { LoginControls } from './login.selectors';
import allureReporter from '@wdio/allure-reporter';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    private controls: LoginControls;

    constructor() {
        super();
        this.controls = new LoginControls();
    }

    public async login(username: string, password: string) {
        await this.controls.inputUsername.setValue(username);
        await this.controls.inputPassword.setValue(password);
        // 📸 Take manual screenshot before clicking Login
        const screenshot = await browser.takeScreenshot();  
        await allureReporter.addStep('Screenshot before clicking Login', {
            content: Buffer.from(screenshot, 'base64'),
            name: 'Before Login Screenshot',
            type: 'image/png'
        });
        await this.controls.btnSubmit.click();
        await this.controls.cart.isDisplayed();
        console.log(await this.controls.cart.getText());
    }

    public async inValidlogin(username: string, password: string){
        await this.controls.inputUsername.setValue(username);
        await this.controls.inputPassword.setValue(password);
        await this.controls.btnSubmit.click();
        const screenshot = await browser.takeScreenshot();
        await allureReporter.addStep('',{
            content: Buffer.from(screenshot,'base64'),
            name: 'Practise',
            type: 'image/png'
        })
        const errorMessage = await this.controls.invalidErrorPopUp
        await expect(errorMessage).toBeDisplayed();
        await expect(errorMessage).toHaveText('Incorrect email or password.');   
    }

    public async switchWindow() {
        await browser.newWindow('https://www.w3schools.com');
        await browser.newWindow('https://www.outlook.com');

        let allTab = await browser.getWindowHandles();
        await browser.switchToWindow(allTab[0])

        const pageTitle = await browser.getTitle();
        console.log('New tab title:', pageTitle);
    }

    public async switchWindows() {
        // Step 1: Store the original tab
        const originalWindow = await browser.getWindowHandle();
    
        // Step 2: Open a new tab and go to W3Schools
        await browser.newWindow('https://www.w3schools.com');
    
        // Step 3: Optionally do something in the new tab
        const newTabTitle = await browser.getTitle();
        console.log('New tab title:', newTabTitle);
    
        // Step 4: Switch back to the original tab
        await browser.switchToWindow(originalWindow);
    
        // Step 5: Navigate the original tab to Outlook
        await browser.newWindow('https://www.outlook.com');
    
        // Step 6: Confirm navigation and print title
        const pageTitle = await browser.getTitle();
        console.log('Back to original tab, now showing:', pageTitle);

        await browser.switchWindow('W3Schools'); // switches tab with that title or URL
        await browser.switchToWindow(originalWindow)
    }


    public async windowsAlert() {
        await browser.url('https://demoqa.com/alerts')
        await this.controls.alertPopup.click()
        await browser.waitUntil(async () => await browser.isAlertOpen(), {
            timeout: 5000,
            timeoutMsg: 'Expected alert to be open but it was not.'
        });
        const isOpen = await browser.isAlertOpen();
        console.log('Is alert open:', isOpen);

        if (isOpen) {
            const text = await browser.getAlertText();
            console.log('Alert Text:', text);
            await browser.acceptAlert();
        } else {
            throw new Error('Expected alert to be open, but it was not.');
        }
        //await browser.dismissAlert()       
    }

    public async dropDown() {
        await browser.url('https://practice.expandtesting.com/dropdown');
        const dropdown = this.controls.dropDown;
        const options = await $$("//div[@class='col-md-6']");   // fetch all <option> tags
        for (const option of options) {
            console.log("aaa",await option.getText());          // print option text
        }
        await dropdown.selectByIndex(1); // or any index you want
        //await dropdown.selectByAttribute('value', 'option1'); // or any index you want
        //await dropdown.selectByVisibleText('Option 2')
        const selectedValue = await dropdown.getValue();  // gets the value attribute of selected <option>
        const selectedText = await dropdown.getText();    // gets all text of <select>
    
        console.log("Selected value:", selectedValue);
        console.log("Selected text:", selectedText);
        
        browser.pause(3000);
    }

    public open() {
        return super.open('login');
    }
}


// ⬇️ This creates an object in memory from the LoginPage class.
// This object is also called an *instance* of the LoginPage class.
// "Instance" just means a real, working copy of the class blueprint.
export default new LoginPage();
