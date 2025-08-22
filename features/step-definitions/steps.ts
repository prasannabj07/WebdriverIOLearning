import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, $ } from '@wdio/globals'

import LoginPage from '../pageobjects/login.page';
import SecurePage from '../pageobjects/secure.page';
import loginPage from '../pageobjects/login.page';
import fileUploadDownloadPage  from '../pageobjects/fileUploadDownload.page';
import { readExcelFile } from '../utils/excelReader';
import HomeWorkPage from '../pageobjects/HomeWork.page';

const pages = {
    login: LoginPage
}

Given(/^I am on the (\w+) page$/, async (page) => {
    await pages[page].open()
});

Then(/^I login with "([^"]+)" and "([^"]+)" valid$/, async (username, password) => {
    await LoginPage.login(username, password);
});

Then(/^I login with "([^"]+)" and "([^"]+)" inValid$/, async (username, password) => {
    await LoginPage.inValidlogin(username, password);
});

Then(/^get the title of the page$/, async () => {
    const title = await browser.getTitle();
    console.log(title);
});

When(/^Switching to new windows$/, async()=>{
    await loginPage.switchWindow();
});

When(/^Switching to new windows perfect$/, async()=>{
    await loginPage.switchWindows();
});

Given(/^Open a tab and verify alert$/, async() => {
    await LoginPage.windowsAlert();
})

Given(/^Open a tab and verify DropDown$/, async() => {
    await LoginPage.dropDown();
})

Given(/I upload file/, async () => {
    const fileName = 'sample.xlsx'
    await fileUploadDownloadPage.openUploadPage();
    await fileUploadDownloadPage.uploadFile(fileName);
});

Given(/I Download file/, async () => {
    const fileName = 'testing.pdf'
    await fileUploadDownloadPage.openDownloadPage();
    await fileUploadDownloadPage.downloadFile(fileName);
});

Given(/I Read file/, async()=>{
    const data = readExcelFile('sample.xlsx');
    console.log('water',data);
})

Given(/Switching the windows HomeWork/, async () =>{
    await HomeWorkPage.switchingWidowsOne();
})

Given(/iframes HW/, async ()=> {
    await HomeWorkPage.handleGoogleFormIframe();
})

Given(/iframes nested/, async ()=> {
    await HomeWorkPage.handleNestedShadowDomIframe();
})

Given(/Handling brokenlinks/, async ()=> {
    await HomeWorkPage.findBrokenLinks();
})




