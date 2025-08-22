import * as path from 'path';
import * as fs from 'fs';
import { ATTACHMENT_FOLDER_PATH, DOWNLOAD_FOLDER_PATH } from '../utils/pathconstant';

class FileUploadDownloadPage {
    async openUploadPage() {
        await browser.url('https://the-internet.herokuapp.com/upload')
    }

    public async uploadFile(fileName: string) {
        const filePath = path.join(ATTACHMENT_FOLDER_PATH, fileName);
        const remoteFilePath = await browser.uploadFile(filePath);
        const fileInput = await $('#file-upload');
        await fileInput.setValue(remoteFilePath);
        const uploadButton = await $('#file-submit');
        await uploadButton.click();
        const uploadedFiles = await $('#uploaded-files');
        await uploadedFiles.waitForExist({ timeout: 5000 });
    }

    async openDownloadPage() {
        await browser.url('https://the-internet.herokuapp.com/download')
    }

    async downloadFile(fileName: string) {
        const fileLink = await $(`=${fileName}`)
        await fileLink.click()
        const downloadPath = path.join(DOWNLOAD_FOLDER_PATH, fileName)
        await browser.waitUntil(() => fs.existsSync(downloadPath), {
            timeout: 10000,
            timeoutMsg: `File ${fileName} was not downloaded`
        })
    }
}

export default new FileUploadDownloadPage();